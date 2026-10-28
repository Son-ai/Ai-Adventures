const API_URL = "http://127.0.0.1:8000";

export async function createStory(values) {
  let response;

  try {
    response = await fetch(`${API_URL}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: values.world,
        genre: values.genre,
        style: values.style,
        description: `Main character: ${values.characterName}. ${values.description}`,
        steps: values.steps,
      }),
    });
  } catch {
    throw new Error("Cannot reach the story server. Is the backend running?");
  }

  if (!response.ok) {
    throw new Error("The story could not be created. Try again.");
  }

  const data = await response.json();
  const text = data.story.replace(/```json|```/g, "").trim();

  return JSON.parse(text);
}