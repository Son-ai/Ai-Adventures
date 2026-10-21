"use client";

import { useState } from "react";
import { worlds, genres } from "@/features/create/data";

const initialValues = {
  characterName: "",
  world: worlds[0],
  genre: genres[0],
  description: "",
  steps: 8,
};

export default function Form() {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: name === "steps" ? Number(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(values);
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
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
              onClick={() => {
                setValues((current) => ({ ...current, world: item }));
              }}
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
              onClick={() => {
                setValues((current) => ({ ...current, genre: item }));
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="create-field">
        <span>Description</span>
        <textarea
          name="description"
          rows={4}
          placeholder="A magical castle in the clouds..."
          value={values.description}
          onChange={handleChange}
        />
      </label>

      <label className="create-field">
        <span>Steps</span>
        <input
          name="steps"
          type="number"
          min={3}
          max={20}
          value={values.steps}
          onChange={handleChange}
        />
      </label>

      <button className="start-button" type="submit">
        Begin the Story
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
