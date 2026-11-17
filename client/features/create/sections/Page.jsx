import Hero from "@/features/create/sections/Hero";
import Form from "@/features/create/sections/Form";
import "../create.css";

export default function Page() {
  return (
    <section className="page">
      <div className="create">
        <Hero />
        <Form />
      </div>
    </section>
  );
}