"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStory } from "@/services/api";
import { saveBook } from "@/services/storage";
import { worlds, genres, styles } from "@/features/create/data";

const initialValues = {
  characterName: "",
  world: worlds[0],
  genre: genres[0],
  description: "",
  style: styles[0],
  steps: 8,
};

export default function Form() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: name === "steps" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const generated = await createStory(values);

      const book = {
        id: crypto.randomUUID(),
        ...values,
        title: generated.title,
        pages: generated.pages,
      };

      saveBook(book);
      router.push(`/book/${book.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div className="create-columns">
        <div className="create-col">
          <label className="create-field">
            <span>Character name</span>
            <input
              name="characterName"
              type="text"
              required
              placeholder="Luna the Wanderer"
              value={values.characterName}
              onChange={handleChange}
            />
          </label>

          <fieldset className="create-field">
            <legend>World</legend>
            <div className="genre-chips">
              {worlds.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`genre-chip${values.world === item ? " is-selected" : ""}`}
                  aria-pressed={values.world === item}
                  onClick={() => setValues((current) => ({ ...current, world: item }))}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="create-field">
            <legend>Genre</legend>
            <div className="genre-chips">
              {genres.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`genre-chip${values.genre === item ? " is-selected" : ""}`}
                  aria-pressed={values.genre === item}
                  onClick={() => setValues((current) => ({ ...current, genre: item }))}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="create-col create-col--right">
          <label className="create-field create-field--grow">
            <span>Description</span>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="A lantern-lit path leading into the glowing woods…"
              value={values.description}
              onChange={handleChange}
            />
          </label>

          <div className="create-row">
            <label className="create-field">
              <span>Style</span>
              <select name="style" value={values.style} onChange={handleChange}>
                {styles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="create-field">
              <span>Steps</span>
              <input
                name="steps"
                type="number"
                required
                min={3}
                max={20}
                value={values.steps}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>

      {error && (
        <p className="create-error" role="alert">
          {error}
        </p>
      )}

      <button className="start-button" type="submit" disabled={loading}>
        {loading ? "Writing your story…" : "Begin the Story"}
        {!loading && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}