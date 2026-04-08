"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artist } from "@/data/artworks";

export default function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[#ede9e3] mb-5">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          className="transition-all duration-[1000ms] ease-out group-hover:scale-[1.04] grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <p className="text-white/65 text-[10px] tracking-[0.28em] uppercase">{artist.specialty}</p>
        </div>
      </div>
      <h3 className="font-serif text-[1.15rem] font-light leading-snug text-[#1a1a1a]/85">{artist.name}</h3>
      <p className="text-[12px] text-[#1a1a1a]/40 mt-2 leading-relaxed tracking-wide">{artist.bio}</p>
      <p className="text-[11px] text-[#c5a47e] mt-3 tracking-[0.15em]">{artist.works} works</p>
    </motion.article>
  );
}
