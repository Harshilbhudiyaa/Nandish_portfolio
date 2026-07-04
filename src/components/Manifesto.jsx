import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ArtworkImage from "./ArtworkImage";
import RegMark from "./RegMark";

const lays = projects.find((project) => project.id === "lays-maxx");
const spiderman = projects.find((project) => project.id === "spiderman-poster");
const jbl = projects.find((project) => project.id === "jbl-black-friday");

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-paper py-24 text-ink md:py-32 lg:py-40">
      <div className="absolute inset-0 editorial-grid opacity-35" />
      <div className="page-shell relative z-10">
        <div className="mb-12 flex items-center justify-between border-b border-ink/20 pb-5">
          <p className="spec-label flex items-center gap-2 text-ink/55"><RegMark size={14} /> Design philosophy</p>
          <p className="spec-label hidden text-ink/35 sm:block">Concept / Composition / Impact</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-[12vw] font-semibold leading-[0.88] tracking-[-0.072em] sm:text-[8.5vw] lg:text-[5.15vw]">
              I BUILD VISUAL SYSTEMS THAT FEEL <span className="text-acid-on-paper">IMMEDIATE, CINEMATIC</span> AND IMPOSSIBLE TO IGNORE.
            </p>
            <div className="mt-10 grid gap-8 border-t border-ink/20 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-xl text-sm leading-relaxed text-ink/55 sm:text-base">
                Every project begins with one clear idea, then grows through hierarchy, atmosphere, typography and controlled detail. The result should look polished, communicate quickly and hold attention.
              </p>
              <div className="flex items-center gap-3 spec-label text-ink/45"><span className="h-2 w-2 rounded-full bg-ink" /> Strategy → Craft → Impact</div>
            </div>
          </motion.div>

          <div className="relative mx-auto h-[560px] w-full max-w-[590px] sm:h-[680px] lg:h-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 45, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              whileHover={{ y: -10, rotate: -3 }}
              className="absolute left-0 top-[12%] h-[54%] w-[48%] overflow-hidden rounded-[24px] border border-ink/10 bg-white p-2 shadow-[0_26px_80px_rgba(16,16,15,0.18)]"
            >
              <ArtworkImage src={lays.image} alt="Lays campaign" fit="contain" ambient className="h-full w-full rounded-[17px]" imageClassName="p-3" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 55, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18 }}
              whileHover={{ y: -10, rotate: 3 }}
              className="absolute right-0 top-0 h-[62%] w-[49%] overflow-hidden rounded-[24px] border border-ink/10 bg-white p-2 shadow-[0_26px_80px_rgba(16,16,15,0.18)]"
            >
              <ArtworkImage src={spiderman.image} alt="Spider-Man poster" fit="contain" ambient className="h-full w-full rounded-[17px]" imageClassName="p-3" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.28 }}
              whileHover={{ y: -8, rotate: 1 }}
              className="absolute bottom-0 left-[18%] h-[42%] w-[64%] overflow-hidden rounded-[24px] border border-ink/10 bg-white p-2 shadow-[0_26px_80px_rgba(16,16,15,0.18)]"
            >
              <ArtworkImage src={jbl.image} alt="JBL campaign" fit="contain" ambient className="h-full w-full rounded-[17px]" imageClassName="p-3" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
