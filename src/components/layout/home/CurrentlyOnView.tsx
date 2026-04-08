"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

const EXHIBITIONS = [
  { id: 1,  title: "The Street Pavements",    date: "Mar 01 — Mar 30",   image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80" },
  { id: 2,  title: "Abstract Wireframe",      date: "Mar 15 — Apr 15",  image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80" },
  { id: 3,  title: "Looking to Eternity",     date: "Apr 01 — May 15",  image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80" },
  { id: 4,  title: "Flowers and Mindfulness", date: "Apr 15 — Jun 30",  image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80" },
  { id: 5,  title: "Golden Silence",          date: "May 01 — Jul 20",  image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" },
  { id: 6,  title: "Urban Fragments",         date: "May 15 — Aug 30",  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80" },
  { id: 7,  title: "Monochrome Study",        date: "Jun 01 — Jul 01",  image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=800&q=80" },
  { id: 8,  title: "Symmetry in Art",         date: "Jun 15 — Jul 30",  image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80" },
  { id: 9,  title: "The Blue Period",         date: "Jul 01 — Aug 15",  image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80" },
  { id: 10, title: "Nature Revived",          date: "Jul 15 — Sep 30",  image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80" },
];

export default function CurrentlyOnView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;
    
    const tween = gsap.to(marquee, {
      x: -totalWidth,
      duration: 30, // Slightly faster for 10 items
      ease: "none",
      repeat: -1,
    });

    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => tween.play();

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tween.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 md:py-40 bg-[#f8f6f2] overflow-hidden border-b border-[#1a1a1a]/5">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-24 md:mb-32"
      >
        <p className="font-serif italic text-[#c5a47e] text-[15px] mb-4 tracking-wide">
          Exhibitions
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-[0.28em] uppercase leading-tight text-[#1a1a1a]">
          Currently on View
        </h2>
      </motion.div>

      {/* ── Infinite GSAP Marquee ── */}
      <div className="relative">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap"
        >
          {/* Double the list for seamless loop */}
          {[...EXHIBITIONS, ...EXHIBITIONS].map((ex, i) => (
            <div
              key={`${ex.id}-${i}`}
              className="inline-block flex-shrink-0 px-6 sm:px-10 group"
              style={{ width: "clamp(280px, 35vw, 420px)" }}
            >
              {/* Image with Hover Effect */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ede9e2] mb-10">
                <Image
                  src={ex.image}
                  alt={ex.title}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Information */}
              <div className="space-y-3 whitespace-normal">
                <p className="font-serif italic text-[#c5a47e] text-[13px] tracking-widest">
                  {ex.date}
                </p>
                <h3 className="font-serif text-[1.2rem] md:text-[1.5rem] tracking-[0.08em] uppercase font-light leading-snug text-[#1a1a1a]">
                  {ex.title}
                </h3>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-500 group/link">
                    Discover
                    <span className="w-8 h-px bg-[#1a1a1a]/20 group-hover/link:w-12 group-hover/link:bg-[#1a1a1a] transition-all duration-500" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
