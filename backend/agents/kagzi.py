"""
Agent 3 — Kagzi (Document Guide)
Maps every scheme/school to an exact document checklist — office, cost, days, tips.
"""
from data.documents import DOCUMENT_GUIDE, SCHEME_DOCUMENTS


def get_document_checklist(schemes: list, schools: list) -> dict:
    """
    Given schemes and schools, collect all required documents and
    return a deduplicated dict with full instructions for each.
    """
    needed_doc_keys = set()

    for scheme in schemes:
        doc_key = scheme.get("docs", "Govt_School")
        needed_doc_keys.update(SCHEME_DOCUMENTS.get(doc_key, []))

    for school in schools:
        school_type = school.get("type", "govt")
        if school_type == "KV":
            needed_doc_keys.update(SCHEME_DOCUMENTS.get("KV", []))
        elif school_type == "JNV":
            needed_doc_keys.update(SCHEME_DOCUMENTS.get("JNV", []))
        else:
            needed_doc_keys.update(SCHEME_DOCUMENTS.get("Govt_School", []))

    checklist = {}
    for key in needed_doc_keys:
        if key in DOCUMENT_GUIDE:
            checklist[key] = DOCUMENT_GUIDE[key]

    return checklist
