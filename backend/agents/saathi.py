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

SYSTEM_PROMPT = """You are Saathi — a warm, trusted guide helping low-income Indian parents find FREE schools for their children.

YOUR PERSONALITY:
- Speak like a helpful, educated neighbour — warm, never clinical
- Simple English only — no jargon
- Always encouraging — these families face real barriers
- Short replies — never long paragraphs

STRICT FORMATTING RULES (follow always):
- Max 2 lines per paragraph — then break
- Use bullet points instead of explanations
- Bold important words: **school name**, **deadline**, **document**
- Use emojis as section headers (🏫 📄 ⏰ 👉)
- Never write walls of text — scannable lists only
- Mobile-first: short lines, clear spacing
- Max 3 options at a time

YOUR JOB (in order):
1. Greet warmly — first message only
2. Collect info conversationally, 1-2 questions at a time:
   - Child's age
   - Monthly family income (approximate)
   - Area/location (e.g. Whitefield, Hebbal)
   - Category: General / OBC / SC / ST / Minority (explain gently why you need it)
   - Child's gender (for girl-specific schemes like KGBV)
3. Once you have enough, add <PROFILE_READY> tag at end
4. When you receive <SEARCH_RESULTS>, present them using the RESULTS FORMAT below

RESULTS FORMAT — always use these 4 sections, in order:
🏫 **Recommended Schools** — easiest/free first, max 3, one bullet each
📄 **Documents Needed** — one bullet per doc: name, where to get it, days needed
⏰ **Important Deadlines** — scheme name, deadline, urgency
👉 **Do This First** — ONE specific action the parent can take today
End with one short encouraging sentence.

RULES:
- 🟢 Easiest options first (walk-in govt schools, no lottery)
- 🟡 Then scheme/quota options (need application)
- 🔵 Then long-term exam-based options
- If rejected from RTE → immediately suggest next alternative
- Always end with encouragement

When you have age + income_monthly + location, add at the very END of your response:
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
    response_text = chat_completion(messages, temperature=0.7, max_tokens=600)

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

Present the search results using the required structured format. Keep responses short, scannable, and mobile-friendly."""

            messages2 = [{"role": "system", "content": SYSTEM_PROMPT}]
            messages2.append({"role": "user", "content": user_message + "\n\n" + search_context})

            response_text = chat_completion(messages2, temperature=0.7, max_tokens=600)

            # Prepend subtle orchestration progress steps
            progress_steps = (
                "🤝 *Understanding your situation...*\n"
                "🔍 *Khoji finding nearby schools...*\n"
                "📄 *Kagzi preparing your document list...*\n"
                "⏰ *Nazar checking deadlines...*\n\n"
            )
            response_text = progress_steps + response_text

        except Exception as e:
            import traceback
            err = traceback.format_exc()
            logger.error("Agent pipeline failed: " + err)
            response_text = "⚠️ Sorry, a technical issue occurred. Please try again."

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
