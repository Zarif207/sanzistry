"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

const EXHIBITIONS = [
  { id: 1,  title: "The Street Pavements",    date: "Mar 01 — Mar 30, 2026",   image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80" },
  { id: 2,  title: "Abstract Wireframe",      date: "Mar 15 — Apr 15, 2026",  image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80" },
  { id: 3,  title: "Looking to Eternity",     date: "Apr 01 — May 15, 2026",  image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80" },
  { id: 4,  title: "Flowers and Mindfulness", date: "Apr 15 — Jun 30, 2026",  image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80" },
  { id: 5,  title: "Golden Silence",          date: "May 01 — Jul 20, 2026",  image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" },
  { id: 6,  title: "Urban Fragments",         date: "May 15 — Aug 30, 2026",  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80" },
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
      duration: 35,
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
    <section className="py-24 md:py-32 bg-[#f8f6f2] overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-20"
      >
        <p className="font-playfair italic text-[#c5a47e] text-[clamp(1rem,1.5vw,1.1rem)] mb-6 tracking-wide">
          Exhibition Highlights
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-12">
          <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
          <h2 className="font-playfair text-[clamp(2.2rem,5vw,3.5rem)] font-light tracking-[0.25em] uppercase leading-tight whitespace-nowrap">
            Currently on View
          </h2>
          <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
        </div>
      </motion.div>

      {/* ── Infinite GSAP Marquee ── */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap pb-12"
        >
          {/* Double the list for seamless loop */}
          {[...EXHIBITIONS, ...EXHIBITIONS].map((ex, i) => (
            <div
              key={`${ex.id}-${i}`}
              className={`inline-block flex-shrink-0 px-6 sm:px-8 group transition-all duration-700
                ${i % 2 === 0 ? "pt-12" : "pt-0"}
                ${i % 3 === 0 ? "md:pt-20" : ""}
              `}
              style={{ width: "clamp(280px, 30vw, 380px)" }}
            >
              {/* Image with Hover Effect */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ede9e2] mb-8">
                <Image
                  src={ex.image}
                  alt={ex.title}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#f8f6f2]/0 group-hover:bg-[#f8f6f2]/10 transition-colors duration-700" />
              </div>

              {/* Information */}
              <div className="space-y-3 whitespace-normal opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-playfair italic text-[#c5a47e] text-[12px] tracking-widest uppercase">
                  {ex.date}
                </p>
                <h3 className="font-playfair text-[1.2rem] md:text-[1.4rem] tracking-[0.08em] uppercase font-light leading-snug text-[#1a1a1a]">
                  {ex.title}
                </h3>
                <div className="pt-4 overflow-hidden">
                  <span className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all duration-[0.6s] ease-out group/btn">
                    <span className="w-8 h-px bg-[#1a1a1a]/20 group-hover/btn:w-12 group-hover/btn:bg-[#1a1a1a] transition-all duration-500" />
                    View More
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
