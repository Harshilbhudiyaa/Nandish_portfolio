import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Plus } from "lucide-react";
import { useRef } from "react";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const leftProject = projects.find((project) => project.id === "jack-daniels");
const centerProject = projects.find((project) => project.id === "ember-x");
const rightProject = projects.find((project) => project.id === "fashion-editorial");

const titleLines = [
  { text: "VISUALS", offset: "" },
  { text: "WITH", offset: "pl-[13vw] text-acid lg:pl-[16vw]" },
  { text: "GRAVITY.", offset: "" },
];

function HeroCard({ project, className, style, delay, label, priority = false }) {
  return (
    <motion.button
      type="button"
      data-cursor="Enter work"
      style={style}
      initial={{ opacity: 0, y: 110, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.25, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
      className={`group absolute overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.045] text-left shadow-[0_40px_100px_rgba(0,0,0,0.58)] backdrop-blur-sm lg:rounded-[26px] ${className}`}
    >
      <ArtworkImage
        src={project.image}
        alt={project.title}
        priority={priority}
        className="h-full w-full"
        imageClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
        objectPosition={project.objectPosition}
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/5 to-black/10" />
      <div className="absolute inset-0 z-[3] ring-1 ring-inset ring-white/10" />
      <div className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="spec-label mb-2 text-white/45">{label}</p>
          <p className="font-display text-lg font-semibold leading-tight tracking-[-0.04em] text-white sm:text-xl">{project.title}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

export default function Hero({ isReady = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const easedProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const titleY = useTransform(easedProgress, [0, 0.6, 1], [0, -70, -270]);
  const titleScale = useTransform(easedProgress, [0, 0.7], [1, 0.77]);
  const titleOpacity = useTransform(easedProgress, [0, 0.62, 0.9], [1, 0.45, 0]);
  const cardsY = useTransform(easedProgress, [0, 1], [0, -360]);
  const cardsScale = useTransform(easedProgress, [0, 0.8], [1, 1.18]);
  const cardsRotate = useTransform(easedProgress, [0, 1], [0, -2.5]);
  const leftX = useTransform(easedProgress, [0, 1], [0, -240]);
  const rightX = useTransform(easedProgress, [0, 1], [0, 240]);
  const centerY = useTransform(easedProgress, [0, 1], [0, -95]);
  const ghostX = useTransform(easedProgress, [0, 1], [0, -520]);
  const outroOpacity = useTransform(easedProgress, [0.58, 0.82], [0, 1]);
  const outroScale = useTransform(easedProgress, [0.58, 0.9], [0.82, 1]);
  const lineScale = useTransform(easedProgress, [0, 0.9], [0, 1]);

  return (
    <section id="top" ref={ref} className="relative min-h-[980px] bg-ink text-white lg:h-[220vh] lg:min-h-0">
      <div className="relative min-h-[980px] overflow-hidden lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0">
        <div className="absolute inset-0 grid-pattern opacity-[0.10]" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="absolute inset-0 hero-vignette" />

        <motion.div
          style={{ x: ghostX }}
          className="pointer-events-none absolute left-[-4vw] top-[17%] whitespace-nowrap font-display text-[27vw] font-bold leading-none tracking-[-0.1em] text-transparent opacity-[0.055] [-webkit-text-stroke:1px_white]"
          aria-hidden="true"
        >
          NANDISH® NANDISH®
        </motion.div>

        <div className="page-shell relative z-10 flex min-h-[980px] flex-col pb-7 pt-24 sm:pb-10 lg:h-[100svh] lg:min-h-0 lg:pt-[82px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 py-4"
          >
            <p className="spec-label flex items-center gap-2 text-white/60">
              <RegMark size={14} className="text-acid" /> Independent graphic designer / India
            </p>
            <div className="flex items-center gap-5 spec-label text-white/40 sm:gap-8">
              <span className="hidden sm:inline">Campaign / Editorial / Compositing</span>
              <span className="flex items-center gap-2"><i className="availability-dot" /> Available for projects</span>
            </div>
          </motion.div>

          <motion.div
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
            className="relative z-20 mt-5 origin-top-left lg:mt-3"
          >
            <h1 className="max-w-[1440px] font-display text-[20vw] font-bold leading-[0.69] tracking-[-0.09em] sm:text-[16vw] lg:text-[8.95vw]">
              {titleLines.map((line, index) => (
                <span key={line.text} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    initial={{ y: "118%", rotate: index === 1 ? -1.5 : 1.5 }}
                    animate={isReady ? { y: 0, rotate: 0 } : { y: "118%", rotate: index === 1 ? -1.5 : 1.5 }}
                    transition={{ duration: 1.12, delay: 0.12 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${line.offset}`}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.85, delay: 0.85 }}
              className="absolute right-0 top-[36%] hidden w-[245px] border-t border-white/20 pt-4 lg:block"
            >
              <p className="text-sm leading-relaxed text-white/45">
                Campaigns, posters, editorial systems and cinematic compositions built to turn attention into memory.
              </p>
              <div className="mt-5 flex items-center gap-2 spec-label text-acid"><Asterisk size={13} /> Scroll-directed portfolio</div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardsY, scale: cardsScale, rotate: cardsRotate }}
            className="relative z-30 mt-auto h-[440px] origin-bottom sm:h-[500px] lg:h-[43vh] lg:min-h-[360px]"
          >
            <HeroCard
              project={leftProject}
              label="Product campaign / 01"
              delay={0.58}
              style={{ x: leftX, rotate: -8 }}
              className="left-[0%] top-[74px] z-10 h-[310px] w-[39%] max-w-[330px] sm:left-[6%] sm:h-[360px] lg:left-[12%] lg:top-[4%] lg:h-[40vh] lg:max-h-[510px] lg:w-[22%]"
            />
            <HeroCard
              project={centerProject}
              label="Cinematic concept / 02"
              delay={0.42}
              priority
              style={{ x: "-50%", y: centerY }}
              className="left-1/2 top-[18px] z-20 h-[380px] w-[54%] max-w-[450px] sm:h-[435px] sm:w-[46%] lg:top-0 lg:h-[45vh] lg:max-h-[580px] lg:w-[29%]"
            />
            <HeroCard
              project={rightProject}
              label="Editorial system / 03"
              delay={0.68}
              style={{ x: rightX, rotate: 8 }}
              className="right-[0%] top-[74px] z-10 h-[310px] w-[39%] max-w-[330px] sm:right-[6%] sm:h-[360px] lg:right-[12%] lg:top-[4%] lg:h-[40vh] lg:max-h-[510px] lg:w-[22%]"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="absolute bottom-0 left-0 z-40 hidden items-center gap-4 lg:flex"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20"><ArrowDown size={17} /></span>
              <span className="spec-label text-white/40">Scroll to direct the scene</span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: outroOpacity, scale: outroScale }}
            className="pointer-events-none absolute inset-0 z-40 hidden items-center justify-center lg:flex"
          >
            <div className="text-center">
              <p className="spec-label mb-5 text-acid">The selected archive / 01—12</p>
              <p className="font-display text-[6vw] font-semibold leading-[0.84] tracking-[-0.07em] text-white">
                MAKE THE FRAME<br />IMPOSSIBLE TO SKIP.
              </p>
            </div>
          </motion.div>

          <div className="absolute bottom-6 right-5 z-40 flex items-center gap-2 spec-label text-white/40 sm:right-8 lg:right-12">
            <Plus size={12} /> Scroll / 00—01
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-50 h-px bg-white/10">
          <motion.div style={{ scaleX: lineScale }} className="h-px origin-left bg-acid" />
        </div>
      </div>
    </section>
  );
}
