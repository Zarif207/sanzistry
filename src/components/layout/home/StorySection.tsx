"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="py-24 md:py-32 bg-[#f8f6f2]">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-20"
      >
        <p className="font-serif italic text-[#c5a47e] text-sm mb-4 tracking-wide">
          History of art department
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light tracking-[0.28em] uppercase leading-tight whitespace-nowrap">
            National Museum
          </h2>
          <span className="hidden md:block flex-1 h-px bg-[#1a1a1a]/10" />
        </div>
      </motion.div>

      {/* ── 3-Column Layout ── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 items-center">
          
          {/* Left: small paragraph text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <p className="text-[14px] text-[#1a1a1a]/60 leading-[1.9] tracking-wide font-light">
              The National Museum stands as a testament to the enduring power of human creativity. 
              Our collection spans centuries, bringing together masterworks that define the 
              evolution of artistic expression across cultures and continents.
            </p>
          </motion.div>

          {/* Center: vertical image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 md:order-2 relative aspect-[3/4] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
          >
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80"
              alt="Museum Architecture"
              fill
              className="object-cover transition-transform duration-[2s] hover:scale-110"
              priority
            />
          </motion.div>

          {/* Right: small paragraph + button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-3 space-y-8"
          >
            <p className="text-[14px] text-[#1a1a1a]/60 leading-[1.9] tracking-wide font-light">
              Discover a curated journey through history, from ancient sculptures to 
              contemporary installations. We invite you to explore the intersection of 
              tradition and innovation in our ever-evolving galleries.
            </p>
            <div className="pt-2">
              <a href="/about" className="btn-cut">
                View more
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
