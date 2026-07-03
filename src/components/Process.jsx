import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Asterisk } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const steps = [
  {
    number: "01",
    title: "Find the signal.",
    eyebrow: "Discover / Direction",
    body: "Strip the brief back to the one message the audience must feel first. Research, references and intent become a focused visual direction.",
    image: projects[5].image,
    accent: "#d8b08c",
  },
  {
    number: "02",
    title: "Build the hierarchy.",
    eyebrow: "Structure / Composition",
    body: "Create a clear order for type, product, image and offer. Every element earns its place and supports the central idea.",
    image: projects[0].image,
    accent: "#3972ff",
  },
  {
    number: "03",
    title: "Create the atmosphere.",
    eyebrow: "Craft / Art direction",
    body: "Lighting, colour, texture and depth turn the layout into a visual world—premium, memorable and appropriate for the brand.",
    image: projects[7].image,
    accent: "#4c8dff",
  },
  {
    number: "04",
    title: "Polish every frame.",
    eyebrow: "Refine / Delivery",
    body: "Final details, responsive crops and production checks make the system work across social, digital and print without losing impact.",
    image: projects[8].image,
    accent: "#c48b42",
  },
];

function MobileProcess() {
  return (
    <div className="space-y-6 lg:hidden">
      {steps.map((step, index) => (
        <motion.article
          key={step.number}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.85, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045]"
        >
          <div className="relative aspect-[16/11] overflow-hidden">
            <ArtworkImage src={step.image} alt="" fit="contain" ambient className="h-full w-full" imageClassName="p-5" />
            <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 z-[4] font-display text-5xl font-semibold tracking-[-0.07em] text-acid">{step.number}</span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="spec-label mb-4 text-white/40">{step.eyebrow}</p>
            <h3 className="font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em]">{step.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base">{step.body}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.38 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);
  const ghostY = useTransform(progress, [0, 1], [80, -160]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length))));
  });

  const activeStep = steps[active];

  return (
    <section id="process" ref={ref} className="relative bg-ink text-white lg:h-[390vh]">
      <div className="page-shell py-24 sm:py-28 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-20">
        <div className="absolute inset-0 grid-pattern opacity-[0.055]" />
        <motion.div
          animate={{ backgroundColor: activeStep.accent }}
          transition={{ duration: 0.65 }}
          className="absolute -left-[20vw] top-[5vh] hidden h-[55vw] w-[55vw] rounded-full opacity-[0.11] blur-[160px] lg:block"
        />
        <motion.div style={{ y: ghostY }} className="pointer-events-none absolute right-[-4vw] top-[9%] hidden font-display text-[26vw] font-bold leading-none tracking-[-0.1em] text-white/[0.022] lg:block" aria-hidden="true">
          {activeStep.number}
        </motion.div>

        <div className="relative z-10 mb-12 flex items-end justify-between border-b border-white/10 pb-5 lg:mb-8">
          <div>
            <p className="spec-label mb-4 flex items-center gap-2 text-white/45"><RegMark size={14} className="text-acid" /> Creative process / Scroll sequence</p>
            <h2 className="font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[5.6vw]">From brief to<br /><span className="text-white/25">finished frame.</span></h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-relaxed text-white/45 lg:block">A disciplined process keeps the work expressive without becoming chaotic.</p>
        </div>

        <MobileProcess />

        <div className="relative z-10 hidden min-h-0 flex-1 grid-cols-[0.62fr_1.38fr] gap-[7vw] lg:grid">
          <div className="flex flex-col justify-between py-3">
            <div>
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    const top = ref.current?.offsetTop || 0;
                    const available = (ref.current?.offsetHeight || window.innerHeight) - window.innerHeight;
                    window.scrollTo({ top: top + available * (index / steps.length + 0.04), behavior: "smooth" });
                  }}
                  className={`group flex w-full items-center gap-5 border-b border-white/10 py-4 text-left transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-30 hover:opacity-65"}`}
                >
                  <span className={`font-display text-2xl font-semibold tracking-[-0.06em] ${index === active ? "text-acid" : "text-white"}`}>{step.number}</span>
                  <span className="font-display text-xl font-medium tracking-[-0.035em] xl:text-2xl">{step.title}</span>
                </button>
              ))}
            </div>
            <div>
              <div className="mb-4 flex items-center justify-between spec-label text-white/35"><span>Sequence progress</span><span>{String(active + 1).padStart(2, "0")} / 04</span></div>
              <div className="h-px bg-white/15"><motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-acid" /></div>
            </div>
          </div>

          <div className="grid min-h-0 grid-cols-[1.08fr_0.92fr] gap-8">
            <motion.div
              key={`${activeStep.number}-image`}
              initial={{ opacity: 0, y: 45, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-0 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-[0_40px_110px_rgba(0,0,0,0.45)]"
            >
              <ArtworkImage src={activeStep.image} alt="" fit="contain" ambient className="h-full w-full" imageClassName="p-8 xl:p-10" />
              <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/50 via-transparent to-black/5" />
              <span className="absolute left-6 top-6 z-[4] flex h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/15 px-4 spec-label backdrop-blur-xl">Frame {activeStep.number}</span>
            </motion.div>

            <div className="flex min-h-0 flex-col justify-between rounded-[30px] border border-white/10 bg-white/[0.035] p-7 xl:p-10">
              <motion.div
                key={`${activeStep.number}-copy`}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="spec-label mb-5 text-acid">{activeStep.eyebrow}</p>
                <h3 className="font-display text-[4.4vw] font-semibold leading-[0.86] tracking-[-0.067em] xl:text-[64px]">{activeStep.title}</h3>
                <p className="mt-7 max-w-md text-base leading-relaxed text-white/55">{activeStep.body}</p>
              </motion.div>
              <div className="flex items-end justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 spec-label text-white/35"><Asterisk size={12} className="text-acid" /> Nandish design system</div>
                <ArrowDownRight size={26} className="text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
