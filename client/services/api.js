const API_URL = "http://127.0.0.1:8000";

export async function createStory(values) {
  let response;

  try {
    response = await fetch(`${API_URL}/stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character_name: values.characterName,
        world: values.world,
        genre: values.genre,
        style: values.style,
        description: values.description,
        steps: values.steps,
      }),
    });
  } catch {
    throw new Error("Cannot reach the story server. Is the backend running?");
  }

  if (!response.ok) {
    let message = `Story generation failed (${response.status})`;

    try {
      const result = await response.json();
      if (typeof result.detail === "string") message = result.detail;
    } catch {
      // the backend may return a non-JSON error
    }

    throw new Error(message);
  }

  return response.json();
}