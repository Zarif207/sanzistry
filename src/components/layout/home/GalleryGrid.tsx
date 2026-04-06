"use client";

import ArtworkCard from "./ArtworkCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { artworks } from "@/data/artworks";

export default function GalleryGrid() {
  return (
    <section id="gallery" className="max-w-[1400px] mx-auto px-8 md:px-12 py-28 md:py-36">
      <SectionHeader eyebrow="Collection" title="Current Works" linkLabel="View All" linkHref="/gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-14 md:gap-x-9 md:gap-y-18">
        {artworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
        ))}
      </div>
    </section>
  );
}
