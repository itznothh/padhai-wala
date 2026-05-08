import requests
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
CURRENT_YEAR = datetime.now().year


def search_web(query: str, num: int = 5) -> list:
    """Call Serper (Google Search API) and return top results."""
    if not SERPER_API_KEY:
        logger.warning("SERPER_API_KEY not set — skipping web search")
        return []
    try:
        url = "https://google.serper.dev/search"
        headers = {
            "X-API-KEY": SERPER_API_KEY,
            "Content-Type": "application/json"
        }
        payload = {"q": query, "num": num, "gl": "in", "hl": "en"}
        response = requests.post(url, headers=headers, json=payload, timeout=8)
        response.raise_for_status()
        results = response.json().get("organic", [])
        return [
            {
                "title": r.get("title", ""),
                "snippet": r.get("snippet", ""),
                "link": r.get("link", "")
            }
            for r in results[:num]
        ]
    except Exception as e:
        logger.error(f"Serper search failed for '{query}': {e}")
        return []


def search_schools(location: str, city: str = "Bangalore") -> list:
    """Search for government schools near a given location."""
    queries = [
        f"government primary school near {location} {city} free admission {CURRENT_YEAR}",
        f"BBMP school {location} {city} admission",
        f"Kendriya Vidyalaya near {location} {city}",
        f"Navodaya Vidyalaya {city} Karnataka admission {CURRENT_YEAR}",
    ]
    results = []
    for q in queries:
        results.extend(search_web(q, num=3))
    return results


def search_deadlines(scheme_name: str, city: str = "Bangalore") -> list:
    """Search for current admission/application deadlines for a scheme."""
    query = f"{scheme_name} application deadline {city} Karnataka {CURRENT_YEAR}"
    return search_web(query, num=3)
