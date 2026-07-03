import { motion } from "framer-motion";
import RegMark from "./RegMark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink py-8 text-white">
      <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
      <div className="page-shell relative flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <motion.a whileHover={{ x: 4 }} href="#top" className="flex items-center gap-3 font-display font-semibold tracking-[-0.03em]">
          <RegMark size={20} className="text-acid" /> NANDISH® / Graphic Designer
        </motion.a>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 spec-label text-white/40">
          <span>Portfolio 2026</span>
          <span>Built with intent</span>
          <a href="#top" className="transition-colors hover:text-acid">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
