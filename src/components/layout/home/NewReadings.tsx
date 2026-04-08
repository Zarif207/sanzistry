"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const entries = [
  {
    year: "1910",
    subtitle: "History of the Museum",
    title: "The Archive",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75",
    imageLeft: false,
  },
  {
    year: "1982",
    subtitle: "Museum in",
    title: "New Home",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=75",
    imageLeft: true,
  },
  {
    year: "2002",
    subtitle: "Art & Events",
    title: "Events",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=75",
    imageLeft: false,
  },
];

function TimelineEntry({
  entry,
  index,
}: {
  entry: typeof entries[0];
  index: number;
}) {
  const { imageLeft, year, subtitle, title, body, image } = entry;

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex flex-col justify-center"
    >
      <p className="text-[10px] tracking-[0.35em] uppercase text-[#1a1a1a]/30 mb-1">{year}</p>
      <p className="font-serif italic text-[#c5a47e] text-sm mb-2">{subtitle}</p>
      <h3 className="font-serif text-[clamp(1.4rem,3vw,2rem)] font-light tracking-[0.12em] uppercase mb-5 text-[#1a1a1a]">
        {title}
      </h3>
      <p className="text-[13px] text-[#1a1a1a]/50 leading-[1.9] tracking-wide">
        {body}
      </p>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative overflow-hidden aspect-[4/3] group"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        style={{ objectFit: "cover" }}
        className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
    </motion.div>
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-0 items-center mb-0">
      {/* Left column */}
      <div className="px-6 md:px-10 py-14 md:py-20">
        {imageLeft ? imageBlock : textBlock}
      </div>

      {/* Center — year marker + dot on timeline */}
      <div className="hidden md:flex flex-col items-center justify-center relative py-20">
        <span className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/30 mb-3 font-light">{year}</span>
        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#c5a47e] bg-[#f5f3ef] z-10" />
      </div>

      {/* Right column */}
      <div className="px-6 md:px-10 py-14 md:py-20">
        {imageLeft ? textBlock : imageBlock}
      </div>
    </div>
  );
}

export default function NewReadings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6 mb-6"
      >
        <p className="font-serif italic text-[#c5a47e] text-sm mb-2">History of the Museum</p>
        <div className="flex items-center justify-center gap-5 mb-4">
          <span className="flex-1 max-w-[100px] md:max-w-[160px] h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-light tracking-[0.22em] uppercase">
            New Readings
          </h2>
          <span className="flex-1 max-w-[100px] md:max-w-[160px] h-px bg-[#1a1a1a]/10" />
        </div>
        <p className="text-[13px] text-[#1a1a1a]/40 max-w-[480px] mx-auto leading-relaxed tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt labore et dolore magna aliqua.
        </p>
      </motion.div>

      {/* Timeline container */}
      <div className="relative max-w-[1200px] mx-auto">
        {/* Vertical center line — draws on scroll */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#1a1a1a]/08 overflow-hidden">
          <motion.div
            className="w-full bg-[#1a1a1a]/20 origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />
        </div>

        {entries.map((entry, i) => (
          <TimelineEntry key={entry.year} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
