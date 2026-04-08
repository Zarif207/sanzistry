"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  linkLabel,
  linkHref,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`mb-14 ${isCenter ? "text-center" : "text-left"}`}
    >
      {/* Eyebrow */}
      <p className="type-eyebrow mb-3">{eyebrow}</p>

      {/* Title with flanking lines */}
      <div className={`flex items-center gap-6 md:gap-10 mb-0 ${isCenter ? "justify-center" : ""}`}>
        {isCenter && (
          <span className="flex-1 max-w-[80px] sm:max-w-[140px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
        )}
        <h2 className="type-heading text-[clamp(1.6rem,4vw,2.8rem)] whitespace-nowrap">
          {title}
        </h2>
        {isCenter && (
          <span className="flex-1 max-w-[80px] sm:max-w-[140px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
        )}
        {!isCenter && linkLabel && linkHref && (
          <Link
            href={linkHref}
            className="ml-auto hidden sm:flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#1a1a1a]/35 hover:text-[#1a1a1a] transition-colors duration-300 group"
          >
            {linkLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {/* Optional description */}
      {description && (
        <p className="type-body max-w-[520px] mx-auto mt-5">{description}</p>
      )}
    </motion.div>
  );
}
