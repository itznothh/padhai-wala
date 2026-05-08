"""
Agent 4 — Nazar (Deadline Tracker + Priority Ranker)
Searches for current deadlines and ranks options by urgency.
"""
import logging
from tools.search import search_deadlines

logger = logging.getLogger(__name__)

# Hardcoded approximate seasonal windows (fallback if search fails)
KNOWN_WINDOWS = {
    "RTE 25% Quota":                    "January – March (apply early)",
    "Kasturba Gandhi Balika Vidyalaya": "February – April",
    "Vidyasiri Scholarship":            "June – September (after admission)",
    "NMMSS Scholarship":                "November exam; apply August – October",
    "Pre-Matric Scholarship":           "October – December",
    "KV":                               "January – March (lottery)",
    "JNV":                              "September – October (for Nov exam)",
}

URGENCY_ORDER = {"NOW": 0, "SOON": 1, "PLAN": 2, "CHECK": 3}


def _classify_urgency(deadline_text: str, scheme_name: str) -> str:
    text = (deadline_text or "").lower()
    if any(w in text for w in ["today", "tomorrow", "this week", "urgent", "last date"]):
        return "NOW"
    if any(w in text for w in ["this month", "next month", "soon", "open"]):
        return "SOON"
    if any(w in text for w in ["november", "december", "exam", "entrance"]):
        return "PLAN"
    return "CHECK"


def get_priorities(schemes: list, schools: list) -> list:
    """
    Returns a ranked list of options with urgency labels and deadline info.
    """
    priorities = []

    # Government schools — always open, always highest priority for ease
    for school in schools:
        if school.get("type") == "govt":
            priorities.append({
                "option": school.get("name", "Govt School"),
                "urgency": "NOW",
                "urgency_label": "🟢 ACT NOW",
                "reason": "Free government school — walk in any day with documents",
                "deadline_info": "No deadline — open admissions all year"
            })

    # KV / JNV
    for school in schools:
        if school.get("type") == "KV":
            priorities.append({
                "option": school.get("name", "Kendriya Vidyalaya"),
                "urgency": "SOON",
                "urgency_label": "🟡 THIS MONTH",
                "reason": "KV lottery — limited seats, apply quickly",
                "deadline_info": KNOWN_WINDOWS.get("KV", "Check kvsonlineadmission.kvs.gov.in")
            })
        elif school.get("type") == "JNV":
            priorities.append({
                "option": school.get("name", "Navodaya Vidyalaya"),
                "urgency": "PLAN",
                "urgency_label": "🔵 PLAN AHEAD",
                "reason": "Free residential school — entrance exam required",
                "deadline_info": KNOWN_WINDOWS.get("JNV", "Check navodaya.gov.in")
            })

    # Schemes with deadline search
    for scheme in schemes:
        if scheme.get("type") == "benefit":
            continue  # PM POSHAN is automatic, no deadline
        name = scheme.get("name", "")
        deadline_results = search_deadlines(name)
        deadline_text = ""
        if deadline_results:
            deadline_text = deadline_results[0].get("snippet", "")

        urgency = _classify_urgency(deadline_text, name)
        known = next((v for k, v in KNOWN_WINDOWS.items() if k.lower() in name.lower()), "")
        display_deadline = deadline_text[:120] if deadline_text else known or "Check official portal"

        label_map = {
            "NOW": "🔴 ACT NOW",
            "SOON": "🟡 THIS MONTH",
            "PLAN": "🔵 PLAN AHEAD",
            "CHECK": "⚪ CHECK DEADLINE"
        }
        priorities.append({
            "option": name,
            "urgency": urgency,
            "urgency_label": label_map[urgency],
            "reason": scheme.get("description_en", ""),
            "deadline_info": display_deadline
        })

    # Sort by urgency
    priorities.sort(key=lambda x: URGENCY_ORDER.get(x["urgency"], 99))
    return priorities
