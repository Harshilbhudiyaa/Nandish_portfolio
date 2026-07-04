import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ArtworkImage from "./ArtworkImage";

export default function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 20 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.72, delay: (index % 3) * 0.045, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card ${project.size === "wide" ? "lg:col-span-2" : ""}`}
    >
      <button type="button" onClick={() => onOpen(project)} data-cursor="View project" className="group block w-full text-left" aria-label={`Open ${project.title} project`}>
        <div className="mb-4 flex items-center justify-between border-b border-ink/15 pb-3 spec-label text-ink/40">
          <span>{String(index + 1).padStart(2, "0")} / 12</span><span>{project.category}</span>
        </div>

        <div className={`project-image-frame ${project.size === "wide" ? "aspect-[16/10.5]" : "aspect-[4/5.35]"}`}>
          <ArtworkImage src={project.image} alt={project.title} priority={index < 4} fit="contain" ambient objectPosition={project.objectPosition} className="h-full w-full" imageClassName="p-5 sm:p-7 lg:p-8 transition-transform duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-transparent to-black/5 opacity-35 transition-opacity duration-500 group-hover:opacity-75" />
          <div className="absolute inset-0 z-[4] ring-1 ring-inset ring-black/10" />
          <span className="absolute left-4 top-4 z-[5] rounded-full border border-white/25 bg-black/25 px-3 py-1.5 spec-label text-white backdrop-blur-xl sm:left-5 sm:top-5">{project.year}</span>
          <span className="absolute right-4 top-4 z-[5] flex h-11 w-11 items-center justify-center rounded-full bg-acid text-ink transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 sm:right-5 sm:top-5 sm:h-12 sm:w-12"><ArrowUpRight size={19} /></span>
          <div className="absolute bottom-5 left-5 right-5 z-[5] translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"><p className="max-w-md text-sm leading-relaxed text-white/75">{project.description}</p></div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-5">
          <div><p className="spec-label mb-2 text-ink/40">{project.role} / {project.year}</p><h3 className="font-display text-2xl font-semibold leading-[0.98] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl lg:text-[2.15rem]">{project.title}</h3></div>
          <ArrowUpRight size={22} className="mt-1 shrink-0 text-ink/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
        </div>
      </button>
    </motion.article>
  );
}
