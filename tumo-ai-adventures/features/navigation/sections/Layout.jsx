import WorldScene from "@/features/world/sections/WorldScene";
import Butterflies from "@/features/world/sections/Butterflies";
import Header from "./Header";
import "../navigation.css";

export default function Layout({ children }) {
  return (
    <>
      <div className="world-bg" aria-hidden="true">
        <WorldScene />
        <Butterflies count={10} />
      </div>
      <Header />
      <main>{children}</main>
    </>
  );
}