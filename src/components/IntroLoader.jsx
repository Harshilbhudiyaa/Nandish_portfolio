import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";
import RegMark from "./RegMark";

const previewProjects = [projects[7], projects[0], projects[3]];

export default function IntroLoader({ visible, progress = 0 }) {
  const counter = String(Math.min(100, Math.max(0, progress))).padStart(3, "0");
  const status = progress < 35 ? "Loading visual language" : progress < 75 ? "Building the archive" : progress < 100 ? "Calibrating motion" : "Ready to enter";

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-[240] overflow-hidden bg-ink text-white"
          aria-label={`Loading portfolio ${progress}%`}
          role="status"
        >
          <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="loader-orbit absolute left-1/2 top-1/2 h-[76vw] w-[76vw] max-h-[980px] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
          />
          <motion.div
            initial={{ opacity: 0, rotate: -24, scale: 0.8 }}
            animate={{ opacity: 0.12, rotate: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="loader-orbit-reverse absolute left-1/2 top-1/2 h-[52vw] w-[52vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/70"
          />

          <div className="page-shell relative z-10 flex min-h-[100svh] flex-col justify-between py-6 sm:py-8 lg:py-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 spec-label text-white/40">
              <span className="flex items-center gap-2"><RegMark size={14} className="text-acid" /> Nandish visual portfolio</span>
              <span className="hidden sm:block">Independent graphic designer / India</span>
              <span>©2026</span>
            </div>

            <div className="grid items-center gap-8 py-8 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
              <div>
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="spec-label mb-5 text-acid"
                  >
                    {status}
                  </motion.p>
                </div>
                <div className="overflow-hidden pb-3">
                  <motion.h1
                    initial={{ y: "108%", rotate: 1.5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[20vw] font-bold leading-[0.72] tracking-[-0.09em] sm:text-[15vw] lg:text-[9vw]"
                  >
                    VISUAL
                  </motion.h1>
                </div>
                <div className="overflow-hidden pb-3">
                  <motion.h1
                    initial={{ y: "108%", rotate: -1.5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[20vw] font-bold leading-[0.72] tracking-[-0.09em] text-acid sm:text-[15vw] lg:text-[9vw]"
                  >
                    ARCHIVE<span className="text-[0.18em] align-top">®</span>
                  </motion.h1>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative mx-auto h-[330px] max-w-[440px]">
                  {previewProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 70, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        y: index * 18,
                        x: (index - 1) * 86,
                        rotate: (index - 1) * 7,
                      }}
                      transition={{ duration: 0.95, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-0 h-[280px] w-[205px] -translate-x-1/2 overflow-hidden rounded-[18px] border border-white/15 bg-white/5 p-2 shadow-[0_35px_90px_rgba(0,0,0,0.55)]"
                    >
                      <img src={project.image} alt="" className="h-full w-full rounded-[12px] object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-end justify-between gap-6">
                <p className="max-w-sm text-sm leading-relaxed text-white/40">
                  Art direction, campaign design, editorial systems and cinematic image-making—assembled into one immersive scroll experience.
                </p>
                <div className="flex items-end gap-3">
                  <span className="spec-label mb-2 text-white/35">System progress</span>
                  <span className="font-display text-5xl font-semibold tracking-[-0.07em] text-acid sm:text-7xl">{counter}</span>
                  <span className="mb-2 spec-label text-white/35">%</span>
                </div>
              </div>
              <div className="relative h-[3px] overflow-hidden bg-white/10">
                <motion.div
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 origin-left bg-acid"
                />
                <motion.div
                  animate={{ x: [`${Math.max(-8, progress - 16)}vw`, `${progress + 2}vw`] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 top-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 blur-sm"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: "100%" }}
            exit={{ y: 0 }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 z-30 h-1/2 bg-acid"
          />
          <motion.div
            initial={{ y: "-100%" }}
            exit={{ y: 0 }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 z-30 h-1/2 bg-acid"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute bottom-0 left-0 z-40 h-1 w-full origin-left bg-acid"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
