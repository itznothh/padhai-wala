"""
Agent 1 — Saathi (Orchestrator + Conversationalist)
The only agent that talks to the user directly.
Collects family info, calls the other agents, formats the final warm response.
"""
import json
import logging
import os
from typing import Optional

import google.generativeai as genai

from agents.khoji import find_options
from agents.kagzi import get_document_checklist
from agents.nazar import get_priorities

logger = logging.getLogger(__name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# In-memory session store  {session_id: {history: [], profile: {}}}
_sessions: dict = {}

SYSTEM_PROMPT = """
You are Saathi — a warm, trusted AI assistant helping low-income Indian parents find FREE schools for their children.

YOUR PERSONALITY:
- Speak like an educated, helpful neighbour — never clinical, never condescending
- Use natural Hinglish (mix of Hindi and English) OR pure English based on what the user uses
- Always be encouraging — these parents face real barriers
- Never use jargon without explaining it simply

YOUR JOB (follow this order strictly):
1. Greet the user warmly (only on first message)
2. Collect these details CONVERSATIONALLY (one or two questions at a time, not like a form):
   - Child's age
   - Monthly family income (approximate)
   - Area/location they live in (city area)
   - Category: General / OBC / SC / ST / Minority (ask gently, explain you need it for schemes)
   - Child's gender (for KGBV and other girl-specific schemes)
   - Preferred language (Hindi or English) — infer from their messages first
3. Once profile is complete, you will receive a <SEARCH_RESULTS> block with schools, schemes, documents, and priorities.
4. Present results in this EXACT order with emojis:
   a. 🟢 Easiest option first — free government schools (walk-in, no lottery)
   b. 🟡 Scheme/quota options — require application but very beneficial
   c. 🔵 Long-term options — exam-based (KV lottery, JNV exam)
   d. 📋 Document checklist — with exact office, cost, and days for EACH document
   e. ⏰ "Pehle yeh karo" (Do this first) — one clear action

FORMATTING RULES:
- Use simple numbered lists or short bullet points
- Bold important things like school names, deadlines, office names
- For each school/scheme: Name → Fees → How to apply → Documents
- For each document: What → Which office → Carry → Cost → How many days → Tip
- Always end with a warm "Do this first" instruction

IMPORTANT RULES:
- If user says RTE, explain: "Ek kanoon hai jisme private schools ko 25% seats free mein deni hoti hain"  
- If they got rejected, say "Koi baat nahi" and find next alternatives
- Never overwhelm — give 3 options max at a time
- If income > ₹3.5L/year, focus on government schools only, not income-based schemes
- For SC/ST: always mention Vidyasiri scholarship

PROFILE EXTRACTION:
When you have enough info, include this JSON at the very END of your response (hidden from display):
<PROFILE_READY>{"age": N, "income_monthly": N, "location": "area", "category": "General/OBC/SC/ST/Minority", "gender": "boy/girl", "city": "Bangalore"}</PROFILE_READY>

Only include this tag when you have AT LEAST: age, income_monthly, and location.
"""


def _get_session(session_id: str) -> dict:
    if session_id not in _sessions:
        _sessions[session_id] = {"history": [], "profile": {}, "searched": False}
    return _sessions[session_id]


def _extract_profile_from_response(text: str) -> Optional[dict]:
    """Parse <PROFILE_READY> tag from Saathi's response."""
    import re
    match = re.search(r"<PROFILE_READY>(.*?)</PROFILE_READY>", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1).strip())
        except Exception:
            return None
    return None


def _clean_response(text: str) -> str:
    """Remove internal tags from the response shown to user."""
    import re
    text = re.sub(r"<PROFILE_READY>.*?</PROFILE_READY>", "", text, flags=re.DOTALL)
    return text.strip()


def chat(user_message: str, session_id: str = "default") -> dict:
    """
    Main chat function.
    Returns: {"response": str, "profile": dict, "options": dict|None}
    """
    session = _get_session(session_id)
    history = session["history"]
    profile = session["profile"]

    # Add user message to history
    history.append({"role": "user", "parts": [user_message]})

    model = genai.GenerativeModel("gemini-2.0-flash")

    # --- Step 1: Let Saathi respond and potentially extract profile ---
    chat_obj = model.start_chat(history=history[:-1] if len(history) > 1 else [])
    initial_response = chat_obj.send_message(SYSTEM_PROMPT + "\n\nUser: " + user_message)
    response_text = initial_response.text

    # Extract profile if Saathi included it
    extracted = _extract_profile_from_response(response_text)
    if extracted:
        profile.update(extracted)
        session["profile"] = profile

    # --- Step 2: If we have a profile and haven't searched yet, run other agents ---
    options = None
    if (profile and not session["searched"]
            and all(k in profile for k in ["age", "income_monthly", "location"])):

        session["searched"] = True
        try:
            options = find_options(profile)
            documents = get_document_checklist(options["schemes"], options["schools"])
            priorities = get_priorities(options["schemes"], options["schools"])

            search_context = f"""
<SEARCH_RESULTS>
SCHOOLS FOUND:
{json.dumps(options['schools'], indent=2, ensure_ascii=False)}

ELIGIBLE SCHEMES:
{json.dumps(options['schemes'], indent=2, ensure_ascii=False)}

DOCUMENT CHECKLIST:
{json.dumps(documents, indent=2, ensure_ascii=False)}

PRIORITY ORDER:
{json.dumps(priorities, indent=2, ensure_ascii=False)}
</SEARCH_RESULTS>

Now present ALL of this information to the parent in a warm, simple, actionable way.
Follow the formatting rules exactly. Give the easiest option first.
Use exact document instructions. End with one clear "Pehle yeh karo" step.
"""
            # Second pass — Saathi formats the results
            history_with_results = history[:-1] + [
                {"role": "user", "parts": [user_message + "\n\n" + search_context]}
            ]
            format_chat = model.start_chat(history=history_with_results[:-1])
            final_response = format_chat.send_message(
                SYSTEM_PROMPT + "\n\nUser: " + user_message + "\n\n" + search_context
            )
            response_text = final_response.text

        except Exception as e:
            logger.error(f"Agent pipeline failed: {e}")
            response_text += "\n\n(Kuch technical issue hua — please dobara try karein.)"

    # Clean response and save to history
    clean_text = _clean_response(response_text)
    history.append({"role": "model", "parts": [clean_text]})

    return {
        "response": clean_text,
        "profile": profile,
        "has_results": options is not None
    }


def reset_session(session_id: str):
    """Clear session data (for new conversation)."""
    if session_id in _sessions:
        del _sessions[session_id]
