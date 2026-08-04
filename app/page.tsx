import { Background } from "./components/Background";
import { Menu } from "./components/Menu";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Parcours } from "./components/Parcours";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Menu />
      <main className="relative z-10">
        <Hero />
      <About />
      <Skills />
      <Projects />
      <Parcours />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
