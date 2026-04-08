"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const entries = [
  {
    year: "1910",
    subtitle: "The Foundation",
    title: "The Great Archive",
    body: "The inception of our museum was marked by a commitment to preserving the sublime beauty of classical heritage. Our first collection was a curated selection of European masterworks.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
    imageLeft: true,
  },
  {
    year: "1982",
    subtitle: "Modern Expansion",
    title: "A New Vision",
    body: "As the cultural landscape evolved, so did we. The opening of our new wing allowed for a dedicated space to showcase the emerging voices of the 20th-century avant-garde.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1000&q=80",
    imageLeft: false,
  },
  {
    year: "2024",
    subtitle: "Contemporary Era",
    title: "Digital Horizons",
    body: "Today, we bridge the gap between physical and virtual realms, integrating immersive technologies that allow visitors to engage with art in unprecedented ways.",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1000&q=80",
    imageLeft: true,
  },
];

function TimelineEntry({ entry }: { entry: typeof entries[0] }) {
  const { imageLeft, year, subtitle, title, body, image } = entry;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 lg:gap-40 items-center mb-32 md:mb-56 last:mb-0">
      
      {/* ── Image Side ── */}
      <motion.div
        initial={{ opacity: 0, x: imageLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[4/5] overflow-hidden group ${imageLeft ? "md:order-1" : "md:order-2"}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/5 group-hover:bg-transparent transition-colors duration-1000" />
      </motion.div>

      {/* ── Text Side ── */}
      <motion.div
        initial={{ opacity: 0, x: imageLeft ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col ${imageLeft ? "md:order-2" : "md:order-1 text-right"}`}
      >
        <span className="font-serif italic text-[#c5a47e] text-2xl mb-4 tracking-widest">{year}</span>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/30 mb-3">{subtitle}</p>
        <h3 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] font-light tracking-[0.18em] uppercase mb-8 text-[#1a1a1a] leading-[1.2]">
          {title}
        </h3>
        <p className={`text-[15px] text-[#1a1a1a]/55 leading-[2] tracking-wide font-light max-w-[480px] ${imageLeft ? "" : "ml-auto"}`}>
          {body}
        </p>
      </motion.div>

      {/* ── Year Marker Dot on Center Line ── */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <div className="w-[10px] h-[10px] rounded-full bg-[#c5a47e] border border-white" />
      </div>
    </div>
  );
}

export default function NewReadings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-32 md:mb-48"
        >
          <p className="font-serif italic text-[#c5a47e] text-base mb-4 tracking-wide">
            Our Legacy
          </p>
          <div className="flex items-center justify-center gap-10">
            <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
            <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light tracking-[0.28em] uppercase leading-tight whitespace-nowrap">
              New Readings
            </h2>
            <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
          </div>
        </motion.div>

        {/* ── Timeline Container ── */}
        <div className="relative">
          {/* Vertical center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#1a1a1a]/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#c5a47e] origin-top h-full"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          <div className="space-y-32">
            {entries.map((entry) => (
              <TimelineEntry key={entry.year} entry={entry} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
