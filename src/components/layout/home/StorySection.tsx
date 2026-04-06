"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = "easeOut" as const;

export default function StorySection() {
  return (
    <section className="py-20 md:py-28 bg-[#f5f3ef]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease }}
        className="text-center px-6 mb-16"
      >
        <p className="font-serif italic text-[#c5a47e] text-base mb-3">History of art department</p>
        <div className="flex items-center justify-center gap-5">
          <span className="flex-1 max-w-[120px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.8rem,5vw,3.2rem)] font-light tracking-[0.22em] uppercase">
            National Museum
          </h2>
          <span className="flex-1 max-w-[120px] md:max-w-[200px] h-px bg-[#1a1a1a]/10" />
        </div>
      </motion.div>

      {/* Three-column: text | image | text */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-14 items-start">

          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="space-y-5"
          >
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide">
              Lorem ipsum dolor sit amet, consectetur estor adipi isicing elit, sed do eiusmod tempor este uterre incididunt ut labore et dolore magna aliquaas. Ut enim ad minim veniam, quis mot nostrud desto exercitation est ullamco laboris nisi ut se aliquip ex ea commodos consequat.
            </p>
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide">
              Duis aute irure et dolor in reprehender itinse voluptate velit esse cillum dolore eu fugiat do nulla pariatur deus ex. Excepteur sint occaecat er cupidatat non ullamco proident, sunt in dos.
            </p>
          </motion.div>

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="relative w-full md:w-[300px] lg:w-[380px] aspect-[3/4] overflow-hidden flex-shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75"
              alt="Museum interior"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </motion.div>

          {/* Right text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="space-y-5"
          >
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide">
              Lorem ipsum dolor sit amet, consectetur dolore adipisicing eli sed do eiusmod tempor incididunt ut labore et dolore si magna aliqua. Ut enim ad minim veniam, quis ester nostrud e exercitation ullamco laboris nisi ut aliquip ex ea commodo et consequat in Duis aute irure dolor in ut mag.
            </p>
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] tracking-wide">
              Lorem ipsum dolor sit amet, consectetur ester adipisicing eli sed do eiusmod tempor incididunt ut labore et dolore si magna aliqua. Ut enim ad minim veniam, quis ester nostrud e exercitation.
            </p>
            <div className="pt-3">
              <a href="/about" className="btn-cut">View more</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
