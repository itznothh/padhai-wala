def get_eligible_schemes(age: int, income_monthly: int, category: str, gender: str) -> list:
    """
    Returns list of schemes the family is eligible for.
    category: General / OBC / SC / ST / Minority
    gender: boy / girl
    """
    income_yearly = income_monthly * 12
    schemes = []

    # RTE 25% Quota — free seats in private schools
    if 6 <= age <= 14 and income_yearly <= 350000:
        schemes.append({
            "name": "RTE 25% Quota",
            "description": "Ek kanoon hai — private schools mein 25% seats free mein milti hain. Government fees deti hai.",
            "description_en": "By law, 25% seats in private schools are FREE. Govt pays the fees directly.",
            "type": "quota",
            "docs": "RTE_quota",
            "urgency": "high"
        })

    # KGBV — Free residential school for girls
    if (gender == "girl" and age >= 10
            and category in ["SC", "ST", "OBC", "Minority"]
            and income_yearly <= 200000):
        schemes.append({
            "name": "Kasturba Gandhi Balika Vidyalaya (KGBV)",
            "description": "Ladkiyon ke liye bilkul free residential school — fees, khana, hostel sab free.",
            "description_en": "Completely free residential school for girls — fees, food, hostel all free.",
            "type": "scheme",
            "docs": "KGBV",
            "urgency": "high"
        })

    # Vidyasiri — Karnataka SC/ST scholarship
    if category in ["SC", "ST"]:
        schemes.append({
            "name": "Vidyasiri Scholarship (Karnataka)",
            "description": "Karnataka sarkar SC/ST bacchon ke liye school fees deti hai.",
            "description_en": "Karnataka govt covers school fees for SC/ST students.",
            "type": "scholarship",
            "docs": "Vidyasiri",
            "urgency": "medium"
        })

    # NMMSS — for Class 8+ students
    if age >= 13 and income_yearly <= 350000:
        schemes.append({
            "name": "NMMSS Scholarship",
            "description": "Class 9-12 ke students ko ₹12,000 per year milta hai — exam dena hoga.",
            "description_en": "₹12,000/year scholarship for Class 9-12. Requires an entrance exam.",
            "type": "scholarship",
            "docs": "NMMSS",
            "urgency": "low"
        })

    # Pre-Matric Minority Scholarship
    if category == "Minority" and income_yearly <= 200000:
        schemes.append({
            "name": "Pre-Matric Scholarship (Minority)",
            "description": "Central government minority community ke bacchon ko scholarship deti hai.",
            "description_en": "Central govt scholarship for minority community children.",
            "type": "scholarship",
            "docs": "Pre_Matric_Minority",
            "urgency": "medium"
        })

    # PM POSHAN (Mid Day Meal) — all govt school children
    schemes.append({
        "name": "PM POSHAN (Free Mid-Day Meal)",
        "description": "Sarkari school mein daakhila lene par free khana milta hai — roz.",
        "description_en": "All children in govt schools get a free meal every day.",
        "type": "benefit",
        "docs": "Govt_School",
        "urgency": "low"
    })

    return schemes
