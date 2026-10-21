import WorldScene from "@/features/world/sections/WorldScene";
import Butterflies from "@/features/world/sections/Butterflies";
import StartButton from "@/features/home/sections/StartButton";

export default function Hero() {
  return (
    <section className="world">
      <WorldScene />
      <Butterflies count={10} />

      <div className="world__content">
        <h1 className="world__title">Adventure World</h1>
        <p className="world__lead">
          Pick a hero, choose a genre and step into a story that is yours alone.
        </p>
        <StartButton />
      </div>
    </section>
  );
}
