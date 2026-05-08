"""
Agent 2 — Khoji (School + Scheme Finder)
Finds nearby government schools and eligible schemes for the family.
"""
import json
import logging
import os

import google.generativeai as genai

from data.schemes import get_eligible_schemes
from tools.search import search_schools

logger = logging.getLogger(__name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def find_options(profile: dict) -> dict:
    """
    Given a family profile, find:
    - Nearby government schools (via Serper + Gemini parsing)
    - Eligible schemes (rule-based)
    """
    age = profile.get("age", 7)
    income = profile.get("income_monthly", 15000)
    location = profile.get("location", "")
    category = profile.get("category", "General")
    gender = profile.get("gender", "unknown")
    city = profile.get("city", "Bangalore")

    # --- Schools ---
    raw_results = search_schools(location, city)
    schools = []

    if raw_results:
        try:
            model = genai.GenerativeModel("gemini-2.0-flash")
            school_prompt = f"""
From these web search results about schools near {location}, {city}:

{json.dumps(raw_results, indent=2)}

Extract up to 5 government/free schools. For each, return a JSON array with objects:
{{
  "name": "school name",
  "type": "govt" | "KV" | "JNV" | "sainik",
  "location": "area or address",
  "fees": "Free" or amount,
  "admission": "walk-in" | "lottery" | "exam",
  "medium": "Kannada" | "English" | "Hindi" | "Mixed"
}}

Rules:
- Include BBMP/state schools, Kendriya Vidyalayas, Navodaya Vidyalayas
- If no clear school found from results, return an empty array []
- Return ONLY valid JSON array, no explanation, no markdown
"""
            response = model.generate_content(school_prompt)
            text = response.text.strip().replace("```json", "").replace("```", "").strip()
            schools = json.loads(text)
            if not isinstance(schools, list):
                schools = []
        except Exception as e:
            logger.error(f"Khoji school parsing failed: {e}")
            schools = []

    # If search gave nothing, add a generic fallback
    if not schools:
        schools = [{
            "name": f"Nearest BBMP Government School near {location}",
            "type": "govt",
            "location": location,
            "fees": "Free",
            "admission": "walk-in",
            "medium": "Kannada/English"
        }]

    # --- Schemes ---
    schemes = get_eligible_schemes(age, income, category, gender)

    return {"schools": schools, "schemes": schemes}
