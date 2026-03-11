# StyleAI — AI Clothing & Color Recommendation App

Upload 3 photos and get a personalized style guide built by Google Gemini Vision AI — colors, body type, outfit ideas, and pro stylist tips.

**Live Demo:** _coming soon_

---

## What it does

1. **Upload 3 photos** — front body, face closeup, side profile
2. **AI analyzes you** — skin tone, undertone, body type, face shape
3. **Get your guide** — color palette, styles that suit you, daily outfit ideas per occasion, and pro tips

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite, pure inline styles |
| Backend | FastAPI (Python) |
| AI | Google Gemini 2.5 Flash Vision |
| Deploy | Vercel (frontend) · Render (backend) |

---

## Project Structure

```
style-ai/
├── backend/
│   ├── main.py            # FastAPI — POST /analyze
│   ├── gemini_client.py   # Gemini Vision API
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Upload.jsx
    │   │   └── Results.jsx
    │   ├── components/
    │   │   └── PhotoSlot.jsx
    │   └── api/
    │       └── client.js
    └── vercel.json
```

---

## Run Locally

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# create .env
echo "GEMINI_API_KEY=your_key_here" > .env
echo "FRONTEND_URL=http://localhost:5173" >> .env

uvicorn main:app --reload --port 8001
```

### Frontend
```bash
cd frontend
npm install

# create .env.local
echo "VITE_API_URL=http://localhost:8001" > .env.local

npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploy

### Backend → Render
1. Connect this repo on [render.com](https://render.com)
2. Click **New → Blueprint** — Render reads `render.yaml` automatically
3. Add env var: `GEMINI_API_KEY`

### Frontend → Vercel
1. Import this repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add env var: `VITE_API_URL` = your Render backend URL

---

## Get a Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → Create API key
3. Free tier: 15 requests/min, 1500/day

---

## Features

- No login required — completely open
- Photos processed instantly, never stored
- Outfit style inspiration photos via Flickr
- Works on mobile and desktop
