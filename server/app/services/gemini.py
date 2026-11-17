import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas import StoryRequest

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")

SYSTEM_PROMPT = """
You are a master storyteller who writes adventure stories that feel like real books.

- Write in a warm, vivid storytelling voice with sensory details.
- Give the hero a personality, a clear goal and real obstacles.
- Include dialogue and one surprising but logical twist.
- End with a satisfying, earned ending.
- Keep it original, age-appropriate, with no graphic violence.
- Do not create reader choices or branching paths.
"""


def generate_story(story: StoryRequest) -> dict:
    prompt = f"""
    Write a complete, original adventure story.

    Main character: {story.character_name}
    World: {story.world}
    Genre: {story.genre}
    Style: {story.style}
    Opening scene: {story.description}
    Number of pages: {story.steps}

    Rules:
    - Create exactly {story.steps} pages.
    - Each page has 5 to 7 rich sentences and a meaningful event.
    - The story has a beginning, a middle and an ending.
    - Write in English.
    - Return only JSON.

    JSON format:
    {{
        "title": "A creative story title",
        "pages": ["First page...", "Second page...", "Third page..."]
    }}
    """

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
        ),
    )

    return json.loads(response.text)