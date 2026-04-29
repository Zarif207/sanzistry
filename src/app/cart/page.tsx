"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cartContext";

export default function CartPage() {
  const { items, removeItem, setQty, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState("free");

  const shippingCost = shipping === "express" ? 15 : shipping === "standard" ? 8 : 0;
  const total = subtotal + shippingCost;

  return (
    <main className="pt-14 md:pt-26 min-h-screen">
      {/* Page title */}
      <div className="border-b border-[#1a1a1a]/08 bg-[#f5f3ef]">
        <div className="max-w-350 mx-auto px-8 md:px-12 py-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-2">Your Selection</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.12em]">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-8 md:px-12 py-14">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-6 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c5a47e" strokeWidth="1.1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="font-serif text-2xl font-light text-[#1a1a1a]/50">Your cart is empty</p>
            <Link href="/shop" className="btn-cut">Browse Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* ── Cart table ── */}
            <div className="flex-1 min-w-0">
              {/* Table header — desktop */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#1a1a1a]/10 mb-2">
                {["Product", "Price", "Quantity", "Subtotal", ""].map((h) => (
                  <p key={h} className="text-[10px] tracking-[0.35em] uppercase text-[#1a1a1a]/35">{h}</p>
                ))}
              </div>

              {/* Rows */}
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-[#1a1a1a]/07"
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0 bg-[#ede9e3] overflow-hidden">
                      <Image src={item.image} alt={item.name} fill sizes="64px" style={{ objectFit: "cover" }} />
                    </div>
                    <p className="text-[13px] tracking-[0.08em] text-[#1a1a1a]/75 leading-snug">{item.name}</p>
                  </div>

                  {/* Price */}
                  <p className="text-[13px] text-[#1a1a1a]/55 tracking-wide">
                    <span className="md:hidden text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/30 mr-2">Price:</span>
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Qty */}
                  <div className="flex items-center">
                    <span className="md:hidden text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/30 mr-3">Qty:</span>
                    <div className="flex items-center border border-[#1a1a1a]/12">
                      <button
                        onClick={() => setQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors"
                      >−</button>
                      <span className="w-9 text-center text-[13px] font-light">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-[#f5f3ef] transition-colors"
                      >+</button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <p className="text-[13px] text-[#1a1a1a]/75 tracking-wide font-light">
                    <span className="md:hidden text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/30 mr-2">Subtotal:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove"
                    className="text-[#1a1a1a]/25 hover:text-[#1a1a1a]/60 transition-colors justify-self-end"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </motion.div>
              ))}

              {/* Coupon */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 border border-[#1a1a1a]/15 px-5 py-3 text-[12px] tracking-wide text-[#1a1a1a]/60 placeholder:text-[#1a1a1a]/25 bg-transparent focus:outline-none focus:border-[#c5a47e] transition-colors"
                />
                <button className="btn-cut whitespace-nowrap">Apply Coupon</button>
              </div>
            </div>

            {/* ── Cart totals ── */}
            <div className="w-full lg:w-85 shrink-0">
              <div className="bg-white p-8 border border-[#1a1a1a]/07">
                <h2 className="font-serif text-xl font-light tracking-wide mb-6 pb-5 border-b border-[#1a1a1a]/08">
                  Cart Totals
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/45">Subtotal</span>
                    <span className="text-[14px] font-light text-[#1a1a1a]">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping options */}
                  <div className="border-t border-[#1a1a1a]/07 pt-4">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/45 mb-3">Shipping</p>
                    <div className="space-y-2">
                      {[
                        { id: "free", label: "Free shipping", cost: "Free" },
                        { id: "standard", label: "Standard (3–5 days)", cost: "$8.00" },
                        { id: "express", label: "Express (1–2 days)", cost: "$15.00" },
                      ].map((opt) => (
                        <label key={opt.id} className="flex items-center justify-between cursor-pointer group">
                          <span className="flex items-center gap-2.5">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                              shipping === opt.id ? "border-[#c5a47e]" : "border-[#1a1a1a]/20"
                            }`}>
                              {shipping === opt.id && <span className="w-2 h-2 rounded-full bg-[#c5a47e]" />}
                            </span>
                            <input
                              type="radio"
                              name="shipping"
                              value={opt.id}
                              checked={shipping === opt.id}
                              onChange={() => setShipping(opt.id)}
                              className="sr-only"
                            />
                            <span className="text-[12px] text-[#1a1a1a]/55 tracking-wide">{opt.label}</span>
                          </span>
                          <span className="text-[12px] text-[#1a1a1a]/55">{opt.cost}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#1a1a1a]/07 pt-4 flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/70 font-medium">Total</span>
                    <span className="font-serif text-2xl font-light text-[#1a1a1a]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn-cut w-full justify-center">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
