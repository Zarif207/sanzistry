"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart, parsePrice } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useLoginModal } from "@/lib/loginModalContext";
import { shopItems } from "@/data/artworks";

// ── Stars ────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24"
          fill={s <= rating ? "#c5a47e" : "none"} stroke="#c5a47e" strokeWidth="1.4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ── Product card ─────────────────────────────────────────────────────
function ProductCard({ item, onAdd }: { item: (typeof shopItems)[0]; onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="w-full cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image box */}
      <div className="relative overflow-hidden bg-[#f4f4f4] w-full aspect-square mb-4">
        {/* Badge */}
        {item.badge && (
          <span className="absolute top-2.5 right-2.5 z-20 bg-[#c5a47e] text-white text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 font-light">
            {item.badge}
          </span>
        )}

        {/* Product image — contained, centered */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          style={{ objectFit: "contain", padding: "28px" }}
          loading="lazy"
        />

        {/* White overlay — slides DOWN from top */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? "0%" : "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white/95 flex items-center justify-center z-10"
        >
          <motion.button
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.28, delay: hovered ? 0.15 : 0 }}
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="border border-[#c5a47e] px-7 py-2.5 text-[11px] tracking-[0.22em] uppercase text-[#1a1a1a]/70 bg-transparent hover:bg-[#c5a47e] hover:text-white transition-all duration-300"
          >
            Add to cart
          </motion.button>
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="font-serif text-[11px] tracking-[0.28em] uppercase text-[#1a1a1a]/75 text-center mb-2 font-light">
        {item.title}
      </h3>
      <div className="flex justify-center mb-1.5">
        <Stars rating={item.rating} />
      </div>
      <div className="flex items-center justify-center gap-2">
        {item.originalPrice && (
          <span className="text-[12px] text-[#1a1a1a]/35 line-through">{item.originalPrice}</span>
        )}
        <span className="text-[13px] text-[#1a1a1a]/50 tracking-wide">{item.price}</span>
      </div>
    </article>
  );
}

// ── Main ─────────────────────────────────────────────────────────────
export default function MuseumShop() {
  // We clone the list at both ends for seamless infinite loop
  // Track index refers to position in the CLONED array
  const VISIBLE = 4;
  const items = shopItems;
  const N = items.length;

  // Build cloned array: [...last VISIBLE, ...all, ...first VISIBLE]
  const cloned = [
    ...items.slice(-VISIBLE),
    ...items,
    ...items.slice(0, VISIBLE),
  ];

  // Start at index VISIBLE (first real item)
  const [idx, setIdx] = useState(VISIBLE);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { addItem, openDrawer } = useCart();
  const { user } = useAuth();
  const { requireAuth } = useLoginModal();

  const handleAdd = (item: (typeof shopItems)[0]) => {
    if (!user) { requireAuth(); return; }
    addItem({ id: item.id + 1000, name: item.title, price: parsePrice(item.price), image: item.image });
    openDrawer();
  };

  // Move by one card
  const move = useCallback((dir: 1 | -1) => {
    if (transitioning) return;
    setTransitioning(true);
    setIdx((prev) => prev + dir);
  }, [transitioning]);

  // After transition ends, silently jump if we're in the clone zone
  const onTransitionEnd = useCallback(() => {
    setTransitioning(false);
    setIdx((prev) => {
      if (prev >= VISIBLE + N) return VISIBLE;          // jumped past end → reset to start
      if (prev < VISIBLE) return VISIBLE + N - 1;       // jumped before start → reset to end
      return prev;
    });
  }, [N]);

  // Auto-advance every 11s, pause on hover
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => move(1), 11000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paused, move]);

  // Dot index (0-based, relative to real items)
  const dotIdx = (idx - VISIBLE + N) % N;
  // How many dot groups (pages of VISIBLE)
  const dotCount = Math.ceil(N / VISIBLE);
  const activeDot = Math.floor(dotIdx / VISIBLE);

  // Track offset: each card is 25% of the track width (4 visible)
  // translateX = -idx * (100 / VISIBLE)%
  const translateX = -(idx * (100 / VISIBLE));

  return (
    <section className="py-16 md:py-24 bg-canvas">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center px-6 mb-12"
      >
        <p className="type-eyebrow mb-3">Our products</p>
        <div className="flex items-center justify-center gap-5 md:gap-8 mb-5">
          <span className="flex-1 max-w-20 sm:max-w-40 md:max-w-60 h-px bg-black/10" />
          <h2 className="type-heading text-[clamp(1.5rem,5vw,3rem)] whitespace-nowrap">
            Museum Shop
          </h2>
          <span className="flex-1 max-w-20 sm:max-w-40 md:max-w-60 h-px bg-black/10" />
        </div>
        <p className="type-body max-w-120 mx-auto text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt labore et dolore magna aliqua
        </p>
      </motion.div>

      {/* ── Slider ── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left arrow — outside grid */}
        <button
          onClick={() => move(-1)}
          aria-label="Previous"
          className="absolute left-3 md:left-8 top-[42%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:scale-110 transition-all duration-300"
        >
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M9 2L2 10l7 8" />
          </svg>
        </button>

        {/* Viewport — clips the track */}
        <div className="overflow-hidden mx-20 md:mx-28 lg:mx-36">
          {/* Track — width = cloned.length × (100/VISIBLE)% */}
          <div
            className="flex"
            style={{
              width: `${(cloned.length / VISIBLE) * 100}%`,
              transform: `translateX(${translateX / (cloned.length / VISIBLE)}%)`,
              transition: transitioning ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {cloned.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                style={{ width: `${100 / cloned.length}%` }}
                className="px-2 md:px-2.5"
              >
                <ProductCard item={item} onAdd={() => handleAdd(item)} />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow — outside grid */}
        <button
          onClick={() => move(1)}
          aria-label="Next"
          className="absolute right-3 md:right-8 top-[42%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:scale-110 transition-all duration-300"
        >
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M2 2l7 8-7 8" />
          </svg>
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center gap-2.5 mt-8">
        {Array.from({ length: dotCount }).map((_, d) => (
          <button
            key={d}
            onClick={() => { if (!transitioning) { setIdx(VISIBLE + d * VISIBLE); } }}
            aria-label={`Page ${d + 1}`}
            className={`transition-all duration-400 rounded-full ${
              activeDot === d
                ? "w-4 h-1.5 bg-[#1a1a1a]"
                : "w-1.5 h-1.5 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
