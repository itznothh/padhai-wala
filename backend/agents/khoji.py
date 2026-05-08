"""
Agent 2 — Khoji (School + Scheme Finder)
Finds nearby government schools and eligible schemes for the family.
"""
import json
import logging

from data.schemes import get_eligible_schemes
from tools.search import search_schools
from tools.groq_client import chat_completion

logger = logging.getLogger(__name__)


def find_options(profile: dict) -> dict:
    age = profile.get("age", 7)
    income = profile.get("income_monthly", 15000)
    location = profile.get("location", "")
    category = profile.get("category", "General")
    gender = profile.get("gender", "unknown")
    city = profile.get("city", "Bangalore")

    raw_results = search_schools(location, city)
    schools = []

    if raw_results:
        try:
            prompt = f"""From these web search results about schools near {location}, {city}:

{json.dumps(raw_results, indent=2)}

Extract up to 5 government/free schools. Return ONLY a valid JSON array, no explanation, no markdown, no code fences.
Each object must have exactly these fields:
{{"name": "school name", "type": "govt or KV or JNV", "location": "area", "fees": "Free", "admission": "walk-in or lottery or exam", "medium": "Kannada or English or Hindi"}}

If no school found, return empty array: []"""

            text = chat_completion([
                {"role": "system", "content": "You are a JSON extraction assistant. Return only valid JSON arrays, nothing else."},
                {"role": "user", "content": prompt}
            ], temperature=0.1, max_tokens=800)

            text = text.strip().replace("```json", "").replace("```", "").strip()
            schools = json.loads(text)
            if not isinstance(schools, list):
                schools = []
        except Exception as e:
            logger.error(f"Khoji school parsing failed: {e}")
            schools = []

    if not schools:
        schools = [{
            "name": f"Nearest BBMP Government School near {location}",
            "type": "govt",
            "location": location,
            "fees": "Free",
            "admission": "walk-in",
            "medium": "Kannada/English"
        }]

    schemes = get_eligible_schemes(age, income, category, gender)
    return {"schools": schools, "schemes": schemes}
