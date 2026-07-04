import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RegMark from "./RegMark";

const links = [
  { href: "#work", label: "Work", number: "01" },
  { href: "#about", label: "About", number: "02" },
  { href: "#contact", label: "Contact", number: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["top", "work", "about", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-white/10 bg-ink/90 backdrop-blur-2xl" : "bg-transparent"}`}>
        <nav className="page-shell flex h-[76px] items-center justify-between text-white">
          <a href="#top" className="group flex items-center gap-3" aria-label="Nandish portfolio home">
            <RegMark size={27} spin className="text-acid transition-transform duration-500 group-hover:scale-110" />
            <span className="font-display text-lg font-bold tracking-[-0.04em]">NANDISH®</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={`nav-link spec-label ${active === link.href ? "text-white" : "text-white/50 hover:text-white"}`}>
                <span className="mr-1.5 text-[9px] text-acid">{link.number}</span>{link.label}
              </a>
            ))}
            <a href="#contact" data-cursor="Let's work" className="button-light">Start a project <ArrowUpRight size={15} /></a>
          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} className="menu-toggle md:hidden" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            <span className={open ? "translate-y-[6px] rotate-45" : ""} />
            <span className={open ? "opacity-0" : ""} />
            <span className={open ? "-translate-y-[6px] -rotate-45" : ""} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink px-5 pb-8 pt-28 text-white md:hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 flex items-center justify-between spec-label text-white/40"><span>Navigation / Portfolio 2026</span><span>Menu</span></div>
                <div className="border-t border-white/20">
                  {links.map((link, index) => (
                    <motion.a key={link.href} href={link.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + 0.07 * index, duration: 0.5 }} className="group flex items-center justify-between border-b border-white/20 py-5 font-display text-[14vw] font-semibold leading-none tracking-[-0.065em]">
                      <span className="transition-colors group-hover:text-acid">{link.label}</span><span className="spec-label text-acid">{link.number}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-white/15 pt-6">
                <p className="max-w-[230px] text-sm leading-relaxed text-white/50">Campaign design, editorial layouts, posters and cinematic image manipulation.</p>
                <RegMark size={58} spin className="shrink-0 text-acid" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
