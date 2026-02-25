import re

def rule_score(text):

    score = 0
    t = text.lower()

    keywords = [
        "urgent", "blocked", "verify",
        "otp", "kyc", "winner",
        "lottery", "pay", "immediately"
    ]

    # Keyword check
    for k in keywords:
        if k in t:
            score += 0.08

    # UPI ID pattern
    upi_pattern = r"[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}"
    if re.search(upi_pattern, t):
        score += 0.3

    # URL detection
    if "http://" in t or "https://" in t or "www." in t:
        score += 0.2

    return min(score, 1.0)
