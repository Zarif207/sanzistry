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
    <section className="relative h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center py-0">
      {/* Background with blur and overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920&q=80"
          alt="Museum Gallery"
          fill
          className="object-cover blur-[4px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered White Box with Floating Effect */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-white p-12 md:p-20 max-w-[700px] w-[90%] text-center shadow-[0_30px_100px_rgba(0,0,0,0.2)]"
      >
        <p className="font-serif italic text-[#c5a47e] text-lg mb-6 tracking-wide">
          Stay Informed
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] font-light tracking-[0.28em] uppercase text-[#1a1a1a] mb-10 leading-tight">
          Museum News
        </h2>
        
        <p className="font-sans text-[14px] text-[#1a1a1a]/55 leading-[1.85] tracking-wide mb-12 max-w-[500px] mx-auto font-light">
          Join our community of art lovers and stay updated with the latest 
          exhibitions, exclusive events, and insights from our curators.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-stretch">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="flex-1 bg-[#f8f6f2] border-none px-8 py-4 text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:ring-1 focus:ring-[#c5a47e] transition-all outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#1a1a1a] text-white px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[#c5a47e] transition-colors duration-[0.6s]"
          >
            {sent ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
