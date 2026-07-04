import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const leftProject = projects.find((project) => project.id === "jack-daniels");
const centerProject = projects.find((project) => project.id === "ember-x");
const rightProject = projects.find((project) => project.id === "fashion-editorial");

const ease = [0.16, 1, 0.3, 1];

function HeroCard({ project, className, delay, label, priority = false, rotate = 0, centered = false }) {
  return (
    <motion.button
      type="button"
      data-cursor="View work"
      initial={{ opacity: 0, y: 60, x: centered ? "-50%" : 0, rotate: rotate * 0.4 }}
      animate={{ opacity: 1, y: 0, x: centered ? "-50%" : 0, rotate }}
      transition={{ duration: 0.9, delay, ease }}
      whileHover={{ y: -10, rotate: rotate * 0.55, scale: 1.015 }}
      onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
      className={`group absolute overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.045] text-left shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:rounded-[25px] ${className}`}
    >
      <ArtworkImage
        src={project.image}
        alt={project.title}
        priority={priority}
        className="h-full w-full"
        imageClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
        objectPosition={project.objectPosition}
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/88 via-black/5 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="spec-label mb-2 text-white/45">{label}</p>
          <p className="font-display text-base font-semibold leading-tight tracking-[-0.04em] text-white sm:text-xl">{project.title}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

export default function Hero({ isReady = true }) {
  return (
    <section id="top" className="relative min-h-[900px] overflow-hidden bg-ink text-white sm:min-h-[980px] lg:min-h-[780px] lg:h-[100svh]">
      <div className="absolute inset-0 grid-pattern opacity-[0.09]" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="absolute inset-0 hero-vignette" />
      <div className="pointer-events-none absolute -left-[2vw] top-[18%] whitespace-nowrap font-display text-[26vw] font-bold leading-none tracking-[-0.1em] text-white/[0.025]" aria-hidden="true">
        NANDISH®
      </div>

      <div className="page-shell relative z-10 flex min-h-[900px] flex-col pb-8 pt-24 sm:min-h-[980px] lg:h-full lg:min-h-0 lg:pt-[82px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
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

        <div className="relative z-20 mt-7 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end lg:gap-10">
          <h1 className="font-display text-[20vw] font-bold leading-[0.72] tracking-[-0.09em] sm:text-[15vw] lg:text-[8.6vw]">
            {["VISUALS", "WITH", "GRAVITY."].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "112%" }}
                  animate={isReady ? { y: 0 } : { y: "112%" }}
                  transition={{ duration: 0.82, delay: 0.08 + index * 0.08, ease }}
                  className={`block ${line === "WITH" ? "pl-[13vw] text-acid lg:pl-[13vw]" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="border-t border-white/20 pt-5 lg:mb-4"
          >
            <p className="text-sm leading-relaxed text-white/50">
              Premium campaign visuals, editorial systems and cinematic compositions built with clarity, atmosphere and commercial purpose.
            </p>
            <a href="#work" className="mt-5 inline-flex items-center gap-2 spec-label text-acid transition-transform hover:translate-x-1">
              <Asterisk size={13} /> Explore selected work
            </a>
          </motion.div>
        </div>

        <div className="relative z-30 mt-auto h-[420px] sm:h-[500px] lg:h-[42vh] lg:min-h-[330px]">
          <HeroCard
            project={leftProject}
            label="Product campaign / 01"
            delay={0.45}
            rotate={-7}
            className="left-0 top-[78px] z-10 h-[290px] w-[39%] sm:left-[5%] sm:h-[355px] lg:left-[10%] lg:top-[6%] lg:h-[38vh] lg:max-h-[470px] lg:w-[22%]"
          />
          <HeroCard
            project={centerProject}
            label="Cinematic concept / 02"
            delay={0.32}
            priority
            centered
            className="left-1/2 top-[18px] z-20 h-[370px] w-[54%] sm:h-[440px] sm:w-[46%] lg:top-0 lg:h-[43vh] lg:max-h-[540px] lg:w-[29%]"
          />
          <HeroCard
            project={rightProject}
            label="Editorial system / 03"
            delay={0.52}
            rotate={7}
            className="right-0 top-[78px] z-10 h-[290px] w-[39%] sm:right-[5%] sm:h-[355px] lg:right-[10%] lg:top-[6%] lg:h-[38vh] lg:max-h-[470px] lg:w-[22%]"
          />
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          href="#manifesto"
          className="absolute bottom-7 left-5 hidden items-center gap-3 spec-label text-white/40 transition-colors hover:text-white sm:left-8 lg:left-12 lg:flex"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"><ArrowDown size={15} /></span>
          Continue to portfolio
        </motion.a>
      </div>
    </section>
  );
}
