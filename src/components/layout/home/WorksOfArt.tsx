"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorksOfArt() {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
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
    <section ref={containerRef} className="bg-[#f8f6f2] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-150 md:min-h-175">

        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-32 py-24 md:py-32"
        >
          <p className="font-serif italic text-[#c5a47e] text-[clamp(1rem,1.5vw,1.1rem)] mb-6">
            The Museum Archive
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-light tracking-[0.28em] uppercase mb-8 leading-tight">
            Works of Art
          </h2>
          <p className="text-[15px] text-[#1a1a1a]/60 leading-loose tracking-wide mb-12 max-w-120 font-light">
            Each piece in our collection tells a story of cultural resonance and stylistic innovation. 
            From the subtle brushstrokes of the masters to the bold forms of modern pioneers, 
            our archive is a living history of the human imagination.
          </p>
          <div>
            <a href="/gallery" className="btn-cut">
              Explore Collection
            </a>
          </div>
        </motion.div>

        {/* Right — full-bleed image with GSAP Parallax */}
        <div className="relative min-h-125 md:min-h-full overflow-hidden group">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <div ref={imageRef} className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=85"
                alt="Classical Artwork"
                fill
                className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 grayscale-10 group-hover:grayscale-0"
                priority
              />
              <div className="absolute inset-0 bg-[#1a1a1a]/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
