"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    date: "September 15, 2019",
    title: "November in the Museum",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    href: "/blog",
  },
  {
    id: 2,
    date: "September 15, 2019",
    title: "Paul Cézanne Skill Show",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=80",
    href: "/blog",
  },
  {
    id: 3,
    date: "September 15, 2019",
    title: "The Street Painting Scene",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80",
    href: "/blog",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 md:py-40 bg-[#f8f6f2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <p className="font-serif italic text-[#c5a47e] text-[1rem] mb-4">
            Museum news
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-14">
            <span className="flex-1 max-w-[200px] h-px bg-black/10" />
            <h2 className="font-serif text-[clamp(1.5rem,5vw,3rem)] tracking-[0.34em] uppercase font-light whitespace-nowrap">
              Latest Blog Posts
            </h2>
            <span className="flex-1 max-w-[200px] h-px bg-black/10" />
          </div>
        </motion.div>

        {/* EDITORIAL ASYMMETRIC LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 items-start">

          {posts.map((post, i) => {
            const isMiddle = i === 1;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`relative group 
                  ${i === 0 ? "md:mt-16" : ""}
                  ${i === 2 ? "md:mt-32" : ""}
                `}
              >

                {/* IMAGE */}
                <Link
                  href={post.href}
                  className={`block relative overflow-hidden bg-[#ede9e2] w-full
                    ${isMiddle ? "aspect-[3/4.5]" : "aspect-[3/4]"}
                  `}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </Link>

                {/* OVERLAPPING FLOATING TEXT BOX */}
                <div
                  className={`absolute left-0 bottom-[-15%] md:bottom-[-20%] bg-white p-8 md:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.08)] w-[90%] md:w-[95%] z-10
                    ${isMiddle ? "ml-8" : "ml-4"}
                  `}
                >
                  <p className="font-serif italic text-[#c5a47e] text-[13px] mb-4">
                    {post.date}
                  </p>

                  <h3 className="font-serif text-[1.1rem] md:text-[1.3rem] uppercase tracking-[0.1em] mb-6 text-[#1a1a1a] leading-tight group-hover:text-[#c5a47e] transition-colors duration-300">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>

                  <p className="text-[14px] text-black/45 leading-[1.8] mb-8 font-light">
                    {post.excerpt}
                  </p>

                  <Link
                    href={post.href}
                    className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-all duration-300 group/link"
                  >
                    <span className="h-px w-8 bg-[#1a1a1a]/20 group-hover/link:w-14 group-hover/link:bg-[#1a1a1a] transition-all duration-500" />
                    Read More
                  </Link>
                </div>

              </motion.article>
            );
          })}

        </div>

        {/* Extra spacing at bottom due to overlapping boxes */}
        <div className="h-40 md:h-64" />

      </div>
    </section>
  );
}