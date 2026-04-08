"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { featuredArtworks } from "@/data/artworks";

export default function Featured() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX);
    };
    const onUp = () => {
      el.style.cursor = "grab";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section className="py-28 md:py-36 bg-[#edeae4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 mb-14">
        <SectionHeader eyebrow="Spotlight" title="Featured Works" />
      </div>
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab px-8 md:px-12 select-none"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseDown={handleMouseDown}
      >
        {featuredArtworks.map((artwork, i) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 group overflow-hidden"
            style={{ width: "clamp(260px, 36vw, 480px)", scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 80vw, 36vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase mb-2">{artwork.category}</p>
                <h3 className="text-white font-serif text-2xl font-light leading-snug">{artwork.title}</h3>
                <p className="text-white/50 text-xs mt-1.5 tracking-wide">{artwork.artist}</p>
                {artwork.price && (
                  <p className="text-[#c5a47e] text-xs mt-3 tracking-[0.15em]">{artwork.price}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-8 md:w-12" aria-hidden />
      </div>
    </section>
  );
}
