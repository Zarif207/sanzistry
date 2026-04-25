"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=75",
    eyebrow: "History of art department",
    title: "MODERN CLASSICS",
    href: "/gallery",
  },
  {
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&q=75",
    eyebrow: "New collection 2024",
    title: "NEW EXHIBITION",
    href: "/gallery",
  },
  {
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1920&q=75",
    eyebrow: "Featured artists",
    title: "SILENT FORMS",
    href: "/artists",
  },
  {
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=75",
    eyebrow: "Curated selection",
    title: "GOLDEN AGE",
    href: "/gallery",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pan animation on active slide image
  const startPan = useCallback((idx: number) => {
    const el = imageRefs.current[idx];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scale: 1.12, x: "-2%", y: "-1%" },
      { scale: 1.06, x: "0%", y: "0%", duration: 8, ease: "none" }
    );
  }, []);

  // Text entrance animation
  const animateText = useCallback(() => {
    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);

    // Fade out text
    gsap.to([eyebrowRef.current, titleRef.current, ctaRef.current], {
      opacity: 0, y: -10, duration: 0.35, ease: "power2.in",
      onComplete: () => {
        setCurrent(idx);
        setAnimating(false);
      },
    });
  }, [animating, current]);

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // On slide change: pan + text
  useEffect(() => {
    startPan(current);
    animateText();
  }, [current, startPan, animateText]);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const slide = slides[current];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-150 overflow-hidden flex items-center justify-center"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <div
            ref={(el) => { imageRefs.current[i] = el; }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              preload={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-linear-to-b from-black/40 via-black/30 to-black/55 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 text-center text-white px-6 max-w-5xl mx-auto">
        <p
          ref={eyebrowRef}
          className="font-serif italic text-white/70 text-lg sm:text-xl mb-5 opacity-0"
          style={{ fontStyle: "italic" }}
        >
          {slide.eyebrow}
        </p>

        {/* Title with flanking lines */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8">
          <span className="flex-1 max-w-20 sm:max-w-35 h-px bg-white/30" />
          <h1
            ref={titleRef}
            className="font-serif text-[clamp(2.8rem,8vw,6.5rem)] tracking-[0.22em] leading-none opacity-0"
            style={{ fontWeight: 300 }}
          >
            {slide.title}
          </h1>
          <span className="flex-1 max-w-20 sm:max-w-35 h-px bg-white/30" />
        </div>

        <div ref={ctaRef} className="opacity-0">
          <a href={slide.href} className="btn-musea btn-musea-light">
            <span>View more</span>
          </a>
        </div>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-white transition-colors duration-300 group"
      >
        <span className="flex items-center justify-center w-10 h-10 border border-white/30 group-hover:border-white/70 transition-colors duration-300">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 2L4 7l5 5" />
          </svg>
        </span>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-white transition-colors duration-300 group"
      >
        <span className="flex items-center justify-center w-10 h-10 border border-white/30 group-hover:border-white/70 transition-colors duration-300">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 2l5 5-5 5" />
          </svg>
        </span>
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
