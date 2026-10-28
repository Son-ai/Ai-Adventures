"use client";

import { useState } from "react";

export default function StoryView({ story, onReset }) {
  const [index, setIndex] = useState(0);

  const scene = story.scenes[index];
  const isLast = index === story.scenes.length - 1;

  return (
    <article className="story">
      <h2 className="story__title">{story.title}</h2>
      <p className="story__progress">
        Step {index + 1} of {story.scenes.length}
      </p>

      <p className="story__text">{scene.text}</p>

      {isLast ? (
        <div className="story__end">
          <p className="story__text">The end.</p>
          <button className="start-button" type="button" onClick={onReset}>
            Create another story
          </button>
        </div>
      ) : (
        <div className="story__choices">
          {scene.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              className="story__choice"
              onClick={() => setIndex((current) => current + 1)}
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}