import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from gemini_client import analyze_style

load_dotenv()

app = FastAPI(title="StyleAI API")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Collect all allowed origins — env var + localhost + any vercel.app subdomains
_origins = [FRONTEND_URL, "http://localhost:5173", "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_MIME = {"image/jpeg", "image/jpg", "image/png", "image/webp"}
MAX_SIZE = 10 * 1024 * 1024  # 10 MB per photo


@app.get("/")
def root():
    return {"status": "StyleAI backend running"}


@app.post("/analyze")
async def analyze(
    photo1: UploadFile = File(...),
    photo2: UploadFile = File(...),
    photo3: UploadFile = File(...),
    occasions: str = Form(...),
    budget: str = Form(...),
    color_preference: str = Form(...),
):
    photos = [photo1, photo2, photo3]
    photo_data = []

    for i, photo in enumerate(photos, 1):
        if photo.content_type not in ALLOWED_MIME:
            raise HTTPException(
                status_code=400,
                detail=f"Photo {i}: unsupported format. Use JPEG, PNG, or WebP."
            )
        content = await photo.read()
        if len(content) > MAX_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"Photo {i} exceeds 10 MB limit."
            )
        photo_data.append((content, photo.content_type))

    try:
        result = await analyze_style(
            photo_data[0][0], photo_data[0][1],
            photo_data[1][0], photo_data[1][1],
            photo_data[2][0], photo_data[2][1],
            occasions=occasions,
            budget=budget,
            color_preference=color_preference,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")

    return result
