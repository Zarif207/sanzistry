"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import { artworks, featuredArtworks } from "@/data/artworks";

const all = [...artworks, ...featuredArtworks];
const categories = ["All", ...Array.from(new Set(all.map((a) => a.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? all : all.filter((a) => a.category === active);

  return (
    <main className="pt-14 md:pt-[104px]">
      <PageBanner
        title="Gallery"
        image="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=75"
      />

      <div className="max-w-350 mx-auto px-8 md:px-12 py-20">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[11px] tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-400 ${
                active === cat
                  ? "bg-[#1a1a1a] text-[#f5f3ef] border-[#1a1a1a]"
                  : "border-[#1a1a1a]/20 text-[#1a1a1a]/50 hover:border-[#1a1a1a]/50 hover:text-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-14">
          {filtered.map((artwork, i) => (
            <motion.article
              key={artwork.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-3/4 bg-[#ede9e3]">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-1000 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-700" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1.5">{artwork.category}</p>
                    <h3 className="text-white font-serif text-xl font-light">{artwork.title}</h3>
                    <p className="text-white/55 text-xs mt-1">{artwork.artist}</p>
                    {artwork.price && <p className="text-[#c8a97e] text-xs mt-2.5 tracking-[0.15em]">{artwork.price}</p>}
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-[13px] font-light tracking-[0.05em] text-[#1a1a1a]/75">{artwork.title}</h3>
                <p className="text-[11px] text-[#1a1a1a]/35 mt-1">{artwork.artist} · {artwork.year}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
