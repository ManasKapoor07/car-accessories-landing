import { useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../redux/api/products.api";
import { Link } from "react-router-dom";

const BrowseProducts = () => {
  const [getprod, { data, isLoading }] = useLazyGetProductsQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getprod({});
  }, [getprod]);

  const categories = ["All", ...new Set(data?.map((p) => p.category) || [])];

  const filteredProducts = data?.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-400 selection:bg-blue-500/30 font-sans">
      {/* 1. HERO HEADER */}
      <header className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <span className="w-10 h-[1px] bg-blue-600"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">
              Official Inventory
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4">
            The{" "}
            <span className="text-zinc-600 italic font-light">Catalogue.</span>
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm md:text-base leading-relaxed">
            Professional grade upgrades for precision fitment. Explore our
            curated selection of automotive performance and luxury enhancements.
          </p>
        </div>
      </header>

      {/* 2. STICKY COMMAND BAR (THE FILTERS) */}
      <div className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Horizontal Categories */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:text-zinc-200 border border-transparent hover:border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Integration */}
            <div className="relative w-full lg:w-96 group">
              <input
                type="text"
                placeholder="Search reference or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-5 py-3 text-xs text-white outline-none focus:border-blue-500 transition-all pl-12"
              />
              <svg
                className="w-4 h-4 absolute left-4 top-3 text-zinc-600 group-focus-within:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12 border-b border-white/[0.05] pb-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Showing {filteredProducts?.length || 0} Results
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">
              Sort: Newest First
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse bg-white/5 aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#111113] border border-white/[0.03] transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                    <img
                      src={product.images[0]?.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover brightness-[0.8] transition-all duration-1000 group-hover:scale-110 group-hover:brightness-100"
                    />

                    {/* High-End Hover Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                      <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
                          Buy Now
                        </button>
                        <button className="w-full py-4 bg-[#1a1b1e]/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 hover:bg-white/5 transition-all">
                          Add To Bag
                        </button>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] font-black text-white uppercase tracking-[0.2em] border border-white/10">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-white text-[15px] font-bold tracking-tighter leading-tight group-hover:text-blue-500 transition-colors uppercase">
                        {product.name}
                      </h3>
                      <span className="text-white font-mono text-sm font-bold whitespace-nowrap">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <div
                        className={`w-1 h-1 rounded-full ${product.quantity > 0 ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        {product.quantity > 0
                          ? "Unit In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts?.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/10 mt-10">
            <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.4em]">
              No matching units found.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseProducts;
