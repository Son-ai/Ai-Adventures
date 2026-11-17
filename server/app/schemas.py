from pydantic import BaseModel, Field


class StoryRequest(BaseModel):
    character_name: str = Field(min_length=1, max_length=150)
    world: str = Field(min_length=1, max_length=150)
    genre: str = Field(min_length=1, max_length=100)
    style: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=3000)
    steps: int = Field(ge=3, le=20)


class GeneratedStory(BaseModel):
    title: str
    pages: list[str]