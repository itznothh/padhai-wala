"""
Agent 1 — Saathi (Orchestrator + Conversationalist)
Uses Groq (Llama 3.3 70B) for fast, warm Hinglish responses.
"""
import json
import logging
import re
from typing import Optional

from agents.khoji import find_options
from agents.kagzi import get_document_checklist
from agents.nazar import get_priorities
from tools.groq_client import chat_completion

logger = logging.getLogger(__name__)

# Per-session store: {session_id: {history: [], profile: {}, searched: bool}}
_sessions: dict = {}

SYSTEM_PROMPT = """You are Guide — a warm, trusted AI assistant helping low-income Indian parents find FREE schools for their children.

YOUR PERSONALITY:
- Speak like an educated, helpful neighbour — never clinical, never condescending
- Use clear English, keeping it simple and accessible
- Always be encouraging — these parents face real barriers
- Never use jargon without explaining it simply

YOUR JOB (follow this order):
1. Greet warmly on first message only
2. Collect these details conversationally (1-2 questions at a time, not like a form):
   - Child's age
   - Monthly family income (approximate)
   - Area/location (city area like Whitefield, Hebbal, etc.)
   - Category: General / OBC / SC / ST / Minority (ask gently, explain you need it for schemes)
   - Child's gender (for KGBV and girl-specific schemes)
3. Once you have enough info, include <PROFILE_READY> tag at end of response
4. When you receive <SEARCH_RESULTS>, present them warmly and clearly

FORMATTING for results:
- 🟢 Easiest first — free govt schools (walk-in, no lottery)
- 🟡 Scheme/quota options — require application
- 🔵 Long-term — exam-based options
- 📋 Document checklist — exact office, cost, days for EACH document
- ⏰ "Do this first" — ONE clear first action

RULES:
- Max 3 options at a time
- Bold important things like school names, deadlines
- If rejected from RTE, find next alternatives immediately
- Always end with encouragement

When you have age + income_monthly + location, add this at the very END of your response:
<PROFILE_READY>{"age": N, "income_monthly": N, "location": "area", "category": "General/OBC/SC/ST/Minority", "gender": "boy/girl", "city": "Bangalore"}</PROFILE_READY>"""


def _get_session(session_id: str) -> dict:
    if session_id not in _sessions:
        _sessions[session_id] = {"history": [], "profile": {}, "searched": False}
    return _sessions[session_id]


def _extract_profile(text: str) -> Optional[dict]:
    match = re.search(r"<PROFILE_READY>(.*?)</PROFILE_READY>", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1).strip())
        except Exception:
            return None
    return None


def _clean(text: str) -> str:
    return re.sub(r"<PROFILE_READY>.*?</PROFILE_READY>", "", text, flags=re.DOTALL).strip()


def chat(user_message: str, session_id: str = "default") -> dict:
    session = _get_session(session_id)
    history = session["history"]
    profile = session["profile"]

    # Build messages for Groq
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    # First response — collect info / extract profile
    response_text = chat_completion(messages, temperature=0.7, max_tokens=1024)

    extracted = _extract_profile(response_text)
    if extracted:
        profile.update(extracted)
        session["profile"] = profile

    # If profile complete and not searched yet — run other agents
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

Now present ALL of this to the parent warmly and clearly. 
Give easiest option first. Include exact document instructions.
End with one clear "Do this first" step."""

            messages2 = [{"role": "system", "content": SYSTEM_PROMPT}]
            messages2.extend(history)
            messages2.append({"role": "user", "content": user_message + "\n\n" + search_context})

            response_text = chat_completion(messages2, temperature=0.7, max_tokens=2048)

        except Exception as e:
            logger.error(f"Agent pipeline failed: {e}")
            response_text += "\n\n(A technical issue occurred — please try again.)"

    clean_text = _clean(response_text)

    # Save to history
    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": clean_text})

    # Keep history manageable (last 20 messages)
    if len(history) > 20:
        session["history"] = history[-20:]

    return {
        "response": clean_text,
        "profile": profile,
        "has_results": options is not None
    }


def reset_session(session_id: str):
    if session_id in _sessions:
        del _sessions[session_id]
