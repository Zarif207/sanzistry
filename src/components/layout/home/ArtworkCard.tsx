"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[#ede9e3]">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/48 transition-all duration-700 ease-out" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-2">{artwork.category}</p>
            <h3 className="text-white font-serif text-xl font-light leading-snug mb-1">{artwork.title}</h3>
            <p className="text-white/55 text-xs tracking-wide">{artwork.artist}</p>
            {artwork.price && (
              <p className="text-[#c8a97e] text-xs mt-3 tracking-[0.15em]">{artwork.price}</p>
            )}
          </div>
        </div>
      </div>
      <div className="pt-4 pb-1">
        <h3 className="text-[13px] font-light tracking-[0.05em] text-[#1a1a1a]/75">{artwork.title}</h3>
        <p className="text-[11px] text-[#1a1a1a]/35 mt-1 tracking-wide">{artwork.artist}&ensp;·&ensp;{artwork.year}</p>
      </div>
    </motion.article>
  );
}
