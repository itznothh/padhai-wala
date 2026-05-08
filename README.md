# 🧑‍👧 Padhai Wala
### *The AI neighbour every low-income family deserves*

A multi-agent AI web app that helps low-income, uneducated parents in India find **free and affordable school options** for their children — in simple Hindi/English, step by step.

---

## 🚀 Live Demo
- Frontend: `https://padhai-wala.vercel.app`
- Backend: `https://padhai-wala-backend.onrender.com`

---

## 🤖 The 4 Agents

| Agent | Role |
|---|---|
| **Saathi** | Orchestrator — talks to the user, collects info, formats final response |
| **Khoji** | Finds nearby government schools and eligible schemes |
| **Kagzi** | Maps each scheme to exact document checklist (office, cost, days) |
| **Nazar** | Checks deadlines and ranks options by urgency |

---

## 🛠 Tech Stack

- **Backend:** Python 3.11 + FastAPI + Google Gemini 2.0 Flash + Serper API
- **Frontend:** React + Vite + Tailwind CSS (mobile-first)
- **Deployment:** Render (backend) + Vercel (frontend)

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/padhai-wala.git
cd padhai-wala
```

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Fill in your API keys in .env
uvicorn main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Set VITE_API_URL=http://localhost:8000
npm run dev
```

---

## 🔑 Free API Keys

| Key | URL | Steps |
|---|---|---|
| `GEMINI_API_KEY` | https://aistudio.google.com | Sign in → Get API Key → Create → Copy |
| `SERPER_API_KEY` | https://serper.dev | Sign up → Dashboard → API Key → Copy |

Both are **completely free**. No credit card needed.

---

## 🏆 Hackathon Track
Community Track — Supporting Accessible Education

*"We didn't build a scheme finder. We built the educated neighbour that every low-income family deserves."*
