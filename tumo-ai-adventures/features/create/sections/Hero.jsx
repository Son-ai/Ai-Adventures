import WorldScene from "@/features/world/sections/WorldScene";
import Butterflies from "@/features/world/sections/Butterflies";
import StartButton from "@/features/home/sections/StartButton";

export default function Hero() {
  return (
    <section className="world">
      <WorldScene />
      <Butterflies count={10} />

      <div className="world__content">
        <h1 className="world__title">AI Adventure World</h1>
        <p className="world__lead">
          Step into a world where your imagination meets the power of AI.
        </p>
        <StartButton />
      </div>
    </section>
  );
}

