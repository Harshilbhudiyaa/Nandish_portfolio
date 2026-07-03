import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 650, damping: 45, mass: 0.35 });
  const y = useSpring(mouseY, { stiffness: 650, damping: 45, mass: 0.35 });
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 900px)");
    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();
    media.addEventListener("change", updateEnabled);

    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      const target = event.target.closest?.("[data-cursor]");
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor || "");
    };
    const leave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      media.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x, y }}
      animate={{ width: active ? 82 : 14, height: active ? 82 : 14 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className="pointer-events-none fixed left-0 top-0 z-[190] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-acid text-ink mix-blend-difference"
      aria-hidden="true"
    >
      <motion.span
        animate={{ opacity: active && label ? 1 : 0, scale: active ? 1 : 0.7 }}
        className="spec-label whitespace-nowrap text-[9px] font-medium"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
