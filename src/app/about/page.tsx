"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import Button from "@/components/ui/Button";

const stats = [
  { value: "1,200+", label: "Artworks" },
  { value: "80+", label: "Artists" },
  { value: "15", label: "Years" },
  { value: "40k+", label: "Visitors / year" },
];

export default function AboutPage() {
  return (
    <main className="pt-14 md:pt-[104px]">
      <PageBanner
        title="About"
        image="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1920&q=75"
      />

      {/* Mission */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-4">Our Story</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-snug mb-6">
              A Space for Art<br />and Imagination
            </h2>
            <div className="w-8 h-px bg-[#c8a97e] mb-8" />
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] mb-5">
              Sanzistry was founded with a singular vision: to create a space where art transcends boundaries and speaks directly to the human experience. Since 2009, we have championed emerging and established artists from around the world.
            </p>
            <p className="text-[14px] text-[#1a1a1a]/55 leading-[1.9] mb-10">
              Our curated exhibitions bring together works that challenge, inspire, and provoke — creating dialogues between cultures, eras, and mediums.
            </p>
            <Button href="/gallery">Explore Gallery</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=900&q=75"
              alt="Gallery interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</p>
                <p className="text-[11px] tracking-[0.3em] uppercase text-white/35">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-32">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-3">People</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light mb-2">Our Team</h2>
        <div className="w-8 h-px bg-[#c8a97e] mb-14" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {[
            { name: "Clara Hoffmann", role: "Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=75" },
            { name: "James Okafor", role: "Chief Curator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75" },
            { name: "Mei Lin", role: "Head of Events", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=75" },
          ].map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-[#ede9e3] mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  className="transition-transform duration-[1000ms] group-hover:scale-[1.04] grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-lg font-light text-[#1a1a1a]/85">{member.name}</h3>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#c8a97e] mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
