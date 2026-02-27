# 🛡️ ScamShield India – AI Powered Scam Detection System

![AI Powered](https://img.shields.io/badge/AI-ML_Powered-green)
![Threat Intelligence](https://img.shields.io/badge/Threat_Intelligence-Google_Safe_Browsing-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI_+_Express-orange)

ScamShield India is a full-stack AI-powered scam detection system designed to detect UPI fraud, OTP scams, delivery phishing, KYC fraud, and malicious URLs using a hybrid Machine Learning + Rule-Based + Threat Intelligence approach.

---

## 🚀 Key Features

- 🔍 Real-time message analysis
- 🤖 ML-based classification (TF-IDF + Logistic Regression)
- 🧠 Rule-based fraud detection engine
- 🌐 Google Safe Browsing API integration
- 🔗 Suspicious URL verification
- 📊 Confidence scoring with explainability
- 🌍 Multilingual support (English, Hindi, Telugu)
- ⚡ MERN + FastAPI architecture

---

## 🏗️ System Architecture

```
Frontend (React + TypeScript + Tailwind)
                ↓
Node.js + Express Backend (Decision Layer)
                ↓
Decision Engine (ML + Rules)
                ↓
Google Safe Browsing API
                ↓
FastAPI ML Service (Scikit-learn Model)
```

---

## 🧠 Detection Strategy

ScamShield uses a **hybrid layered detection system** to improve accuracy and reduce false positives.

### 1️⃣ Machine Learning Layer
- TF-IDF Vectorization
- Logistic Regression classifier
- Trained on scam vs safe dataset
- Outputs scam probability

### 2️⃣ Rule-Based Layer
Detects:
- UPI ID patterns (`abc@upi`)
- OTP sharing requests
- Urgency keywords ("immediately", "act now")
- KYC update fraud
- Delivery scam phrases
- Suspicious domains (.click, .xyz, .top)

### 3️⃣ Google Safe Browsing Layer
- Verifies URLs against global threat databases
- Detects phishing and malware links
- Enhances detection of real-world scams

### 4️⃣ Final Risk Calculation

```
Final Score = 0.6 × ML Score + 0.4 × Rule Score
```

If Google Safe Browsing flags a URL, the risk score is automatically increased.

---

## 📁 Project Structure

```
scamguard-india/
│
├── src/                    # React Frontend
│
├── server/                 # Node + Express Backend
│   ├── index.js
│   ├── services/
│   │   ├── decisionEngine.js
│   │   └── safeBrowsing.js   # Google Safe Browsing integration
│
├── ml_service/             # FastAPI AI Engine
│   ├── main.py
│   ├── rules.py
│   ├── train.py
│   ├── model.pkl
│   └── vectorizer.pkl
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### AI Service
- Python
- FastAPI
- Scikit-learn
- TF-IDF
- Logistic Regression

### Threat Intelligence
- Google Safe Browsing API

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/scamguard-india.git
cd scamguard-india
```

---

### 2️⃣ Run ML Service (Port 8000)

```bash
cd ml_service
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Visit:
```
http://127.0.0.1:8000/docs
```

---

### 3️⃣ Run Backend (Port 5000)

```bash
cd server
npm install
npm start
```

---

### 4️⃣ Run Frontend (Port 5173)

```bash
cd ..
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## 🧪 Example Test Messages

### 🚨 Scam Example
```
Your parcel delivery failed. Update address immediately: https://fake.click
```

### ⚠ Suspicious Example
```
Your KYC verification is pending. Click link to update.
```

### ✅ Safe Example
```
Your OTP for login is 482913. Do not share it with anyone.
```

---

## 🎯 Risk Levels

| Risk Level   | Meaning |
|-------------|----------|
| SAFE        | No fraud indicators detected |
| SUSPICIOUS  | Some scam-like patterns found |
| SCAM        | High probability of fraud |

---

## 🔐 Security Considerations

- CORS properly configured
- Environment variables used for API keys
- Model files excluded from Git
- No secrets pushed to repository
- Layered detection reduces false positives

---

## 📈 Future Improvements

- LLM fallback (OpenAI / Gemini)
- AbuseIPDB integration
- Domain age verification
- Behavioral anomaly detection
- Cloud deployment
- Real-time URL reputation scoring

---

