import Hero from "@/components/layout/home/Hero";
import StorySection from "@/components/layout/home/StorySection";
import WorksOfArt from "@/components/layout/home/WorksOfArt";
import CurrentlyOnView from "@/components/layout/home/CurrentlyOnView";
import FeaturedBanner from "@/components/layout/home/FeaturedBanner";
import NewReadings from "@/components/layout/home/NewReadings";
import BlogSection from "@/components/layout/home/BlogSection";
import MuseumShop from "@/components/layout/home/MuseumShop";
import NewsletterSection from "@/components/layout/home/NewsletterSection";
import ContactSection from "@/components/layout/home/ContactSection";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Hero />
      <StorySection />
      <WorksOfArt />
      <CurrentlyOnView />
      <FeaturedBanner />
      <NewReadings />
      <BlogSection />
      <MuseumShop />
      <NewsletterSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  );
}
