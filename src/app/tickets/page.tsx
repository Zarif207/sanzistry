"use client";

import { useState } from "react";
import PageBanner from "@/components/ui/PageBanner";
import Button from "@/components/ui/Button";

const ticketTypes = [
  { id: "adult", label: "Adult", price: 18, desc: "General admission" },
  { id: "student", label: "Student", price: 10, desc: "Valid ID required" },
  { id: "senior", label: "Senior (65+)", price: 12, desc: "Valid ID required" },
  { id: "family", label: "Family (2+2)", price: 42, desc: "2 adults + 2 children" },
];

export default function TicketsPage() {
  const [selected, setSelected] = useState("adult");
  const [qty, setQty] = useState(1);
  const ticket = ticketTypes.find((t) => t.id === selected)!;

  return (
    <main className="pt-14 md:pt-[104px]">
      <PageBanner
        title="Buy Tickets"
        image="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1920&q=75"
      />

      <div className="max-w-[800px] mx-auto px-8 md:px-12 py-20">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-3">Admission</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light mb-2">Select Tickets</h2>
        <div className="w-8 h-px bg-[#c8a97e] mb-12" />

        {/* Ticket type selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {ticketTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`text-left p-6 border transition-all duration-400 ${
                selected === t.id
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-[#f5f3ef]"
                  : "border-[#1a1a1a]/15 hover:border-[#1a1a1a]/40 text-[#1a1a1a]"
              }`}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase mb-1 opacity-60">{t.desc}</p>
              <p className="font-serif text-xl font-light">{t.label}</p>
              <p className={`text-lg mt-2 ${selected === t.id ? "text-[#c8a97e]" : "text-[#c8a97e]"}`}>
                ${t.price}
              </p>
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-[#1a1a1a]/08">
          <p className="text-[12px] tracking-[0.15em] uppercase text-[#1a1a1a]/50">Quantity</p>
          <div className="flex items-center border border-[#1a1a1a]/15">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/05 transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center text-[14px] font-light">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/05 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[12px] text-[#1a1a1a]/40 tracking-wide">
              {qty} × {ticket.label}
            </p>
            <p className="font-serif text-3xl font-light mt-1">${ticket.price * qty}</p>
          </div>
          <Button href="#">Proceed to Checkout</Button>
        </div>
      </div>
    </main>
  );
}
