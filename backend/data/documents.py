DOCUMENT_GUIDE = {
    "income_certificate": {
        "name": "Income Certificate",
        "where": "Nearest Nadakacheri office",
        "carry": "Aadhaar card + Ration card",
        "cost": "Free",
        "days": "3–5 working days",
        "tip": "Apply online at nadakacheri.karnataka.gov.in to save time"
    },
    "caste_certificate": {
        "name": "Caste Certificate",
        "where": "Nearest Taluk office",
        "carry": "Aadhaar card + parent's caste certificate (if available)",
        "cost": "Free",
        "days": "7–10 working days",
        "tip": "Apply online at sevasindhu.karnataka.gov.in to skip queue"
    },
    "birth_certificate": {
        "name": "Birth Certificate",
        "where": "BBMP office OR the hospital where child was born",
        "carry": "Hospital discharge summary OR parent's Aadhaar",
        "cost": "₹25–50",
        "days": "Same day to 3 days",
        "tip": "If born in a govt hospital, it may already be registered — check first"
    },
    "aadhaar_child": {
        "name": "Child's Aadhaar Card",
        "where": "Nearest Aadhaar Seva Kendra",
        "carry": "Parent's Aadhaar + child's birth certificate",
        "cost": "Free",
        "days": "15–30 days for card delivery",
        "tip": "Book appointment online at uidai.gov.in to avoid waiting"
    },
    "ration_card": {
        "name": "Ration Card",
        "where": "Nearest Ahara Bhagya office OR BBMP office",
        "carry": "Aadhaar of all family members + address proof",
        "cost": "Free",
        "days": "15–30 days",
        "tip": "Apply online at ahara.kar.nic.in"
    },
    "transfer_certificate": {
        "name": "Transfer Certificate (TC)",
        "where": "Child's previous school",
        "carry": "Nothing — just request the principal",
        "cost": "Free",
        "days": "1–3 days",
        "tip": "Mandatory when switching schools — ask at least a week before joining"
    },
    "address_proof": {
        "name": "Address Proof",
        "where": "Any govt office OR use Aadhaar/ration card as proof",
        "carry": "Aadhaar card (has address) OR utility bill",
        "cost": "Free",
        "days": "Immediate if using Aadhaar",
        "tip": "Aadhaar card itself is valid address proof for most schools"
    },
    "bank_passbook": {
        "name": "Bank Passbook (first page)",
        "where": "Your bank branch",
        "carry": "Aadhaar card + existing account details",
        "cost": "Free",
        "days": "Immediate — just photocopy the first page",
        "tip": "If no bank account, open a Jan Dhan account — it's free and no minimum balance"
    },
    "previous_marksheet": {
        "name": "Previous Class Marksheet",
        "where": "Child's previous school",
        "carry": "Nothing — request from the school office",
        "cost": "Free",
        "days": "1–2 days",
        "tip": "Keep photocopies of all marksheets for future use"
    }
}

SCHEME_DOCUMENTS = {
    "RTE_quota":           ["income_certificate", "birth_certificate", "aadhaar_child", "ration_card"],
    "KGBV":                ["caste_certificate", "income_certificate", "birth_certificate", "aadhaar_child"],
    "Vidyasiri":           ["caste_certificate", "aadhaar_child", "bank_passbook"],
    "NMMSS":               ["income_certificate", "previous_marksheet", "aadhaar_child"],
    "Pre_Matric_Minority": ["income_certificate", "aadhaar_child"],
    "Govt_School":         ["birth_certificate", "aadhaar_child"],
    "KV":                  ["birth_certificate", "aadhaar_child", "address_proof"],
    "JNV":                 ["birth_certificate", "aadhaar_child", "previous_marksheet"]
}
