import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import RegMark from "./RegMark";
import ArtworkImage from "./ArtworkImage";
import { projects } from "../data/projects";

const services = [
  { number: "01", title: "Campaign Design", description: "Scroll-stopping launches, product promotions and social systems designed around one sharp commercial idea.", image: projects.find((project) => project.id === "jbl-black-friday").image },
  { number: "02", title: "Photo Manipulation", description: "Cinematic composites, product worlds and concept-driven visual effects with convincing light, depth and atmosphere.", image: projects.find((project) => project.id === "ember-x").image },
  { number: "03", title: "Editorial & Posters", description: "Expressive typography, strong grids and image-led layouts built to command attention in print and digital formats.", image: projects.find((project) => project.id === "fashion-editorial").image },
  { number: "04", title: "Brand Visual Systems", description: "A consistent visual language for products, restaurants and growing businesses across campaigns and content.", image: projects.find((project) => project.id === "auraa-herbal").image },
];

export default function About() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 text-white md:py-32 lg:py-40">
      <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
      <div className="pointer-events-none absolute -right-36 top-24 h-[440px] w-[440px] rounded-full border border-white/10">
        <div className="absolute inset-16 rounded-full border border-acid/25" />
        <div className="absolute inset-[132px] rounded-full bg-acid/10 blur-3xl" />
      </div>

      <div className="page-shell relative z-10">
        <div className="mb-16 flex items-center justify-between border-b border-white/15 pb-5">
          <p className="spec-label flex items-center gap-2 text-white/40"><RegMark size={14} className="text-acid" /> About / Creative practice</p>
          <p className="spec-label hidden text-white/30 sm:block">Independent designer / Visual problem solver</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:gap-28">
          <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="font-display text-[15vw] font-bold leading-[0.79] tracking-[-0.078em] sm:text-[11vw] lg:text-[6.15vw]">BUILT WITH<br /><span className="text-acid">INTENT.</span></h2>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-white/60">I am Nandish, a graphic designer focused on bold commercial visuals. My process combines concept, hierarchy, detailed image treatment and disciplined composition so every piece feels clear, premium and memorable.</p>
            <a href="#contact" data-cursor="Let's talk" className="group mt-9 inline-flex items-center gap-4 border-b border-white/25 pb-2 font-medium transition-colors hover:border-acid hover:text-acid">Discuss a project <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></a>

            <div className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-3">
              <AnimatePresence mode="wait">
                <motion.div key={services[active].image} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42 }} className="aspect-[16/10] w-full overflow-hidden rounded-[20px]">
                  <ArtworkImage src={services[active].image} alt="" fit="contain" ambient className="h-full w-full" imageClassName="p-5" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between rounded-b-[20px] bg-gradient-to-t from-black/80 to-transparent p-5 pt-14">
                <p className="spec-label text-white/50">Current discipline</p>
                <p className="font-display text-xl font-semibold tracking-[-0.04em]">{services[active].title}</p>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-white/20">
            {services.map((service, index) => (
              <motion.button
                type="button"
                key={service.title}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.62, delay: index * 0.05 }}
                className="group relative grid w-full gap-4 overflow-hidden border-b border-white/20 py-8 text-left sm:grid-cols-[52px_0.78fr_1fr_auto] sm:items-start"
              >
                <motion.span initial={false} animate={{ scaleX: active === index ? 1 : 0 }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-acid" />
                <span className="spec-label text-acid">{service.number}</span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-white/50 sm:text-base">{service.description}</p>
                <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-all duration-400 group-hover:rotate-45 group-hover:border-acid group-hover:bg-acid group-hover:text-ink sm:flex"><Plus size={16} /></span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 sm:grid-cols-3">
          {[["12", "Selected projects", "Across seven visual disciplines"], ["06", "Core capabilities", "From concept through final artwork"], ["100%", "Original thinking", "Every visual built for its brief"]].map(([value, label, copy], index) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="bg-ink p-7 md:p-9">
              <p className="font-display text-6xl font-bold tracking-[-0.07em] text-acid md:text-7xl">{value}</p>
              <p className="mt-5 font-display text-xl font-semibold tracking-[-0.035em]">{label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
