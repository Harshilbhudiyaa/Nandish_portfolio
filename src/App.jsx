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
import { projectImageUrls } from "./data/projects";

const MINIMUM_LOADER_TIME = 2700;
const MAXIMUM_LOADER_TIME = 8500;

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
    const total = projectImageUrls.length;
    let completed = 0;

    const updateProgress = () => {
      completed += 1;
      if (!cancelled) setProgress(Math.round((completed / total) * 100));
    };

    const preload = projectImageUrls.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            updateProgress();
            resolve();
          };
          image.onload = finish;
          image.onerror = finish;
          image.src = src;
          if (image.complete) finish();
        }),
    );

    const fontReady = document.fonts?.ready
      ? Promise.race([document.fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 1400))])
      : Promise.resolve();

    const completeLoader = async () => {
      await Promise.all([...preload, fontReady]);
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, (reducedMotion ? 100 : MINIMUM_LOADER_TIME) - elapsed);
      await new Promise((resolve) => window.setTimeout(resolve, remaining));
      if (!cancelled) {
        setProgress(100);
        window.setTimeout(() => !cancelled && setLoading(false), reducedMotion ? 0 : 300);
      }
    };

    completeLoader();
    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setLoading(false);
      }
    }, reducedMotion ? 600 : MAXIMUM_LOADER_TIME);

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
