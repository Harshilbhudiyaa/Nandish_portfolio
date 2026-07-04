import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import Work from "./components/Work";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";
import CustomCursor from "./components/CustomCursor";
import { projects } from "./data/projects";

const MINIMUM_LOADER_TIME = 850;
const MAXIMUM_LOADER_TIME = 2600;
const heroImages = [projects[8]?.image, projects[7]?.image, projects[3]?.image].filter(Boolean);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    const tasks = [...heroImages, "fonts"];
    let completed = 0;

    const advance = () => {
      completed += 1;
      if (!cancelled) setProgress(Math.min(100, Math.round((completed / tasks.length) * 100)));
    };

    const imageTasks = heroImages.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          const done = () => {
            advance();
            resolve();
          };
          image.onload = done;
          image.onerror = done;
          image.src = src;
        }),
    );

    const fontTask = document.fonts?.ready
      ? Promise.race([document.fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 700))]).finally(advance)
      : Promise.resolve().finally(advance);

    const finish = async () => {
      await Promise.allSettled([...imageTasks, fontTask]);
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, (reducedMotion ? 80 : MINIMUM_LOADER_TIME) - elapsed);
      await new Promise((resolve) => window.setTimeout(resolve, wait));
      if (!cancelled) {
        setProgress(100);
        window.setTimeout(() => !cancelled && setLoading(false), reducedMotion ? 0 : 140);
      }
    };

    finish();
    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setLoading(false);
      }
    }, reducedMotion ? 400 : MAXIMUM_LOADER_TIME);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = loading ? "hidden" : "";
    document.body.dataset.ready = loading ? "false" : "true";
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.ready;
    };
  }, [loading]);

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-body text-ink">
      <IntroLoader visible={loading} progress={progress} />
      <CustomCursor />
      <div className="page-noise" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero isReady={!loading} />
        <Marquee />
        <Manifesto />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
