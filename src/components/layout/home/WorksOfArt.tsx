"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WorksOfArt() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20"
        >
          <p className="font-serif italic text-[#c5a47e] text-base mb-4">The Museum archive</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] font-light tracking-[0.18em] uppercase mb-6">
            Works of Art
          </h2>
          <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide mb-4 max-w-[420px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei usmod tempor incididunt ut labore et dolore
          </p>
          <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide mb-10 max-w-[420px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do se eiusmod temps incididunt ut labore et sa dolore si magna aliqua. Ut enim ad minim veniam, inant quis nostrud e exercitation ullamco laboris nisi ut sen aliquip ex ea commodo insa consequat duis aute
          </p>
          <div>
            <a href="/gallery" className="btn-cut">View more</a>
          </div>
        </motion.div>

        {/* Right — full-bleed image */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[400px] md:min-h-full overflow-hidden group"
        >
          <Image
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=75"
            alt="Works of art"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
