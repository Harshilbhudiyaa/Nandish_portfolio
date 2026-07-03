import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Asterisk, Plus } from "lucide-react";
import { categories, projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import RegMark from "./RegMark";

const featuredProjects = projects.slice(0, 8);

function DesktopShowcase({ onOpen }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [maxX, setMaxX] = useState(0);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 82, damping: 24, mass: 0.42 });
  const x = useTransform(smoothProgress, [0, 1], [0, -maxX]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);
  const headingX = useTransform(smoothProgress, [0, 1], [80, -520]);
  const currentProject = featuredProjects[current] || featuredProjects[0];

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setMaxX(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(featuredProjects.length - 1, Math.max(0, Math.floor(value * featuredProjects.length)));
    setCurrent(next);
  });

  return (
    <section ref={sectionRef} style={{ height: `${featuredProjects.length * 76 + 100}vh` }} className="relative hidden bg-ink text-white lg:block">
      <div ref={viewportRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.065]" />
        <motion.div
          animate={{ backgroundColor: currentProject.accent }}
          transition={{ duration: 0.7 }}
          className="absolute -right-[10vw] top-[16vh] h-[50vw] w-[50vw] rounded-full opacity-[0.16] blur-[150px]"
        />
        <motion.p style={{ x: headingX }} className="pointer-events-none absolute bottom-[3vh] left-0 whitespace-nowrap font-display text-[15vw] font-bold leading-none tracking-[-0.09em] text-white/[0.025]">
          SELECTED WORK / SELECTED WORK / SELECTED WORK
        </motion.p>
        <div className="absolute left-0 top-0 z-20 h-full w-[16vw] bg-gradient-to-r from-ink via-ink/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-[8vw] bg-gradient-to-l from-ink to-transparent pointer-events-none" />

        <div className="page-shell absolute inset-x-0 top-0 z-30 flex h-[88px] items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 spec-label text-white/45"><RegMark size={14} className="text-acid" /> Featured case studies</div>
          <div className="flex items-center gap-8">
            <span className="spec-label text-white/35">Vertical input / Horizontal direction</span>
            <span className="font-display text-2xl font-semibold tracking-[-0.05em]"><em className="not-italic text-acid">{String(current + 1).padStart(2, "0")}</em> / {String(featuredProjects.length).padStart(2, "0")}</span>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full w-max items-center gap-[5vw] pl-[17vw] pr-[12vw] pt-[72px] will-change-transform"
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              animate={{ opacity: Math.abs(index - current) > 1 ? 0.42 : 1, scale: index === current ? 1 : 0.965 }}
              transition={{ duration: 0.55 }}
              className="group relative w-[74vw] max-w-[1120px] shrink-0"
            >
              <button
                type="button"
                onClick={() => onOpen(project)}
                data-cursor="Open case"
                className="relative block w-full overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] text-left shadow-[0_48px_120px_rgba(0,0,0,0.5)]"
              >
                <div className="relative h-[68vh] min-h-[520px] max-h-[760px] overflow-hidden">
                  <ArtworkImage
                    src={project.image}
                    alt={project.title}
                    priority={index < 3}
                    fit="contain"
                    ambient
                    objectPosition={project.objectPosition}
                    className="h-full w-full"
                    imageClassName="p-8 xl:p-12 transition-transform duration-[1500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/90 via-black/5 to-black/10" />
                  <div className="absolute inset-0 z-[4] ring-1 ring-inset ring-white/10" />
                  <span className="absolute left-7 top-7 z-[5] flex h-12 min-w-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-4 spec-label text-white backdrop-blur-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-7 top-7 z-[5] flex h-14 w-14 items-center justify-center rounded-full bg-acid text-ink transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight size={22} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 z-[5] grid grid-cols-[1fr_auto] items-end gap-12 p-9 xl:p-12">
                    <div>
                      <p className="spec-label mb-4 text-white/50">{project.category} / {project.year} / {project.role}</p>
                      <h3 className="max-w-[780px] font-display text-[5.15vw] font-semibold leading-[0.84] tracking-[-0.072em] xl:text-[72px]">{project.title}</h3>
                    </div>
                    <p className="mb-1 max-w-[270px] text-sm leading-relaxed text-white/65">{project.description}</p>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </motion.div>

        <div className="page-shell absolute inset-x-0 bottom-7 z-30">
          <div className="h-px bg-white/20">
            <motion.div style={{ scaleX: progressScale }} className="h-px origin-left bg-acid" />
          </div>
          <div className="mt-3 flex items-center justify-between spec-label text-white/40">
            <span className="flex items-center gap-2"><Asterisk size={12} className="text-acid" /> Curated project sequence</span>
            <span>Keep scrolling <ArrowDownRight size={13} className="ml-1 inline" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileFeatured({ onOpen }) {
  return (
    <div className="bg-ink px-5 pb-24 pt-8 text-white sm:px-8 lg:hidden">
      <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-5">
        <p className="spec-label text-white/45">Featured case studies</p>
        <p className="spec-label text-acid">01—06</p>
      </div>
      <div className="space-y-16">
        {featuredProjects.slice(0, 6).map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => onOpen(project)}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group block w-full text-left"
          >
            <div className="mb-3 flex items-center justify-between spec-label text-white/35">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{project.category}</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <ArtworkImage
                src={project.image}
                alt={project.title}
                priority={index < 2}
                fit="contain"
                ambient
                className="h-full w-full"
                imageClassName="p-4 sm:p-6"
              />
              <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-transparent to-black/5" />
              <span className="absolute right-4 top-4 z-[4] flex h-11 w-11 items-center justify-center rounded-full bg-acid text-ink"><ArrowUpRight size={18} /></span>
              <div className="absolute inset-x-0 bottom-0 z-[4] p-5 sm:p-7">
                <p className="spec-label mb-3 text-white/50">{project.role} / {project.year}</p>
                <h3 className="font-display text-[10.5vw] font-semibold leading-[0.88] tracking-[-0.065em] sm:text-[7vw]">{project.title}</h3>
              </div>
            </div>
          </motion.button>
        ))}
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
    <section id="work" className="bg-paper">
      <div className="page-shell py-24 md:py-32 lg:py-40">
        <div className="grid gap-10 border-b border-ink/20 pb-11 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="spec-label mb-5 flex items-center gap-2 text-ink/45"
            >
              <RegMark size={14} /> Selected work / 12 projects
            </motion.p>
            <div className="overflow-hidden pb-3">
              <motion.h2
                initial={{ y: "110%", rotate: 1 }}
                whileInView={{ y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="section-title"
              >
                Work built to<br /><span className="text-stroke">hold attention.</span>
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md lg:pb-2"
          >
            <p className="text-base leading-relaxed text-ink/60">
              Commercial campaigns, editorial systems, fan posters and cinematic compositing—each treated as a complete visual world rather than a single image.
            </p>
            <div className="mt-6 flex items-center gap-3 spec-label text-ink/40"><span className="h-2 w-2 rounded-full bg-acid ring-1 ring-ink/30" /> Scroll-led showcase below</div>
          </motion.div>
        </div>
      </div>

      <DesktopShowcase onOpen={setActive} />
      <MobileFeatured onOpen={setActive} />

      <div className="page-shell py-24 md:py-32 lg:py-40">
        <div className="mb-12 flex flex-col gap-7 border-b border-ink/20 pb-8 md:flex-row md:items-end md:justify-between lg:mb-16">
          <div>
            <p className="spec-label mb-3 text-ink/40">Complete archive / Filter by discipline</p>
            <h3 className="font-display text-5xl font-semibold tracking-[-0.065em] sm:text-6xl lg:text-7xl">The project index.</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/50">Every artwork is loaded from the production bundle and presented in its complete aspect ratio—no missing files, no broken relative paths.</p>
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

        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-28">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        onPrevious={previousProject}
        onNext={nextProject}
      />
    </section>
  );
}
