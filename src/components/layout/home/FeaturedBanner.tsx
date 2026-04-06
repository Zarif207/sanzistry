"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedBanner() {
  return (
    <section className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&q=75"
        alt="Featured artwork"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        loading="lazy"
      />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Floating info card — bottom right */}
      <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white px-10 py-9 max-w-[320px] w-full shadow-[0_8px_48px_rgba(0,0,0,0.12)]"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1a1a1a]/35 mb-4">Featured Work</p>
          <h2 className="font-serif text-[1.5rem] font-light tracking-[0.1em] uppercase leading-snug mb-3 text-[#1a1a1a]">
            Still Life with Jar, Cup and Apples
          </h2>
          <p className="text-[13px] text-[#1a1a1a]/45 tracking-wide">Paul Cézanne, 1877</p>
          <div className="w-8 h-px bg-[#c5a47e] mt-5" />
        </motion.div>
      </div>
    </section>
  );
}
