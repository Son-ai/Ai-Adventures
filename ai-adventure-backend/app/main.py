from fastapi import FastAPI
from app.schemas import StoryRequest
from app.services.gemini import generate_story

app = FastAPI()


@app.get("/")
def root():
    return {
        "message": "AI Adventure API is running!"
    }


@app.post("/stories")
def create_story(story: StoryRequest):
    generated_story = generate_story(
        theme=story.theme,
        genre=story.genre,
        style=story.style,
        description=story.description,
        steps=story.steps,
    )

    return {
        "story": generated_story
    }
