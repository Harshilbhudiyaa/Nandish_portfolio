import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  "Art Direction",
  "Photo Manipulation",
  "Poster Design",
  "Brand Campaigns",
  "Editorial Design",
  "Social Creatives",
];

function MarqueeLane({ items: laneItems, dark = false, style }) {
  const content = [...laneItems, ...laneItems, ...laneItems];
  return (
    <div className={`relative overflow-hidden border-y ${dark ? "border-white/10 bg-ink text-white" : "border-ink/20 bg-acid text-ink"}`}>
      <motion.div style={style} className="flex w-max items-center gap-8 py-3.5 will-change-transform sm:py-4">
        {content.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className={`font-display text-2xl font-bold uppercase tracking-[-0.045em] md:text-3xl ${dark && index % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.65)]" : ""}`}>{item}</span>
            <span className={dark ? "text-acid" : "text-ink"}>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const upperX = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const lowerX = useTransform(scrollYProgress, [0, 1], [-220, 0]);

  return (
    <section ref={ref} aria-label="Design services" className="relative z-10 overflow-hidden">
      <MarqueeLane items={items} style={{ x: upperX }} />
      <MarqueeLane items={[...items].reverse()} dark style={{ x: lowerX }} />
    </section>
  );
}
