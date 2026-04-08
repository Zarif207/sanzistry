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
    <section className="py-24 bg-[#f8f6f2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-serif italic text-[#c5a47e] text-sm mb-2">
            Museum news
          </p>

          <div className="flex items-center justify-center gap-6">
            <span className="w-24 h-px bg-black/10" />
            <h2 className="font-serif text-[28px] md:text-[36px] tracking-[0.3em] uppercase font-light">
              Latest Blog Posts
            </h2>
            <span className="w-24 h-px bg-black/10" />
          </div>
        </motion.div>

        {/* EDITORIAL LAYOUT */}
        <div className="grid md:grid-cols-3 gap-10 items-start">

          {posts.map((post, i) => {
            const isMiddle = i === 1;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative group 
                  ${i === 0 ? "mt-6" : ""}
                  ${i === 2 ? "mt-20" : ""}
                `}
              >

                {/* IMAGE */}
                <Link
                  href={post.href}
                  className={`block relative overflow-hidden bg-[#ede9e2] ${
                    isMiddle ? "h-[520px]" : "h-[380px]"
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                </Link>

                {/* FLOATING TEXT BOX */}
                <div
                  className={`absolute left-0 bg-[#f8f6f2] p-6 shadow-sm w-[85%]
                  ${isMiddle ? "-bottom-20 ml-8" : "-bottom-16 ml-4"}
                  `}
                >
                  <p className="font-serif italic text-[#c5a47e] text-[12px] mb-2">
                    {post.date}
                  </p>

                  <h3 className="font-serif text-[15px] uppercase tracking-wide mb-3 text-black/80">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>

                  <p className="text-[12px] text-black/50 leading-[1.7] mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={post.href}
                    className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-black/50 hover:text-black transition"
                  >
                    <span className="h-px w-6 bg-current group-hover:w-10 transition-all duration-300" />
                    Read More
                  </Link>
                </div>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
}