"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const exhibitions = [
  { id: 1,  title: "The Street Pavements",    date: "Mar 1 – Mar 3 2025",   image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75", href: "/gallery" },
  { id: 2,  title: "Abstract Wireframe",      date: "Mar 1 – Mar 15 2025",  image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75", href: "/gallery" },
  { id: 3,  title: "Looking to Eternity",     date: "Mar 1 – Mar 15 2024",  image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=75", href: "/gallery" },
  { id: 4,  title: "Flowers and Mindfulness", date: "Mar 1 – Mar 15 2024",  image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=75", href: "/gallery" },
  { id: 5,  title: "Golden Silence",          date: "Apr 1 – Apr 20 2025",  image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=75", href: "/gallery" },
  { id: 6,  title: "Urban Fragments",         date: "May 1 – May 30 2025",  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75", href: "/gallery" },
  { id: 7,  title: "Reverie",                 date: "Jun 1 – Jun 15 2025",  image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=75", href: "/gallery" },
  { id: 8,  title: "Solstice",                date: "Jul 1 – Jul 20 2025",  image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&q=75", href: "/gallery" },
];

// Stagger offsets matching reference: alternating heights
const offsets = [0, 60, 0, 40, 0, 60, 0, 40];

export default function CurrentlyOnView() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_W = 290;
  const DOTS = 3;

  const scrollTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * CARD_W, behavior: "smooth" });
    setActiveDot(idx);
  }, []);

  const prev = () => scrollTo(Math.max(0, activeDot - 1));
  const next = () => scrollTo(Math.min(exhibitions.length - 1, activeDot + 1));

  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      setActiveDot((d) => {
        const n = (d + 1) % exhibitions.length;
        trackRef.current?.scrollTo({ left: n * CARD_W, behavior: "smooth" });
        return n;
      });
    }, 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paused]);

  return (
    <section className="py-20 md:py-28 bg-[#f5f3ef] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center px-6 mb-14"
      >
        <p className="font-serif italic text-[#c5a47e] text-[1rem] mb-3">Exhibition highlights</p>
        <div className="flex items-center justify-center gap-6">
          <span className="flex-1 max-w-[140px] md:max-w-[220px] h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.6rem,4.5vw,2.8rem)] font-light tracking-[0.28em] uppercase">
            Currently on View
          </h2>
          <span className="flex-1 max-w-[140px] md:max-w-[220px] h-px bg-[#1a1a1a]/10" />
        </div>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left arrow — circle style matching reference */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 md:left-8 top-[38%] -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/45 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-all duration-300 bg-white/70 backdrop-blur-sm"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M7 2L2 8l5 6" />
          </svg>
        </button>

        {/* Track — staggered layout via paddingBottom on container */}
        <div
          ref={trackRef}
          className="flex items-start gap-5 overflow-x-auto scrollbar-hide px-14 md:px-20 pb-16"
          style={{ scrollSnapType: "x mandatory" }}
          onScroll={(e) => setActiveDot(Math.round(e.currentTarget.scrollLeft / CARD_W))}
        >
          {exhibitions.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
              className="flex-shrink-0 group cursor-pointer"
              style={{
                width: "clamp(180px, 24vw, 260px)",
                scrollSnapAlign: "start",
                marginTop: `${offsets[i % offsets.length]}px`,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#ede9e3] mb-4"
                style={{ aspectRatio: i % 2 === 0 ? "3/4" : "2/3" }}
              >
                <Image
                  src={ex.image}
                  alt={ex.title}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-all duration-500" />
              </div>

              {/* Info */}
              <p className="text-[10px] text-[#c5a47e] tracking-[0.15em] mb-1.5">{ex.date}</p>
              <h3 className="font-serif text-[0.95rem] font-light tracking-[0.1em] uppercase leading-snug mb-3 text-[#1a1a1a]/80">
                {ex.title}
              </h3>
              <a
                href={ex.href}
                className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-300 group/link"
              >
                <span className="w-6 h-px bg-current transition-all duration-300 group-hover/link:w-9" />
                View More
              </a>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-10" aria-hidden />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 md:right-8 top-[38%] -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/45 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/50 transition-all duration-300 bg-white/70 backdrop-blur-sm"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 2l5 6-5 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-2">
        {Array.from({ length: DOTS }).map((_, d) => (
          <button
            key={d}
            onClick={() => scrollTo(d * 2)}
            aria-label={`Page ${d + 1}`}
            className={`transition-all duration-400 rounded-full ${
              Math.floor(activeDot / 2) === d
                ? "w-5 h-1.5 bg-[#1a1a1a]"
                : "w-1.5 h-1.5 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
