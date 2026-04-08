"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="relative overflow-hidden py-0">
      {/* Textured background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920&q=50"
          alt="Newsletter background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", filter: "saturate(0.5) brightness(0.75)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/30" />
      </div>

      {/* Glassmorphism card */}
      <div className="relative z-10 flex items-center justify-center min-h-[420px] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="w-full max-w-[640px] bg-white/12 backdrop-blur-md border border-white/20 px-10 md:px-16 py-12 text-center"
        >
          <p className="font-serif italic text-white/60 text-base mb-3">Stay informed</p>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-light tracking-[0.18em] uppercase text-white mb-3">
            Museum News
          </h2>
          <div className="w-8 h-px bg-[#c5a47e] mx-auto mb-6" />
          <p className="text-[13px] text-white/55 leading-relaxed tracking-wide mb-8 max-w-[380px] mx-auto">
            Subscribe to receive updates on new exhibitions, events, and exclusive offers from Sanzistry.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-[420px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="flex-1 bg-white/10 border border-white/25 px-5 py-3.5 text-[12px] text-white placeholder:text-white/35 focus:outline-none focus:border-white/50 transition-colors backdrop-blur-sm"
            />
            <button
              type="submit"
              className="border border-l-0 border-white/25 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-white/70 hover:bg-white hover:text-[#1a1a1a] hover:border-white transition-all duration-500 whitespace-nowrap"
            >
              {sent ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
