import Hero from "@/components/layout/home/Hero";
import GalleryGrid from "@/components/layout/home/GalleryGrid";
import Featured from "@/components/layout/home/Featured";
import ArtistSection from "@/components/layout/home/ArtistSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <GalleryGrid />
      <Featured />
      <ArtistSection />
    </main>
  );
}
