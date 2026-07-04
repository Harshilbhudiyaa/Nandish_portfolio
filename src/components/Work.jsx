import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { categories, projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import RegMark from "./RegMark";

const featuredProjects = [projects[0], projects[7], projects[3], projects[4]];

function FeaturedShowcase({ onOpen }) {
  return (
    <div className="bg-ink py-24 text-white md:py-32 lg:py-36">
      <div className="page-shell">
        <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="spec-label mb-4 flex items-center gap-2 text-white/45"><RegMark size={14} className="text-acid" /> Featured case studies</p>
            <h3 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-[5.5vw]">Selected work,<br /><span className="text-white/25">presented clearly.</span></h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/45">A focused selection of campaign, editorial and compositing work—without scroll-jacking or forced horizontal movement.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.75, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={index === 0 || index === 3 ? "lg:col-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => onOpen(project)}
                data-cursor="Open case"
                className="group block w-full text-left"
              >
                <div className={`relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] shadow-[0_32px_100px_rgba(0,0,0,0.42)] ${index === 0 || index === 3 ? "aspect-[16/9]" : "aspect-[4/4.6]"}`}>
                  <ArtworkImage
                    src={project.image}
                    alt={project.title}
                    priority={index < 2}
                    fit="contain"
                    ambient
                    objectPosition={project.objectPosition}
                    className="h-full w-full"
                    imageClassName="p-5 sm:p-8 lg:p-10 transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-[4] grid gap-5 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-end lg:p-10">
                    <div>
                      <p className="spec-label mb-3 text-white/45">{String(index + 1).padStart(2, "0")} / {project.category} / {project.year}</p>
                      <h4 className={`font-display font-semibold leading-[0.9] tracking-[-0.065em] ${index === 0 || index === 3 ? "text-4xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"}`}>{project.title}</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="hidden max-w-[270px] text-sm leading-relaxed text-white/55 md:block">{project.description}</p>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-acid text-ink transition-all duration-500 group-hover:rotate-45 group-hover:scale-110"><ArrowUpRight size={20} /></span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const activeIndex = active ? projects.findIndex((project) => project.id === active.id) : -1;
  const previousProject = useCallback(() => {
    if (activeIndex < 0) return;
    setActive(projects[(activeIndex - 1 + projects.length) % projects.length]);
  }, [activeIndex]);
  const nextProject = useCallback(() => {
    if (activeIndex < 0) return;
    setActive(projects[(activeIndex + 1) % projects.length]);
  }, [activeIndex]);

  return (
    <section id="work" className="relative bg-paper text-ink">
      <div className="page-shell py-24 md:py-32 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="spec-label mb-4 text-ink/40">Selected work / 2026</p>
            <h2 className="section-title">PROJECTS<br /><span className="text-stroke">WITH PURPOSE.</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="max-w-md lg:pb-2"
          >
            <p className="text-base leading-relaxed text-ink/60">Commercial campaigns, editorial systems, fan posters and cinematic compositing—each treated as a complete visual world rather than a single image.</p>
            <div className="mt-6 flex items-center gap-3 spec-label text-ink/40"><span className="h-2 w-2 rounded-full bg-acid ring-1 ring-ink/30" /> Simple navigation / Premium presentation</div>
          </motion.div>
        </div>
      </div>

      <FeaturedShowcase onOpen={setActive} />

      <div className="page-shell py-24 md:py-32 lg:py-40">
        <div className="mb-12 flex flex-col gap-7 border-b border-ink/20 pb-8 md:flex-row md:items-end md:justify-between lg:mb-16">
          <div>
            <p className="spec-label mb-3 text-ink/40">Complete archive / Filter by discipline</p>
            <h3 className="font-display text-5xl font-semibold tracking-[-0.065em] sm:text-6xl lg:text-7xl">The project index.</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/50">Every artwork uses bundled Vite imports, stable image states and full-aspect presentation for reliable loading on local and hosted builds.</p>
        </div>

        <div className="mb-14 flex gap-2 overflow-x-auto pb-3 scrollbar-none lg:mb-20">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-pill ${filter === category ? "filter-pill-active" : ""}`}
            >
              {category}
              {filter === category && <Plus size={11} className="ml-1.5 inline rotate-45" />}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} onPrevious={previousProject} onNext={nextProject} />
    </section>
  );
}
