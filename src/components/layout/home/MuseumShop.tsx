"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, parsePrice } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useLoginModal } from "@/lib/loginModalContext";
import { shopItems } from "@/data/artworks";

// ── How many cards per page at each breakpoint ──────────────────────
// We handle this purely in CSS via grid; JS only tracks page index.
const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(shopItems.length / ITEMS_PER_PAGE);

// ── Star rating ──────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-center" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="10" height="10" viewBox="0 0 24 24"
          fill={s <= rating ? "#c5a47e" : "none"}
          stroke="#c5a47e"
          strokeWidth="1.4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ── Single product card ──────────────────────────────────────────────
function ProductCard({
  item,
  onAdd,
}: {
  item: (typeof shopItems)[0];
  onAdd: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="w-full cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image box ── */}
      <div className="relative overflow-hidden bg-[#eeebe5] w-full aspect-square mb-5">
        {/* Product image — no scale on hover, stays still */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        {/* White overlay — slides DOWN from top */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? "0%" : "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white/92 flex items-center justify-center"
          aria-hidden={!hovered}
        >
          {/* Add to cart button — fades in after overlay arrives */}
          <motion.button
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 8,
            }}
            transition={{ duration: 0.28, delay: hovered ? 0.18 : 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="
              border border-[#1a1a1a]/30
              px-9 py-3
              text-[11px] tracking-[0.24em] uppercase
              text-[#1a1a1a]/60
              bg-transparent
              hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]
              transition-all duration-300
            "
          >
            Add to cart
          </motion.button>
        </motion.div>
      </div>

      {/* ── Text info ── */}
      <h3 className="text-[11px] tracking-[0.24em] uppercase text-[#1a1a1a]/65 text-center mb-2 font-light">
        {item.title}
      </h3>
      <div className="flex justify-center mb-2">
        <Stars rating={item.rating} />
      </div>
      <p className="text-[13px] text-[#1a1a1a]/45 text-center tracking-wide">{item.price}</p>
    </article>
  );
}

// ── Main section ─────────────────────────────────────────────────────
export default function MuseumShop() {
  const [page, setPage] = useState(0);
  const { addItem, openDrawer } = useCart();
  const { user } = useAuth();
  const { requireAuth } = useLoginModal();

  const handleAdd = (item: (typeof shopItems)[0]) => {
    if (!user) { requireAuth(); return; }
    addItem({
      id: item.id + 1000,
      name: item.title,
      price: parsePrice(item.price),
      image: item.image,
    });
    openDrawer();
  };

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

  // Slice the items for the current page
  const visible = shopItems.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  return (
    <section className="py-20 md:py-28 bg-white">

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center px-6 mb-14"
      >
        <p className="font-serif italic text-[#c5a47e] text-[1rem] mb-3">Our products</p>

        <div className="flex items-center justify-center gap-6 mb-5">
          <span className="flex-1 max-w-[80px] sm:max-w-[160px] md:max-w-[220px] h-px bg-[#1a1a1a]/10" />
          <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light tracking-[0.28em] uppercase whitespace-nowrap">
            Museum Shop
          </h2>
          <span className="flex-1 max-w-[80px] sm:max-w-[160px] md:max-w-[220px] h-px bg-[#1a1a1a]/10" />
        </div>

        <p className="text-[13px] text-[#1a1a1a]/40 max-w-[480px] mx-auto leading-relaxed tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt labore et dolore magna aliqua
        </p>
      </motion.div>

      {/* ── Carousel ── */}
      <div className="relative px-10 md:px-16 lg:px-20">

        {/* Left arrow */}
        <button
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous page"
          className="absolute left-0 top-[38%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-[#1a1a1a]/35 hover:text-[#1a1a1a] disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M8 2L2 9l6 7" />
          </svg>
        </button>

        {/* Cards — AnimatePresence for smooth page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              >
                <ProductCard item={item} onAdd={() => handleAdd(item)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Right arrow */}
        <button
          onClick={next}
          disabled={page === TOTAL_PAGES - 1}
          aria-label="Next page"
          className="absolute right-0 top-[38%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-[#1a1a1a]/35 hover:text-[#1a1a1a] disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 2l6 7-6 7" />
          </svg>
        </button>
      </div>

      {/* ── Pagination dots ── */}
      <div className="flex justify-center gap-2.5 mt-10">
        {Array.from({ length: TOTAL_PAGES }).map((_, d) => (
          <button
            key={d}
            onClick={() => setPage(d)}
            aria-label={`Go to page ${d + 1}`}
            className={`transition-all duration-400 rounded-full ${
              page === d
                ? "w-5 h-1.5 bg-[#1a1a1a]"
                : "w-1.5 h-1.5 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
