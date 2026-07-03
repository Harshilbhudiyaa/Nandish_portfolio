import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ArtworkImage from "./ArtworkImage";

export default function ProjectCard({ project, index, onOpen }) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 170, damping: 24, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 170, damping: 24, mass: 0.45 });
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const imageX = useTransform(smoothX, [0, 1], [-10, 10]);
  const imageY = useTransform(smoothY, [0, 1], [-10, 10]);

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 90, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, y: 30 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card ${project.size === "wide" ? "lg:col-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onPointerMove={onPointerMove}
        onPointerLeave={resetPointer}
        data-cursor="View project"
        className="group block w-full text-left"
        aria-label={`Open ${project.title} project`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-ink/15 pb-3 spec-label text-ink/40">
          <span>{String(index + 1).padStart(2, "0")} / 12</span>
          <span>{project.category}</span>
        </div>

        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1300 }}
          className={`project-image-frame transform-gpu ${project.size === "wide" ? "aspect-[16/10.5]" : "aspect-[4/5.35]"}`}
        >
          <motion.div style={{ x: imageX, y: imageY, scale: 1.035 }} className="absolute -inset-3">
            <ArtworkImage
              src={project.image}
              alt={project.title}
              priority={index < 4}
              fit="contain"
              ambient
              objectPosition={project.objectPosition}
              className="h-full w-full"
              imageClassName="p-5 sm:p-7 lg:p-8"
            />
          </motion.div>

          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/65 via-transparent to-black/5 opacity-40 transition-opacity duration-700 group-hover:opacity-80" />
          <div className="absolute inset-0 z-[4] ring-1 ring-inset ring-black/10" />
          <span className="absolute left-4 top-4 z-[5] rounded-full border border-white/25 bg-black/25 px-3 py-1.5 spec-label text-white backdrop-blur-xl sm:left-5 sm:top-5">
            {project.year}
          </span>
          <span className="absolute right-4 top-4 z-[5] flex h-11 w-11 items-center justify-center rounded-full bg-acid text-ink transition-all duration-700 group-hover:rotate-45 group-hover:scale-110 sm:right-5 sm:top-5 sm:h-12 sm:w-12">
            <ArrowUpRight size={19} />
          </span>
          <div className="absolute bottom-5 left-5 right-5 z-[5] translate-y-5 opacity-0 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="max-w-md text-sm leading-relaxed text-white/75">{project.description}</p>
          </div>
        </motion.div>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-5">
          <div>
            <p className="spec-label mb-2 text-ink/40">{project.role} / {project.year}</p>
            <h3 className="font-display text-2xl font-semibold leading-[0.98] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl lg:text-[2.15rem]">{project.title}</h3>
          </div>
          <ArrowUpRight size={22} className="mt-1 shrink-0 text-ink/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
        </div>
      </button>
    </motion.article>
  );
}
