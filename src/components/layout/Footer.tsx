"use client";

import Link from "next/link";

const footerLinks = {
  Gallery: ["Current Works", "Featured", "Archive", "Shop"],
  Artists: ["All Artists", "Submit Work", "Residency", "Press"],
  Visit: ["Opening Hours", "Location", "Accessibility", "FAQ"],
};

const socials = [
  { label: "Facebook", abbr: "Fb" },
  { label: "Instagram", abbr: "Ig" },
  { label: "Twitter", abbr: "Tw" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60">

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-10 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-9 h-9 border border-white/20 flex items-center justify-center font-serif text-sm text-white">
                S
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase font-light text-white/70">
                Sanzistry
              </span>
            </div>
            <p className="text-[13px] leading-[1.85] text-white/35 max-w-[260px] mb-8">
              A curated space where artists showcase and sell their finest creations to collectors worldwide.
            </p>
            <div className="space-y-2 text-[12px] text-white/30 mb-8">
              <p>1611 Linden Avenue 407, New York</p>
              <p>Open Tue – Sun: 09am – 07pm</p>
              <p>01-382-4311</p>
            </div>
            <div className="flex gap-5">
              {socials.map(({ label, abbr }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white transition-colors duration-400"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] tracking-[0.38em] uppercase text-white/30 mb-6">
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-400 tracking-wide"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/08 pt-12 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-1.5">Newsletter</p>
            <p className="font-serif text-lg font-light text-white/60">Stay informed on new works.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-stretch w-full sm:w-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              className="flex-1 sm:w-60 bg-white/05 border border-white/10 px-5 py-3 text-[12px] text-white/60 placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-colors"
            />
            <button
              type="submit"
              className="border border-l-0 border-white/10 px-7 py-3 text-[11px] tracking-[0.22em] uppercase text-white/40 hover:bg-white hover:text-[#1a1a1a] hover:border-white transition-all duration-500"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/08 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-[0.12em]">
            © {new Date().getFullYear()} Sanzistry. All rights reserved.
          </p>
          <div className="flex gap-7">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-400 tracking-[0.12em]"
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
