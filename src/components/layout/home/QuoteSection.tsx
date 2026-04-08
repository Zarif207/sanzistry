"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="py-24 md:py-40 bg-[#f8f6f2]">
      <div className="max-w-[1000px] mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#1a1a1a]/30 mb-12 block font-light">
            Observation
          </span>
          <h2 className="font-playfair italic text-[clamp(1.4rem,4vw,2.4rem)] font-light leading-relaxed text-[#1a1a1a]/80 mb-12">
            "Art does not reproduce the visible; rather, it makes visible. 
            The essence of drawing is to bring forth the soul of the subject 
            through the simplicity of line and shadow."
          </h2>
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#c5a47e]">
            — Paul Klee, 1920
          </p>
          <div className="mt-16 flex justify-center">
             <div className="w-px h-24 bg-gradient-to-b from-[#c5a47e] to-transparent opacity-30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
