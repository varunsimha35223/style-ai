# StyleAI — AI Clothing & Color Recommendation App

![StyleAI Banner](https://placehold.co/1200x400/0f0e0d/ffffff?text=StyleAI+%E2%80%94+Dress+for+your+body.)

Upload 3 photos → AI reads your skin tone, body type, and face shape → Get a complete personal style guide.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

---

## Screenshots

### Home Page
![Home Page](https://placehold.co/1200x700/ffffff/0f0e0d?text=Home+%E2%80%94+%22Dress+for+your+body.%22+Hero+%2B+Pastel+Feature+Pills+%2B+How+it+Works)

### Upload Page — 3 Photo Slots
![Upload Page](https://placehold.co/1200x700/f9f7f4/0f0e0d?text=Upload+%E2%80%94+3+Pastel+Photo+Slots+%2B+Occasions+%2B+Budget+Selector)

### Results Page — Style Profile
![Results Page](https://placehold.co/1200x700/0f0e0d/ffffff?text=Results+%E2%80%94+Dark+Profile+Banner+%2B+Color+Swatches+%2B+Style+Sections)

---

## Sample AI Result

Below is a real example of what the AI returns for a user:

### 🎨 Color Palette
| Best Colors | Hex |
|---|---|
| Navy Blue | ![#1e3a5f](https://placehold.co/16x16/1e3a5f/1e3a5f) `#1e3a5f` |
| Cream | ![#fef9ef](https://placehold.co/16x16/fef9ef/fef9ef) `#fef9ef` |
| Olive Green | ![#6b7c2e](https://placehold.co/16x16/6b7c2e/6b7c2e) `#6b7c2e` |
| Dusty Rose | ![#c99a9a](https://placehold.co/16x16/c99a9a/c99a9a) `#c99a9a` |
| Camel | ![#c19a6b](https://placehold.co/16x16/c19a6b/c19a6b) `#c19a6b` |

> _"Your warm undertone means earthy, muted tones will harmonize beautifully with your complexion. Avoid stark white and cool blues which can wash you out."_

---

### 👤 Body Type Result
```
Body Type: Inverted Triangle
Undertone:  Warm
Skin Tone:  Medium Brown
Face Shape: Oval
```

**Dressing tips the AI gives:**
- Balance broad shoulders with wide-leg trousers or A-line skirts
- Avoid boat necklines — opt for V-necks and scoop necks instead
- Add volume at the hip with patterned bottoms or pleated trousers
- Fitted blazers that taper at the waist work great for office looks

---

### 🧥 Style Suggestions

`Straight-leg trousers` &nbsp; `Relaxed blazers` &nbsp; `V-neck tops` &nbsp; `A-line skirts` &nbsp; `Wrap dresses` &nbsp; `Bootcut jeans`

**Avoid:** ~~Shoulder pads~~ &nbsp; ~~Boat necks~~ &nbsp; ~~Puff sleeves~~

---

### 📅 Outfit Ideas by Occasion

| Occasion | AI Suggestion |
|---|---|
| Daily Casual | Olive wide-leg linen trousers + white fitted V-neck tee + tan leather sandals |
| Office | Navy straight-cut trousers + cream silk blouse + brown loafers |
| College | Dark wash bootcut jeans + dusty rose fitted crew-neck + white sneakers |
| Formal Events | Dusty rose wrap midi dress + nude block heels + minimal gold jewellery |

---

### 💡 Pro Stylist Tips

1. Invest in one well-fitted navy blazer — it works across every occasion you listed
2. Your skin tone glows next to camel and tan — build your wardrobe around these neutrals
3. For formal events, choose fabrics with a subtle drape (silk, chiffon, crepe) — they photograph beautifully on oval face shapes

---

## How It Works

```
User uploads 3 photos
        ↓
Frontend sends to FastAPI backend (multipart/form-data)
        ↓
Backend sends all 3 images + user preferences to Gemini 2.5 Flash
        ↓
Gemini returns structured JSON (skin tone, body type, colors, outfits...)
        ↓
Results page renders full personalized style guide
```

---

## Project Structure

```
style-ai/
├── backend/
│   ├── main.py            # FastAPI — POST /analyze
│   ├── gemini_client.py   # Gemini Vision API integration
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx      # Landing page
    │   │   ├── Upload.jsx    # Photo upload + questions
    │   │   └── Results.jsx   # Full AI result display
    │   ├── components/
    │   │   └── PhotoSlot.jsx # Drag & drop photo card
    │   └── api/
    │       └── client.js     # Axios API client
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
1. Go to [render.com](https://render.com) → **New → Blueprint**
2. Connect `varunsimha35223/style-ai` — Render reads `render.yaml` automatically
3. Add env var: `GEMINI_API_KEY`

### Frontend → Vercel
1. Go to [vercel.com/new](https://vercel.com/new) → Import this repo
2. Set **Root Directory** → `frontend`
3. Add env var: `VITE_API_URL` = your Render backend URL
4. Deploy

---

## Get a Free Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → Create API key (free)
3. Free tier: 15 requests/min · 1,500/day

---

## Features

- No login or signup required
- Photos processed instantly, never stored or saved
- Outfit style inspiration photos via Flickr
- Fully responsive — works on mobile and desktop
- Free to use and deploy
