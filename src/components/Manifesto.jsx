import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const lays = projects.find((project) => project.id === "lays-maxx");
const spiderman = projects.find((project) => project.id === "spiderman-poster");
const jbl = projects.find((project) => project.id === "jbl-black-friday");

const words = [
  "I", "BUILD", "VISUAL", "SYSTEMS", "THAT", "FEEL", "IMMEDIATE,", "CINEMATIC", "AND", "IMPOSSIBLE", "TO", "SCROLL", "PAST."
];

function RevealWord({ word, progress, index, total }) {
  const start = 0.08 + (index / total) * 0.7;
  const end = Math.min(0.96, start + 0.14);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);
  const blur = useTransform(progress, [start, end], ["blur(8px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, y, filter: blur }} className={`mr-[0.2em] inline-block ${word === "CINEMATIC" || word === "IMPOSSIBLE" ? "text-acid-on-paper" : ""}`}>
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const [frame, setFrame] = useState(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });
  const leftY = useTransform(progress, [0, 1], [160, -170]);
  const rightY = useTransform(progress, [0, 1], [-90, 190]);
  const centerY = useTransform(progress, [0.1, 0.9], [120, -120]);
  const leftRotate = useTransform(progress, [0, 1], [-13, -4]);
  const rightRotate = useTransform(progress, [0, 1], [10, 3]);
  const lineScale = useTransform(progress, [0.04, 0.92], [0, 1]);
  const backgroundX = useTransform(progress, [0, 1], [0, -380]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setFrame(Math.min(12, Math.max(1, Math.ceil(value * 12))));
  });

  return (
    <section ref={ref} className="relative h-[270vh] bg-paper text-ink lg:h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 editorial-grid opacity-50" />
        <motion.div style={{ x: backgroundX }} className="pointer-events-none absolute left-[-4vw] top-[18%] whitespace-nowrap font-display text-[19vw] font-bold tracking-[-0.09em] text-ink/[0.025]" aria-hidden="true">
          CONCEPT / COMPOSITION / IMPACT / CONCEPT / COMPOSITION
        </motion.div>

        <motion.div style={{ y: leftY, rotate: leftRotate }} className="absolute -left-7 top-[22%] hidden h-[40vh] w-[18vw] max-w-[285px] overflow-hidden rounded-[24px] border border-ink/10 bg-white p-2 shadow-[0_30px_90px_rgba(16,16,15,0.18)] lg:block">
          <ArtworkImage src={lays.image} alt="" className="h-full w-full rounded-[17px]" />
        </motion.div>
        <motion.div style={{ y: rightY, rotate: rightRotate }} className="absolute -right-5 bottom-[14%] hidden h-[43vh] w-[19vw] max-w-[300px] overflow-hidden rounded-[24px] border border-ink/10 bg-white p-2 shadow-[0_30px_90px_rgba(16,16,15,0.18)] lg:block">
          <ArtworkImage src={spiderman.image} alt="" className="h-full w-full rounded-[17px]" />
        </motion.div>
        <motion.div style={{ y: centerY, rotate: -4 }} className="absolute bottom-[5%] right-[25%] hidden h-[25vh] w-[17vw] max-w-[250px] overflow-hidden rounded-[20px] border border-ink/10 bg-white p-2 shadow-[0_24px_70px_rgba(16,16,15,0.15)] xl:block">
          <ArtworkImage src={jbl.image} alt="" className="h-full w-full rounded-[14px]" />
        </motion.div>

        <div className="page-shell relative z-10 w-full">
          <div className="mb-9 flex items-center justify-between border-b border-ink/20 pb-4">
            <p className="spec-label flex items-center gap-2 text-ink/55"><RegMark size={14} /> Design philosophy / Scroll to reveal</p>
            <div className="hidden items-center gap-4 sm:flex">
              <span className="spec-label text-ink/35">Frame</span>
              <span className="font-display text-2xl font-semibold tabular-nums tracking-[-0.05em]">{String(frame).padStart(2, "0")}</span>
              <span className="spec-label text-ink/35">/ 12</span>
            </div>
          </div>

          <div className="mx-auto max-w-[1120px] py-8 lg:py-0">
            <p className="font-display text-[11.7vw] font-semibold leading-[0.88] tracking-[-0.072em] sm:text-[8.5vw] lg:text-[5.15vw]">
              {words.map((word, index) => (
                <RevealWord key={`${word}-${index}`} word={word} progress={progress} index={index} total={words.length} />
              ))}
            </p>
            <div className="mt-10 grid gap-8 border-t border-ink/20 pt-6 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-14">
              <p className="max-w-xl text-sm leading-relaxed text-ink/55 sm:text-base">
                Every project begins with one clear idea, then grows through hierarchy, atmosphere, typography and controlled detail. The result should not only look polished—it should hold attention.
              </p>
              <div className="flex items-center gap-3 spec-label text-ink/45">
                <span className="h-2 w-2 rounded-full bg-ink" /> Strategy → Craft → Impact
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
          <div className="h-px bg-ink/15">
            <motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-ink" />
          </div>
          <div className="mt-3 flex justify-between spec-label text-ink/35"><span>Manifesto / 01</span><span>Keep moving ↓</span></div>
        </div>
      </div>
    </section>
  );
}
