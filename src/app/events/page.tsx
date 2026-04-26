"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import Button from "@/components/ui/Button";

const events = [
  { id: 1, title: "Spring Exhibition Opening", date: "April 18, 2024", time: "6:00 PM – 9:00 PM", location: "Main Gallery, Floor 1", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=75", tag: "Opening Night" },
  { id: 2, title: "Artist Talk: Elena Vasquez", date: "April 25, 2024", time: "3:00 PM – 5:00 PM", location: "Lecture Hall", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=75", tag: "Talk" },
  { id: 3, title: "Collectors Evening", date: "May 3, 2024", time: "7:00 PM – 10:00 PM", location: "Private Viewing Room", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=75", tag: "Private" },
  { id: 4, title: "Workshop: Watercolor Techniques", date: "May 11, 2024", time: "10:00 AM – 1:00 PM", location: "Studio B", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=75", tag: "Workshop" },
];

export default function EventsPage() {
  return (
    <main className="pt-14 md:pt-26">
      <PageBanner
        title="Events"
        image="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920&q=75"
      />

      <div className="max-w-350 mx-auto px-8 md:px-12 py-20">
        <div className="space-y-0">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group grid md:grid-cols-[280px_1fr_auto] gap-8 items-center py-10 border-b border-[#1a1a1a]/08 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-[#ede9e3]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-1000 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div>
                <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] mb-3">
                  {event.tag}
                </span>
                <h3 className="font-serif text-2xl font-light mb-3 group-hover:text-[#1a1a1a]/65 transition-colors">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <p className="text-[12px] text-[#1a1a1a]/40 tracking-wide flex items-center gap-1.5">
                    <CalIcon /> {event.date}
                  </p>
                  <p className="text-[12px] text-[#1a1a1a]/40 tracking-wide flex items-center gap-1.5">
                    <ClockIcon /> {event.time}
                  </p>
                  <p className="text-[12px] text-[#1a1a1a]/40 tracking-wide flex items-center gap-1.5">
                    <PinIcon /> {event.location}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <Button href="/tickets">Buy Tickets</Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

function CalIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
}
function ClockIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
function PinIcon() {
  return <svg width="10" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
