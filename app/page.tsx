import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-10">
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
