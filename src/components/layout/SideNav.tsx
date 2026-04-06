"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Artists", href: "/artists" },
      { label: "About", href: "/about" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export default function SideNav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname !== "/") { setIsDark(false); return; }
    const check = () => setIsDark(window.scrollY < window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenItem(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenItem(null), 140);
  };

  return (
    <aside
      className={`hidden md:flex fixed top-0 left-0 h-screen w-[220px] z-50 flex-col transition-all duration-500 ${
        isDark
          ? "bg-transparent"
          : "bg-[#f5f3ef]/96 backdrop-blur-sm border-r border-[#1a1a1a]/06"
      }`}
    >
      {/* Logo */}
      <div className="px-7 pt-9 pb-7">
        <Link href="/" className="flex items-center gap-3">
          <span className={`w-10 h-10 border flex items-center justify-center font-serif text-base font-light tracking-widest transition-colors duration-500 ${
            isDark ? "border-white/50 text-white" : "border-[#1a1a1a]/35 text-[#1a1a1a]"
          }`}>
            S
          </span>
          <span className={`text-[10px] tracking-[0.32em] uppercase font-light transition-colors duration-500 ${
            isDark ? "text-white/60" : "text-[#1a1a1a]/50"
          }`}>
            Sanzistry
          </span>
        </Link>
      </div>

      <div className={`mx-7 h-px transition-colors duration-500 ${isDark ? "bg-white/10" : "bg-[#1a1a1a]/08"}`} />

      {/* Nav */}
      <nav className="flex flex-col px-5 pt-7 gap-0.5 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href || item.children?.some(c => pathname === c.href);
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && enter(item.label)}
              onMouseLeave={leave}
            >
              <Link
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 text-[11px] tracking-[0.22em] uppercase font-light rounded-sm transition-all duration-300 group ${
                  active
                    ? isDark ? "text-white" : "text-[#1a1a1a]"
                    : isDark ? "text-white/50 hover:text-white" : "text-[#1a1a1a]/45 hover:text-[#1a1a1a]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 ${
                    active ? "bg-[#c5a47e]" : "bg-transparent group-hover:bg-[#c5a47e]/40"
                  }`} />
                  {item.label}
                </span>
                {item.children && (
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none"
                    className={`transition-transform duration-300 flex-shrink-0 ${openItem === item.label ? "rotate-90" : ""} ${isDark ? "text-white/30" : "text-[#1a1a1a]/25"}`}
                  >
                    <path d="M1 1l2.5 2.5L6 1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                )}
              </Link>

              {/* Dropdown flies RIGHT */}
              <AnimatePresence>
                {item.children && openItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-full top-0 ml-2 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.11)] min-w-[170px] py-2 z-50"
                    onMouseEnter={() => enter(item.label)}
                    onMouseLeave={leave}
                  >
                    {/* Arrow */}
                    <span className="absolute -left-1.5 top-3.5 w-3 h-3 bg-white rotate-45 shadow-[-1px_1px_3px_rgba(0,0,0,0.05)]" />
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="relative z-10 block px-5 py-2.5 text-[12px] tracking-[0.1em] text-[#1a1a1a]/55 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 pb-9 mt-auto">
        <div className={`h-px mb-6 transition-colors duration-500 ${isDark ? "bg-white/10" : "bg-[#1a1a1a]/08"}`} />
        <Link href="/tickets" className="btn-cut w-full justify-center block text-center mb-7">
          Buy Tickets
        </Link>
        <div className={`space-y-1 text-[10px] leading-relaxed tracking-wide transition-colors duration-500 ${isDark ? "text-white/28" : "text-[#1a1a1a]/28"}`}>
          <p>Open Tue – Sun: 09am – 07pm</p>
          <p>1611 Linden Ave, New York</p>
        </div>
      </div>
    </aside>
  );
}
