"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginModal } from "@/lib/loginModalContext";

export default function LoginModal() {
  const { isOpen, close } = useLoginModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[600] bg-black/20 backdrop-blur-[2px]"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[700] flex items-center justify-center px-5 pointer-events-none"
          >
            <div className="bg-white w-full max-w-[400px] px-10 py-12 relative pointer-events-auto shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
              {/* Close */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Gold accent line */}
              <div className="w-8 h-px bg-[#c5a47e] mb-7" />

              {/* Content */}
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-2">
                Members only
              </p>
              <h2 className="font-serif text-[1.9rem] font-light leading-snug mb-3">
                Login Required
              </h2>
              <p className="text-[13px] text-[#1a1a1a]/45 leading-relaxed tracking-wide mb-8">
                Please sign in to continue your experience with Sanzistry.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={close}
                  className="btn-cut w-full justify-center block text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={close}
                  className="block text-center text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/45 hover:text-[#1a1a1a] transition-colors duration-300 py-2"
                >
                  Create Account
                </Link>
                <button
                  onClick={close}
                  className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/25 hover:text-[#1a1a1a]/45 transition-colors duration-300 py-1"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
