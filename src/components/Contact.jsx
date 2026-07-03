import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useRef, useState } from "react";
import RegMark from "./RegMark";

const CONTACT_EMAIL = "nandishvarsani@gmail.com";

function MagneticButton() {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.35 });

  const move = (event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
      href={`mailto:${CONTACT_EMAIL}`}
      data-cursor="Start a project"
      className="group flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-[0_30px_80px_rgba(16,16,15,0.24)] transition-colors hover:bg-white hover:text-ink sm:h-48 sm:w-48"
    >
      <span className="text-center font-display text-xl font-semibold leading-tight tracking-[-0.04em]">Start a<br />project</span>
      <ArrowUpRight size={22} className="absolute right-8 top-8 transition-transform duration-500 group-hover:rotate-45" />
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingX = useTransform(scrollYProgress, [0, 1], [80, -90]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-acid py-24 text-ink md:py-32 lg:py-40">
      <div className="absolute inset-0 contact-grid opacity-30" />
      <motion.div style={{ rotate: ringRotate }} className="pointer-events-none absolute -right-36 -top-36 h-[520px] w-[520px] rounded-full border border-ink/20">
        <div className="absolute inset-16 rounded-full border border-ink/20" />
        <div className="absolute inset-32 rounded-full border border-ink/20" />
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </motion.div>

      <div className="page-shell relative z-10">
        <div className="mb-10 flex items-center justify-between border-b border-ink/20 pb-5">
          <p className="spec-label flex items-center gap-2 text-ink/60"><RegMark size={14} /> Contact / New business</p>
          <p className="spec-label hidden text-ink/40 sm:block">Available for selected collaborations</p>
        </div>

        <div className="overflow-hidden py-2">
          <motion.h2
            style={{ x: headingX }}
            className="whitespace-nowrap font-display text-[18vw] font-bold leading-[0.74] tracking-[-0.088em] sm:text-[14vw] lg:text-[8.2vw]"
          >
            LET'S MAKE IT IMPOSSIBLE TO IGNORE.
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-12 border-t border-ink/20 pt-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-5xl">
              Have a campaign, poster, product launch or visual idea that needs a stronger frame?
            </p>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/60">
              Share the brief, required formats and timeline. I am available for advertising visuals, social campaigns, editorial design, poster systems and photo manipulation.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-ink/25 bg-white/30 px-5 py-3 font-medium transition-colors hover:bg-ink hover:text-white">{CONTACT_EMAIL}</a>
              <button type="button" onClick={copyEmail} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-white" aria-label="Copy email address">
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
              {copied && <span className="spec-label">Copied</span>}
            </div>
          </div>
          <MagneticButton />
        </div>
      </div>

      <div className="mt-24 overflow-hidden border-y border-ink/20 py-5">
        <div className="animate-marquee-reverse flex w-max items-center gap-10 will-change-transform">
          {[...Array(2)].flatMap((_, loop) => ["ART DIRECTION", "CAMPAIGNS", "EDITORIAL", "COMPOSITING", "POSTERS", "BRAND VISUALS"].map((item) => `${item}-${loop}`)).map((key) => (
            <div key={key} className="flex items-center gap-10">
              <span className="font-display text-3xl font-bold tracking-[-0.045em] sm:text-5xl">{key.split("-")[0]}</span>
              <span className="text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
