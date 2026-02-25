from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pickle
from rules import rule_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

class Message(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "AI Service Running"}

@app.post("/predict")
def predict(msg: Message):

    text = msg.text.lower()

    # ML score
    X = vectorizer.transform([msg.text])
    ml_prob = model.predict_proba(X)[0][1]

    # Rule score
    rule_prob = rule_score(msg.text)

    # Final score
    final = (0.6 * ml_prob) + (0.4 * rule_prob)

    # Risk label
    if final > 0.7:
        label = "SCAM"
    elif final > 0.4:
        label = "SUSPICIOUS"
    else:
        label = "SAFE"

    # Reasons
    reasons = []

    if "urgent" in text or "immediately" in text:
        reasons.append("Urgency detected")

    if "otp" in text:
        reasons.append("OTP related message")

    if "kyc" in text:
        reasons.append("KYC verification request")

    if "http" in text or "www" in text:
        reasons.append("Suspicious link found")

    if "@" in text:
        reasons.append("UPI ID detected")

    return {
        "label": label,
        "final_score": round(float(final), 2),
        "ml_score": round(float(ml_prob), 2),
        "rule_score": round(float(rule_prob), 2),
        "reasons": reasons
    }
