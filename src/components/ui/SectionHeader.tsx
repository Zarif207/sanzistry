"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  linkLabel?: string;
  linkHref?: string;
}

export default function SectionHeader({ eyebrow, title, linkLabel, linkHref }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-18"
    >
      <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-3 font-sans">
        {eyebrow}
      </p>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-none font-light text-[#1a1a1a]">
          {title}
        </h2>
        {linkLabel && linkHref && (
          <a
            href={linkHref}
            className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#1a1a1a]/35 hover:text-[#1a1a1a] transition-colors duration-400 pb-1 group"
          >
            {linkLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>
      <div className="w-8 h-px bg-[#c8a97e] mt-5" />
    </motion.div>
  );
}
