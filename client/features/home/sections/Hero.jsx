import StartButton from "@/features/home/sections/StartButton";

export default function Hero() {
  return (
    <section className="page page--home">
      <div className="page__content">
        <h1 className="page__title">Adventure World</h1>
        <p className="page__lead">
          Pick a hero, choose a world and step into a story that is yours alone.
        </p>
        <StartButton />
      </div>
    </section>
  );
}