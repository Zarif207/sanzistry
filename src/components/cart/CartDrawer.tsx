"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useLoginModal } from "@/lib/loginModalContext";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, setQty, subtotal } = useCart();
  const { user } = useAuth();
  const { requireAuth } = useLoginModal();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-black/25"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[400] w-full sm:w-[420px] bg-white flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-[#1a1a1a]/08">
              <h2 className="font-serif text-xl font-light tracking-wide text-[#1a1a1a]">
                Your Cart
                {items.length > 0 && (
                  <span className="ml-2 text-[13px] text-[#1a1a1a]/35 font-sans font-light">
                    ({items.length})
                  </span>
                )}
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c5a47e" strokeWidth="1.2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p className="text-[13px] text-[#1a1a1a]/40 tracking-wide">Your cart is empty</p>
                  <button onClick={closeDrawer} className="btn-cut text-[10px] py-2.5 px-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#1a1a1a]/06 last:border-0">
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#ede9e3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] tracking-[0.1em] uppercase text-[#1a1a1a]/75 leading-snug mb-1 truncate">
                          {item.name}
                        </p>
                        <p className="text-[12px] text-[#c5a47e] tracking-wide mb-3">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Qty control */}
                        <div className="flex items-center gap-0 border border-[#1a1a1a]/12 w-fit">
                          <button
                            onClick={() => setQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1a1a1a]/45 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[12px] font-light text-[#1a1a1a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1a1a1a]/45 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-[#1a1a1a]/25 hover:text-[#1a1a1a]/60 transition-colors flex-shrink-0 self-start mt-0.5"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-6 border-t border-[#1a1a1a]/08 bg-[#faf9f7]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/45">Subtotal</span>
                  <span className="font-serif text-xl font-light text-[#1a1a1a]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {user ? (
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="btn-cut w-full justify-center block text-center"
                  >
                    View Cart &amp; Checkout
                  </Link>
                ) : (
                  <button
                    onClick={() => { closeDrawer(); requireAuth(); }}
                    className="btn-cut w-full justify-center"
                  >
                    View Cart &amp; Checkout
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
