from pydantic import BaseModel


class StoryRequest(BaseModel):
    theme: str
    genre: str
    style: str
    description: str
    steps: int