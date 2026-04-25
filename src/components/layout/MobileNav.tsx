"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Artists", href: "/artists" },
  { label: "Events", href: "/events" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar — mobile only */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#f5f3ef]/96 backdrop-blur-sm border-b border-[#1a1a1a]/08 flex items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 border border-[#1a1a1a]/35 flex items-center justify-center font-serif text-sm text-[#1a1a1a]">S</span>
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#1a1a1a]/55">Sanzistry</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-[#1a1a1a]/55 hover:text-[#1a1a1a] transition-colors">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="0" y1="1" x2="22" y2="1" /><line x1="5" y1="7" x2="22" y2="7" /><line x1="0" y1="13" x2="22" y2="13" />
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-150 bg-black/25 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-200 w-70 bg-[#f5f3ef] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 h-14 border-b border-[#1a1a1a]/08">
                <span className="font-serif text-base tracking-widest text-[#1a1a1a]/65">Sanzistry</span>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 px-6 py-8 overflow-y-auto">
                {links.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-[#1a1a1a]/06"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-serif text-2xl font-light text-[#1a1a1a]/65 hover:text-[#1a1a1a] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-6 pb-8">
                <Link href="/tickets" onClick={() => setOpen(false)} className="btn-cut w-full justify-center block text-center">
                  Buy Tickets
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
