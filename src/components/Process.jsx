import { motion } from "framer-motion";
import { ArrowDownRight, Asterisk } from "lucide-react";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const steps = [
  { number: "01", title: "Find the signal.", eyebrow: "Discover / Direction", body: "Strip the brief back to the one message the audience must feel first. Research, references and intent become a focused visual direction.", image: projects[5].image },
  { number: "02", title: "Build the hierarchy.", eyebrow: "Structure / Composition", body: "Create a clear order for type, product, image and offer. Every element earns its place and supports the central idea.", image: projects[0].image },
  { number: "03", title: "Create the atmosphere.", eyebrow: "Craft / Art direction", body: "Lighting, colour, texture and depth turn the layout into a visual world—premium, memorable and appropriate for the brand.", image: projects[7].image },
  { number: "04", title: "Polish every frame.", eyebrow: "Refine / Delivery", body: "Final details, responsive crops and production checks make the system work across social, digital and print without losing impact.", image: projects[8].image },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 text-white md:py-32 lg:py-40">
      <div className="absolute inset-0 grid-pattern opacity-[0.055]" />
      <div className="hero-glow hero-glow-one opacity-[0.08]" />
      <div className="page-shell relative z-10">
        <div className="mb-14 flex flex-col gap-7 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="spec-label mb-4 flex items-center gap-2 text-white/45"><RegMark size={14} className="text-acid" /> Creative process</p>
            <h2 className="font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[5.6vw]">From brief to<br /><span className="text-white/25">finished frame.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/45">A clear four-step process keeps the work expressive, focused and production-ready.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.75, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] transition-colors duration-500 hover:bg-white/[0.065]"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                <ArtworkImage src={step.image} alt="" fit="contain" ambient className="h-full w-full" imageClassName="p-5 sm:p-7 transition-transform duration-[1000ms] group-hover:scale-[1.025]" />
                <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 z-[4] font-display text-5xl font-semibold tracking-[-0.07em] text-acid">{step.number}</span>
              </div>
              <div className="p-6 sm:p-8 lg:p-9">
                <p className="spec-label mb-4 text-white/40">{step.eyebrow}</p>
                <h3 className="font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-5xl">{step.title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">{step.body}</p>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="flex items-center gap-2 spec-label text-white/30"><Asterisk size={12} className="text-acid" /> Nandish design system</span>
                  <ArrowDownRight size={22} className="text-white/25 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-acid" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
