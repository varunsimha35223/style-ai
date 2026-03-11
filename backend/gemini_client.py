import os
import json
import base64
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "gemini-2.5-flash"

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

async def analyze_style(
    photo1_bytes: bytes, photo1_mime: str,
    photo2_bytes: bytes, photo2_mime: str,
    photo3_bytes: bytes, photo3_mime: str,
    occasions: str,
    budget: str,
    color_preference: str
) -> dict:

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

    contents = [
        types.Part.from_bytes(data=photo1_bytes, mime_type=photo1_mime),
        types.Part.from_bytes(data=photo2_bytes, mime_type=photo2_mime),
        types.Part.from_bytes(data=photo3_bytes, mime_type=photo3_mime),
        types.Part.from_text(text=user_context),
        types.Part.from_text(text=SYSTEM_PROMPT),
    ]

    response = client.models.generate_content(
        model=MODEL,
        contents=contents,
    )

    raw = response.text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    return json.loads(raw)
