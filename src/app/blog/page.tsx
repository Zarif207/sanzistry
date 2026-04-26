"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";

const posts = [
  { id: 1, title: "The Language of Light in Contemporary Painting", date: "March 12, 2024", category: "Exhibition", excerpt: "How modern painters are reinterpreting the classical use of light to create emotional depth and narrative tension.", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=75" },
  { id: 2, title: "Collecting Art: A Beginner's Guide", date: "February 28, 2024", category: "Guide", excerpt: "Everything you need to know before purchasing your first piece — from authentication to framing and insurance.", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=75" },
  { id: 3, title: "Artist Spotlight: Aisha Nkosi", date: "February 10, 2024", category: "Artist", excerpt: "We sit down with Lagos-born mixed media artist Aisha Nkosi to discuss her latest series and creative process.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=75" },
  { id: 4, title: "The Rise of Digital Art in Physical Galleries", date: "January 22, 2024", category: "Trends", excerpt: "How galleries worldwide are integrating digital and NFT works into traditional exhibition spaces.", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=75" },
  { id: 5, title: "Behind the Curation: Spring Exhibition 2024", date: "January 8, 2024", category: "Exhibition", excerpt: "Our chief curator walks us through the selection process for this season's most anticipated show.", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=75" },
  { id: 6, title: "Art as Investment: What the Data Shows", date: "December 15, 2023", category: "Guide", excerpt: "A data-driven look at how fine art has performed as an asset class over the past two decades.", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=75" },
];

export default function BlogPage() {
  return (
    <main className="pt-14 md:pt-26">
      <PageBanner
        title="Blog"
        image="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&q=75"
      />

      <div className="max-w-350 mx-auto px-8 md:px-12 py-20">
        {/* Featured post */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="group grid md:grid-cols-2 gap-10 mb-20 pb-20 border-b border-[#1a1a1a]/08 cursor-pointer"
        >
          <div className="relative overflow-hidden aspect-16/10 bg-[#ede9e3]">
            <Image
              src={posts[0].image}
              alt={posts[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-1000 group-hover:scale-[1.04]"
              loading="eager"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c8a97e] mb-3">{posts[0].category}</p>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-snug mb-5 group-hover:text-[#1a1a1a]/70 transition-colors">
              {posts[0].title}
            </h2>
            <p className="text-[13px] text-[#1a1a1a]/45 leading-[1.85] mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center gap-4">
              <p className="text-[11px] text-[#1a1a1a]/30 tracking-wide">{posts[0].date}</p>
              <span className="text-[#1a1a1a]/20">·</span>
              <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors">
                Read more →
              </a>
            </div>
          </div>
        </motion.article>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
          {posts.slice(1).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-16/10 bg-[#ede9e3] mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-1000 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#c8a97e] mb-2">{post.category}</p>
              <h3 className="font-serif text-xl font-light leading-snug mb-3 group-hover:text-[#1a1a1a]/65 transition-colors">
                {post.title}
              </h3>
              <p className="text-[12px] text-[#1a1a1a]/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <p className="text-[11px] text-[#1a1a1a]/30 tracking-wide">{post.date}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
