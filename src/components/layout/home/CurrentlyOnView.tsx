"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const exhibitions = [
  {
    id: 1,
    title: "The Street Pavements",
    date: "Mar 1 – Mar 3 2025",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75",
    href: "/gallery",
  },
  {
    id: 2,
    title: "Abstract Wireframe",
    date: "Mar 1 – Mar 15 2025",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75",
    href: "/gallery",
  },
  {
    id: 3,
    title: "Looking to Eternity",
    date: "Mar 1 – Mar 15 2024",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=75",
    href: "/gallery",
  },
  {
    id: 4,
    title: "Flowers and Mindfulness",
    date: "Mar 1 – Mar 15 2024",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=75",
    href: "/gallery",
  },
  {
    id: 5,
    title: "Golden Silence",
    date: "Apr 1 – Apr 20 2025",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75",
    href: "/gallery",
  },
];

export default function CurrentlyOnView() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_W = 280; // approximate card width + gap

  const scrollTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * CARD_W, behavior: "smooth" });
    setActiveDot(idx);
  }, []);

  const prev = () => scrollTo(Math.max(0, activeDot - 1));
  const next = () => scrollTo(Math.min(exhibitions.length - 1, activeDot + 1));

  // Auto-advance every 4s
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveDot((d) => {
        const next = (d + 1) % exhibitions.length;
        trackRef.current?.scrollTo({ left: next * CARD_W, behavior: "smooth" });
        return next;
      });
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#f5f3ef] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-12"
      >
        <p className="font-serif italic text-[#c5a47e] text-base mb-3">Exhibition highlights</p>
        <div className="flex items-center justify-center gap-5">
          <span className="flex-1 max-w-[120px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light tracking-[0.22em] uppercase">
            Currently on View
          </h2>
          <span className="flex-1 max-w-[120px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
        </div>
      </motion.div>

      {/* Carousel with arrows */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-all duration-300 bg-white/80 backdrop-blur-sm"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M8 2L3 6.5l5 4.5" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-14 md:px-20"
          style={{ scrollSnapType: "x mandatory" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            setActiveDot(Math.round(el.scrollLeft / CARD_W));
          }}
        >
          {exhibitions.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 group cursor-pointer"
              style={{ width: "clamp(220px, 28vw, 280px)", scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] bg-[#ede9e3] mb-4">
                <Image
                  src={ex.image}
                  alt={ex.title}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-[900ms] group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
              {/* Info */}
              <p className="text-[11px] text-[#c5a47e] tracking-wide mb-1.5">{ex.date}</p>
              <h3 className="font-serif text-[1.05rem] font-light tracking-[0.08em] uppercase leading-snug mb-3 text-[#1a1a1a]/80">
                {ex.title}
              </h3>
              <a
                href={ex.href}
                className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#1a1a1a]/45 hover:text-[#1a1a1a] transition-colors duration-300 group/link"
              >
                <span className="w-6 h-px bg-current transition-all duration-300 group-hover/link:w-8" />
                View more
              </a>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-8" aria-hidden />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-all duration-300 bg-white/80 backdrop-blur-sm"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M5 2l5 4.5L5 11" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2].map((d) => (
          <button
            key={d}
            onClick={() => scrollTo(d)}
            aria-label={`Page ${d + 1}`}
            className={`transition-all duration-400 rounded-full ${
              activeDot === d ? "w-4 h-1.5 bg-[#1a1a1a]" : "w-1.5 h-1.5 bg-[#1a1a1a]/25 hover:bg-[#1a1a1a]/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
