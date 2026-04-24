"use client";

import ArtistCard from "./ArtistCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { artists } from "@/data/artworks";

export default function ArtistSection() {
  return (
    <section id="artists" className="max-w-350 mx-auto px-8 md:px-12 py-28 md:py-36">
      <SectionHeader eyebrow="Creators" title="The Artists" linkLabel="All Artists" linkHref="/artists" align="center" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 md:gap-x-10">
        {artists.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} index={i} />
        ))}
      </div>
    </section>
  );
}
