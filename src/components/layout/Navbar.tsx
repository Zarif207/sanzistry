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
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Prints", href: "/shop" },
      { label: "Books", href: "/shop" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-hero pages the navbar is always in "light" (solid) mode
  const isHeroPage = pathname === "/";
  // Dark mode = transparent over hero; light mode = solid bg
  const isDark = isHeroPage && !scrolled;

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 130);
  };

  const textBase = isDark
    ? "text-white/80 hover:text-white"
    : "text-[#1a1a1a]/65 hover:text-[#1a1a1a]";

  const iconBase = isDark
    ? "text-white/70 hover:text-white"
    : "text-[#1a1a1a]/55 hover:text-[#1a1a1a]";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHeroPage
            ? "top-0 bg-[#f5f3ef]/97 backdrop-blur-sm shadow-[0_1px_0_rgba(26,26,26,0.07)]"
            : "top-9 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-10 h-[68px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <span className={`w-10 h-10 border flex items-center justify-center font-serif text-base font-light tracking-widest transition-colors duration-500 ${
              isDark ? "border-white/55 text-white" : "border-[#1a1a1a]/35 text-[#1a1a1a]"
            }`}>
              S
            </span>
          </Link>

          {/* ── Center nav ── */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-start pl-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleEnter(item.label)}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-400 ${textBase}`}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      width="7" height="5" viewBox="0 0 7 5" fill="none"
                      className={`transition-transform duration-300 ${openMenu === item.label ? "rotate-180" : ""}`}
                    >
                      <path d="M1 1l2.5 2.5L6 1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-4 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.10)] min-w-[190px] py-2 z-50"
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-6 py-3 text-[12px] tracking-[0.1em] text-[#1a1a1a]/55 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-5">
            {/* Buy Tickets — desktop */}
            <Link
              href="/tickets"
              className={`hidden lg:inline-flex btn-cut text-[10px] py-2.5 px-6 ${isDark ? "btn-cut-light" : ""}`}
            >
              Buy Tickets
            </Link>

            {/* Cart */}
            <button aria-label="Cart" className={`relative transition-colors duration-400 ${iconBase}`}>
              <CartIcon />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#c5a47e] text-white text-[9px] flex items-center justify-center font-medium leading-none">
                0
              </span>
            </button>

            {/* Search */}
            <button aria-label="Search" className={`transition-colors duration-400 ${iconBase}`}>
              <SearchIcon />
            </button>

            {/* Hamburger — always visible (opens mobile menu; also acts as "more" on desktop) */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={`transition-colors duration-400 ${iconBase}`}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile / full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-[#f5f3ef]"
          >
            <div className="flex justify-between items-center px-8 h-[68px] border-b border-[#1a1a1a]/08">
              <span className="font-serif text-lg tracking-widest text-[#1a1a1a]/70">Sanzistry</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
                className="text-[#1a1a1a]/45 hover:text-[#1a1a1a] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="px-8 py-8 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[#1a1a1a]/07"
                >
                  <div
                    className="flex items-center justify-between py-4 cursor-pointer"
                    onClick={() =>
                      item.children
                        ? setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        : setMobileOpen(false)
                    }
                  >
                    <Link
                      href={item.href}
                      className="font-serif text-2xl font-light text-[#1a1a1a]/75 hover:text-[#1a1a1a] transition-colors"
                      onClick={() => !item.children && setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <svg
                        width="10" height="6" viewBox="0 0 10 6" fill="none"
                        className={`transition-transform duration-300 text-[#1a1a1a]/35 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.children && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden pl-4 pb-3"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-[13px] tracking-[0.1em] text-[#1a1a1a]/45 hover:text-[#1a1a1a] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="0" y1="1" x2="22" y2="1" />
      <line x1="5" y1="7" x2="22" y2="7" />
      <line x1="0" y1="13" x2="22" y2="13" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
