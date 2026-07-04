import { AnimatePresence, motion } from "framer-motion";
import RegMark from "./RegMark";

export default function IntroLoader({ visible, progress = 0 }) {
  const value = Math.min(100, Math.max(0, progress));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[240] grid place-items-center overflow-hidden bg-ink text-white"
          aria-label={`Loading portfolio ${value}%`}
          role="status"
        >
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          <div className="loader-premium-glow" />

          <div className="relative z-10 flex w-[min(86vw,560px)] flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.72, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="loader-mark-wrap"
            >
              <RegMark size={58} spin className="text-acid" />
            </motion.div>

            <div className="mt-7 overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.62, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[13vw] font-bold leading-none tracking-[-0.075em] sm:text-7xl"
              >
                NANDISH<span className="text-acid">®</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-3 spec-label text-white/38"
            >
              Graphic design portfolio / 2026
            </motion.p>

            <div className="mt-9 w-full">
              <div className="mb-3 flex items-center justify-between spec-label text-white/35">
                <span>Preparing visual archive</span>
                <span className="tabular-nums text-acid">{String(value).padStart(3, "0")}%</span>
              </div>
              <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ scaleX: value / 100 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute inset-0 origin-left rounded-full bg-acid"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
