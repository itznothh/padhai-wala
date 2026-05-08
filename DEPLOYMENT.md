# 🚀 Padhai Wala — Complete Deployment Guide

## STEP 0 — Get Your Free API Keys (Do this first!)

### Gemini API Key (Google AI Studio)
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key" → "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Save it somewhere safe

### Serper API Key (Google Search API)
1. Go to https://serper.dev
2. Click "Sign Up" → use Google or email
3. Dashboard → "API Key" tab → Copy the key
4. Free plan gives 2,500 searches/month (more than enough for hackathon)

---

## STEP 1 — Push to GitHub

```bash
cd padhai-wala

# Initialize git
git init
git add .
git commit -m "🎓 Initial commit — Padhai Wala multi-agent AI"

# Create repo on github.com:
# → Click "+" → "New repository"
# → Name: padhai-wala
# → Public (for hackathon visibility)
# → Do NOT add README (we already have one)
# → Click "Create repository"

# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/padhai-wala.git
git branch -M main
git push -u origin main
```

---

## STEP 2 — Deploy Backend on Render (Free)

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo → select `padhai-wala`
4. Configure:
   ```
   Name:          padhai-wala-backend
   Root Directory: backend
   Runtime:       Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   GEMINI_API_KEY  = AIza... (your key from Step 0)
   SERPER_API_KEY  = your_serper_key (from Step 0)
   ```
6. Click **"Create Web Service"**
7. Wait 3–5 minutes for build
8. Copy your URL: `https://padhai-wala-backend.onrender.com`
9. Test it: open `https://padhai-wala-backend.onrender.com/health` — should show JSON

---

## STEP 3 — Deploy Frontend on Vercel (Free)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"New Project"** → Import `padhai-wala` repo
3. Configure:
   ```
   Framework Preset: Vite
   Root Directory:   frontend
   Build Command:    npm run build
   Output Directory: dist
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL = https://padhai-wala-backend.onrender.com
   ```
   (Replace with your actual Render URL from Step 2)
5. Click **"Deploy"**
6. Wait 2 minutes
7. Your app is live at: `https://padhai-wala.vercel.app` 🎉

---

## STEP 4 — Test Your Live App

Open your Vercel URL and try these test scenarios:

### Scenario 1 — General family
```
"Mera beta 7 saal ka hai, main ₹12,000 mahine kamata hoon,
Whitefield Bangalore mein rehta hoon, General category"
```
Expected: BBMP school (free, walk-in) + RTE quota + document checklist

### Scenario 2 — SC girl
```
"Meri beti 11 saal ki hai, SC category, income ₹8000/month, Hebbal area"
```
Expected: KGBV residential school + Vidyasiri scholarship + action plan

### Scenario 3 — Rejection handling
```
"RTE mein reject ho gaya, ab kya karoon?"
```
Expected: Next 2-3 alternatives with new deadlines

---

## ⚠️ Common Issues & Fixes

| Problem | Fix |
|---|---|
| Backend shows "Application error" | Check Render logs → ensure env vars are set |
| Frontend shows "Network Error" | Verify VITE_API_URL in Vercel env vars matches Render URL |
| Gemini not responding | Check GEMINI_API_KEY is correct in Render |
| Serper not working | Check SERPER_API_KEY; app still works without it (uses fallback) |
| Render sleeps after 15min | Free tier sleeps — first request after sleep takes ~30 sec |

---

## 📊 Cost Summary
| Service | Plan | Cost |
|---|---|---|
| Render (backend) | Free | ₹0 |
| Vercel (frontend) | Free | ₹0 |
| Gemini 2.0 Flash | Free tier (1M tokens/day) | ₹0 |
| Serper API | Free (2,500 searches/month) | ₹0 |
| **Total** | | **₹0** |
