"use client";

import Link from "next/link";

const cols = {
  "Museum Info": ["About the Museum", "General Store", "Exhibitions", "News & Updates", "Buy Tickets"],
  "Opening Hours": ["Tue–Thu: 10am–6pm", "Fri–Sat: 10am–8pm", "Sun: 10am–5pm", "Mon: closed"],
  "Follow Us": ["Facebook", "Instagram", "Twitter"],
};

export default function Footer() {
  return (
    <footer className="bg-[#111110] text-white/50">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 pt-16 md:pt-20 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-14 pb-14 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 border border-white/20 flex items-center justify-center font-serif text-sm text-white/80">
                S
              </span>
              <span className="text-[10px] tracking-[0.32em] uppercase font-light text-white/55">
                Sanzistry
              </span>
            </div>
            <p className="text-[12px] leading-[1.85] text-white/30 mb-6 max-w-[220px]">
              673 12 Constitution Lane Massillion, 05765 New York
            </p>
            <p className="text-[12px] text-white/30 mb-1">01-382-4311, 301-461-9678</p>
            <p className="text-[12px] text-white/30">sanzistry@gallery.com</p>
            <p className="text-[11px] text-white/18 mt-6 tracking-wide">
              © {new Date().getFullYear()} Sanzistry. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-[10px] tracking-[0.38em] uppercase text-white/30 mb-5">{heading}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[12px] text-white/35 hover:text-white/70 transition-colors duration-300 tracking-wide"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/18 tracking-[0.12em]">
            Designed with care for the arts.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-300 tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
