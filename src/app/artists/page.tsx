"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import { artists, artworks } from "@/data/artworks";

export default function ArtistsPage() {
  return (
    <main className="pt-14 md:pt-26">
      <PageBanner
        title="Artists"
        image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=75"
      />

      <div className="max-w-350 mx-auto px-8 md:px-12 py-20">
        {/* Artist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-24">
          {artists.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-3/4 bg-[#ede9e3] mb-5">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  className="transition-all duration-1000 group-hover:scale-[1.04] grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white/65 text-[10px] tracking-[0.28em] uppercase">{artist.specialty}</p>
                </div>
              </div>
              <h3 className="font-serif text-[1.15rem] font-light text-[#1a1a1a]/85">{artist.name}</h3>
              <p className="text-[12px] text-[#1a1a1a]/40 mt-2 leading-relaxed">{artist.bio}</p>
              <p className="text-[11px] text-[#c8a97e] mt-3 tracking-[0.15em]">{artist.works} works</p>
            </motion.article>
          ))}
        </div>

        {/* Works by artists */}
        <div className="border-t border-[#1a1a1a]/08 pt-20">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-3">Selected</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light mb-2">Works</h2>
          <div className="w-8 h-px bg-[#c8a97e] mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-12">
            {artworks.slice(0, 6).map((artwork, i) => (
              <motion.article
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-4/3 bg-[#ede9e3]">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-1000 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />
                </div>
                <div className="pt-4">
                  <h3 className="text-[13px] font-light text-[#1a1a1a]/75">{artwork.title}</h3>
                  <p className="text-[11px] text-[#1a1a1a]/35 mt-1">{artwork.artist} · {artwork.year}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
