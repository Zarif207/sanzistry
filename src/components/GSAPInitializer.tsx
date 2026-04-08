"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPInitializer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle global scroll settings
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });

    // Optional: Global parallax for all elements with data-speed
    const parallaxElements = document.querySelectorAll("[data-speed]");
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed") || "0");
      gsap.to(el, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
