"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart, parsePrice } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useLoginModal } from "@/lib/loginModalContext";
import { shopItems } from "@/data/artworks";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24"
          fill={s <= rating ? "#c5a47e" : "none"} stroke="#c5a47e" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function BestSelling() {
  const { addItem, openDrawer } = useCart();
  const { user } = useAuth();
  const { requireAuth } = useLoginModal();

  const handleAdd = (item: typeof shopItems[0]) => {
    if (!user) { requireAuth(); return; }
    addItem({
      id: item.id + 1000,
      name: item.title,
      price: parsePrice(item.price),
      image: item.image,
    });
    openDrawer();
  };

  return (
    <section className="py-24 md:py-32 bg-[#f5f3ef]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">

        {/* Section header — centered with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="font-serif italic text-[#c5a47e] text-base mb-3">From our store</p>
          <div className="flex items-center justify-center gap-5">
            <span className="flex-1 max-w-[80px] md:max-w-[140px] h-px bg-[#1a1a1a]/12" />
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light tracking-[0.28em] uppercase">
              Best Selling
            </h2>
            <span className="flex-1 max-w-[80px] md:max-w-[140px] h-px bg-[#1a1a1a]/12" />
          </div>
          <div className="w-8 h-px bg-[#c5a47e] mx-auto mt-5" />
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {shopItems.slice(0, 4).map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square bg-[#ede9e3] mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                {/* Hover overlay with Add to Cart */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-600" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn-cut btn-cut-light text-[10px] py-2.5 px-6"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-[12px] tracking-[0.15em] uppercase text-[#1a1a1a]/70 text-center mb-1.5">
                {item.title}
              </h3>
              <div className="flex justify-center mb-1.5">
                <Stars rating={item.rating} />
              </div>
              <p className="text-[13px] text-[#1a1a1a]/50 text-center tracking-wide">{item.price}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
