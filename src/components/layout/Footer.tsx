"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cols = {
  "Museum Info": ["About the Museum", "General Store", "Exhibitions", "News & Updates", "Buy Tickets"],
  "Opening Hours": ["Tue–Thu: 10am–6pm", "Fri–Sat: 10am–8pm", "Sun: 10am–5pm", "Mon: closed"],
  "Follow Us": ["Facebook", "Instagram", "Twitter"],
};

export default function Footer() {
  return (
    <footer className="sticky bottom-0 -z-10 bg-[#111110] text-white/50 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-350 mx-auto px-8 md:px-12 pt-16 md:pt-24 pb-10"
      >
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16 pb-16 border-b border-white/6">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 border border-white/20 flex items-center justify-center font-serif text-sm text-white/80">
                S
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase font-light text-white/60">
                Sanzistry
              </span>
            </div>
            <p className="text-[12px] leading-[1.85] text-white/30 max-w-60 font-light tracking-wide">
              673 12 Constitution Lane Massillion, <br />
              05765 New York, NY
            </p>
            <div className="text-[12px] text-white/30 space-y-1 font-light tracking-wide">
              <p>781-562-9355</p>
              <p>sanzistry@gallery.com</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, items]) => (
            <div key={heading} className="space-y-8">
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-white/20 font-light">{heading}</h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[12px] text-white/35 hover:text-white/80 transition-all duration-300 tracking-wider font-light"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
          <p className="text-[11px] text-white/10 tracking-[0.2em] uppercase font-light">
            © {new Date().getFullYear()} Sanzistry. Designed for the Arts.
          </p>
          <div className="flex gap-10">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-white/20 hover:text-white/60 transition-colors duration-300 tracking-widest uppercase font-light"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
