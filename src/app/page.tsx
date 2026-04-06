import Hero from "@/components/layout/home/Hero";
import StorySection from "@/components/layout/home/StorySection";
import WorksOfArt from "@/components/layout/home/WorksOfArt";
import BestSelling from "@/components/layout/home/BestSelling";
import CurrentlyOnView from "@/components/layout/home/CurrentlyOnView";
import GalleryGrid from "@/components/layout/home/GalleryGrid";
import FeaturedBanner from "@/components/layout/home/FeaturedBanner";
import Featured from "@/components/layout/home/Featured";
import ArtistSection from "@/components/layout/home/ArtistSection";
import ContactSection from "@/components/layout/home/ContactSection";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Hero />
      <StorySection />
      <WorksOfArt />
      <BestSelling />
      <CurrentlyOnView />
      <GalleryGrid />
      <FeaturedBanner />
      <Featured />
      <ArtistSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  );
}
