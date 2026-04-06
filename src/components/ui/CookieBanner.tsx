"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "sanzistry_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash immediately on load
    const timer = setTimeout(() => {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const respond = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] w-[calc(100%-2rem)] max-w-[680px]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-white border border-[#e8e4de] rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.07)] px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#1a1a1a]/60 leading-relaxed tracking-wide">
                  This website uses cookies to enhance your browsing experience and personalise content.{" "}
                  <Link
                    href="#"
                    className="text-[#c5a47e] hover:text-[#a8895e] transition-colors underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => respond("rejected")}
                  className="text-[11px] tracking-[0.18em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-300 px-1"
                >
                  Reject
                </button>
                <button
                  onClick={() => respond("accepted")}
                  className="btn-cut text-[10px] py-2.5 px-6"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
