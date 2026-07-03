import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

export default function ProjectModal({ project, onClose, onPrevious, onNext }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[210] overflow-y-auto bg-ink/95 text-white"
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
        >
          <div className="fixed inset-0 grid-pattern opacity-[0.07]" />
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative min-h-screen bg-ink"
          >
            <motion.div
              animate={{ backgroundColor: project.accent }}
              className="pointer-events-none fixed -right-[20vw] top-[5vh] h-[65vw] w-[65vw] rounded-full opacity-[0.12] blur-[170px]"
            />

            <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/80 backdrop-blur-2xl">
              <div className="page-shell flex h-[74px] items-center justify-between sm:h-[80px]">
                <div className="flex items-center gap-3 spec-label text-white/40">
                  <RegMark size={15} className="text-acid" /> <span className="hidden sm:inline">Case study /</span> {project.year}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={onPrevious} className="modal-control-dark" aria-label="Previous project"><ArrowLeft size={18} /></button>
                  <button type="button" onClick={onNext} className="modal-control-dark" aria-label="Next project"><ArrowRight size={18} /></button>
                  <button type="button" onClick={onClose} className="modal-control-dark ml-1 border-acid/60 bg-acid text-ink hover:bg-white sm:ml-2" aria-label="Close project"><X size={19} /></button>
                </div>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.main
                key={project.id}
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="page-shell pb-14 pt-9 md:pb-24 md:pt-14"
              >
                <div className="mb-10 grid gap-9 border-b border-white/10 pb-10 lg:mb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                  <div>
                    <p className="spec-label mb-5 text-acid">{project.category} / Selected project</p>
                    <h2 className="max-w-[980px] font-display text-[15vw] font-semibold leading-[0.78] tracking-[-0.08em] sm:text-[11vw] lg:text-[7.1vw]">{project.title}</h2>
                  </div>
                  <div className="lg:pb-2">
                    <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">{project.description}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/20 px-3 py-2 spec-label text-white/45">{tag}</span>)}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.975 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_55px_150px_rgba(0,0,0,0.58)] sm:p-4 md:rounded-[36px] md:p-7"
                >
                  <div className="absolute left-0 top-0 z-[5] h-1 w-full" style={{ backgroundColor: project.accent }} />
                  <div className="relative min-h-[55vh] overflow-hidden rounded-[16px] bg-black/20 md:min-h-[76vh] md:rounded-[25px]">
                    <ArtworkImage
                      src={project.image}
                      alt={project.title}
                      priority
                      fit="contain"
                      ambient
                      objectPosition={project.objectPosition}
                      className="absolute inset-0 h-full w-full"
                      imageClassName="p-3 sm:p-6 md:p-10"
                    />
                  </div>
                </motion.div>

                <div className="mt-12 grid gap-10 border-t border-white/10 pt-9 lg:mt-16 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="spec-label mb-4 text-white/40">Creative direction</p>
                    <p className="max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.045em] text-white/[0.82] sm:text-4xl lg:text-5xl">
                      A focused visual experience where composition, product hierarchy and atmosphere support one clear idea.
                    </p>
                  </div>
                  <div className="border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-9">
                    <div className="project-detail-dark"><span>Role</span><strong>{project.role}</strong></div>
                    <div className="project-detail-dark"><span>Year</span><strong>{project.year}</strong></div>
                    <div className="project-detail-dark"><span>Output</span><strong>Campaign visual / Digital & print</strong></div>
                  </div>
                </div>

                <button type="button" onClick={onNext} data-cursor="Next project" className="group mt-16 flex w-full items-center justify-between border-y border-white/10 py-8 text-left sm:mt-20 sm:py-11">
                  <div>
                    <p className="spec-label mb-3 text-white/40">Continue through the archive</p>
                    <p className="font-display text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Next project</p>
                  </div>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-acid text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 sm:h-20 sm:w-20"><ArrowUpRight size={28} /></span>
                </button>
              </motion.main>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
