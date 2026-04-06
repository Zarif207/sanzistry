"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import { shopItems, featuredArtworks } from "@/data/artworks";
import { useCart, parsePrice } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useLoginModal } from "@/lib/loginModalContext";

const categories = ["All", "Books", "Prints", "Accessories", "Objects"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24"
          fill={s <= rating ? "#c5a47e" : "none"} stroke="#c5a47e" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const { addItem, openDrawer } = useCart();
  const { user } = useAuth();
  const { requireAuth } = useLoginModal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceMax, setPriceMax] = useState(100);

  const filtered = shopItems.filter((item) => {
    const price = parsePrice(item.price);
    return (activeCategory === "All" || item.category === activeCategory) && price <= priceMax;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sort === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  const handleAdd = (item: typeof shopItems[0]) => {
    if (!user) { requireAuth(); return; }
    addItem({ id: item.id + 1000, name: item.title, price: parsePrice(item.price), image: item.image });
    openDrawer();
  };

  return (
    <main className="pt-14 md:pt-[104px]">
      <PageBanner
        title="Shop"
        image="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1920&q=75"
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-16">
        <div className="flex flex-col md:flex-row gap-12">

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-10 pb-5 border-b border-[#1a1a1a]/08">
              <p className="text-[12px] text-[#1a1a1a]/40 tracking-wide">
                Showing 1–{sorted.length} of {sorted.length} results
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-[12px] tracking-wide text-[#1a1a1a]/60 border border-[#1a1a1a]/15 px-4 py-2 bg-transparent focus:outline-none focus:border-[#1a1a1a]/40 transition-colors"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
              {sorted.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-square bg-[#ede9e3] mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-[900ms] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <button
                        onClick={() => handleAdd(item)}
                        className="btn-cut btn-cut-light text-[10px] py-2.5 px-6"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="text-[12px] tracking-[0.15em] uppercase text-[#1a1a1a]/70 text-center mb-1.5">
                    {item.title}
                  </h3>
                  <div className="flex justify-center mb-1.5">
                    <StarRating rating={item.rating} />
                  </div>
                  <p className="text-[13px] text-[#1a1a1a]/50 text-center tracking-wide">{item.price}</p>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-[260px] flex-shrink-0">
            <div className="mb-10">
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#1a1a1a]/50 mb-5">Filter</h3>
              <div className="w-full h-px bg-[#1a1a1a]/10 mb-5" />
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] tracking-[0.15em] uppercase px-4 py-1.5 border transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-[#1a1a1a] text-[#f5f3ef] border-[#1a1a1a]"
                        : "border-[#1a1a1a]/20 text-[#1a1a1a]/45 hover:border-[#1a1a1a]/50 hover:text-[#1a1a1a]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 mb-3">
                  Price: 0$ — {priceMax}$
                </p>
                <input
                  type="range" min={10} max={100} value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#c5a47e]"
                />
              </div>
            </div>

            <div>
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#1a1a1a]/50 mb-5">Featured</h3>
              <div className="w-full h-px bg-[#1a1a1a]/10 mb-5" />
              <div className="space-y-4">
                {featuredArtworks.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-3 group cursor-pointer">
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-[#ede9e3]">
                      <Image src={item.image} alt={item.title} fill sizes="64px"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 group-hover:scale-[1.08]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[12px] font-light text-[#1a1a1a]/70 group-hover:text-[#1a1a1a] transition-colors leading-snug">
                        {item.title}
                      </p>
                      {item.price && (
                        <p className="text-[11px] text-[#c5a47e] mt-1 tracking-wide">{item.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
