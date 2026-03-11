import os
import json
import base64
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "gemini-1.5-flash"

SYSTEM_PROMPT = """You are an expert personal stylist and color analyst with 20+ years of experience.
Analyze the provided photos carefully and return ONLY a valid JSON object with no extra text.

The JSON must have exactly these keys:
{
  "skin_tone": "string describing skin tone (e.g., Fair, Light, Medium, Olive, Tan, Deep)",
  "undertone": "string (Warm / Cool / Neutral)",
  "best_colors": ["color1", "color2", "color3", "color4", "color5"],
  "avoid_colors": ["color1", "color2", "color3"],
  "color_reasoning": "2-3 sentence explanation of why these colors work",
  "body_type": "string (e.g., Rectangle, Hourglass, Pear, Apple, Inverted Triangle, Athletic)",
  "body_tips": ["tip1", "tip2", "tip3"],
  "face_shape": "string (e.g., Oval, Round, Square, Heart, Diamond, Oblong)",
  "style_suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"],
  "avoid_styles": ["style1", "style2", "style3"],
  "outfit_ideas": {
    "Daily Casual": "specific outfit suggestion",
    "Office": "specific outfit suggestion",
    "College": "specific outfit suggestion",
    "Gym": "specific outfit suggestion",
    "Formal Events": "specific outfit suggestion"
  },
  "pro_tips": ["tip1", "tip2", "tip3"]
}

Only include outfit_ideas for occasions provided by the user. Be specific, practical, and encouraging.
"""

def encode_image(image_bytes: bytes, mime_type: str) -> dict:
    return {
        "mime_type": mime_type,
        "data": base64.b64encode(image_bytes).decode("utf-8")
    }

async def analyze_style(
    photo1_bytes: bytes, photo1_mime: str,
    photo2_bytes: bytes, photo2_mime: str,
    photo3_bytes: bytes, photo3_mime: str,
    occasions: str,
    budget: str,
    color_preference: str
) -> dict:
    model = genai.GenerativeModel(MODEL)

    user_context = f"""
Please analyze these 3 photos:
- Photo 1: Front full-body shot
- Photo 2: Face closeup
- Photo 3: Side profile full-body shot

User preferences:
- Occasions they dress for: {occasions}
- Budget range: {budget}
- Colors they love or want to avoid: {color_preference}

Return ONLY the JSON object as described, tailored to these occasions: {occasions}.
"""

    img1 = encode_image(photo1_bytes, photo1_mime)
    img2 = encode_image(photo2_bytes, photo2_mime)
    img3 = encode_image(photo3_bytes, photo3_mime)

    response = model.generate_content([
        {"inline_data": img1},
        {"inline_data": img2},
        {"inline_data": img3},
        user_context,
        SYSTEM_PROMPT,
    ])

    raw = response.text.strip()

    # Strip markdown code fences if present
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    return json.loads(raw)
