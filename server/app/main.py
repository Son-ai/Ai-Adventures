import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import GeneratedStory, StoryRequest
from app.services.gemini import generate_story

logger = logging.getLogger(__name__)

app = FastAPI(title="Adventure World API")

# lets the Next.js site (port 3000) call this API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/")
def root():
    return {"message": "Adventure World API is running!", "docs": "/docs"}


@app.post("/stories", response_model=GeneratedStory)
def create_story(payload: StoryRequest):
    try:
        return generate_story(payload)
    except Exception as exc:
        logger.exception("Story generation failed")
        raise HTTPException(
            status_code=502,
            detail="Could not generate the story. Check the backend terminal for details.",
        ) from exc