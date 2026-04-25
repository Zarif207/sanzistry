"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-0 overflow-hidden">
      {/* Textured background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=50"
          alt="Textured background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", filter: "saturate(0.4) brightness(0.85)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#f5f3ef]/30" />
      </div>

      {/* White card */}
      <div className="relative z-10 max-w-250 mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white px-8 md:px-14 py-12 md:py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Left — info */}
            <div>
              <p className="font-serif italic text-[#c5a47e] text-base mb-3">Get in touch</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-light tracking-[0.34em] uppercase mb-8">
                Contact
              </h2>

              <div className="space-y-3 text-[13px] text-[#1a1a1a]/55 tracking-wide mb-8">
                <p>673 12 Constitution Lane Massillion,</p>
                <p>05765 New York</p>
                <p className="pt-1">781-562-9355, 781-727-6090</p>
                <p>sanzistry@gallery.com</p>
              </div>

              {/* Social icons */}
              <div className="flex gap-4">
                {[
                  { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
                  { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                ].map(({ label, path }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center text-[#1a1a1a]/35 hover:text-[#c5a47e] transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Message textarea */}
              <div className="relative">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border border-[#1a1a1a]/12 px-4 py-3 text-[13px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#c5a47e] transition-colors duration-300 resize-none"
                />
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="bg-transparent border-b border-[#1a1a1a]/15 pb-2.5 text-[13px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#c5a47e] transition-colors duration-300"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="E-mail"
                  className="bg-transparent border-b border-[#1a1a1a]/15 pb-2.5 text-[13px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:border-[#c5a47e] transition-colors duration-300"
                />
              </div>

              <div>
                <button type="submit" className="btn-cut">
                  {sent ? "Sent!" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
