"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedBanner() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-125 md:h-175 overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1920&q=85"
          alt="Featured Artwork"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Floating Info Card */}
      <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24 lg:px-40">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-10 md:p-14 max-w-95 w-full shadow-[0_20px_70px_rgba(0,0,0,0.12)] relative z-10"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1a1a1a]/35 mb-6">
            Featured Highlight
          </p>

         
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-[0.18em] uppercase leading-tight mb-4 text-[#1a1a1a]">
            Still Life with Jar, Cup & Apples
          </h2>

          <p className="font-serif italic text-[#c5a47e] text-lg mb-8">
            Paul Cezanne, 1877
          </p>

          <div className="w-12 h-px bg-[#c5a47e] mb-10" />

          <a
            href="/gallery"
            className="inline-block text-[11px] tracking-[0.25em] uppercase border border-[#c5a47e] px-6 py-3 hover:bg-[#c5a47e] hover:text-white transition-all duration-300"
          >
            Explore Details
          </a>
        </motion.div>
      </div>
    </section>
  );
}