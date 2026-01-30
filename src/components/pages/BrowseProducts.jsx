import { useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../redux/api/products.api";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddTocartMutation } from "../../redux/api/cart.api";

const BrowseProducts = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_user");
  const userId = useSelector((state) => state.userSlice.currentUser?.id);

  const [getprod, { data = [], isLoading }] = useLazyGetProductsQuery();
  const [addToCartApi] = useAddTocartMutation();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getprod({});
  }, [getprod]);

  const categories = ["All", ...new Set(data.map((p) => p.category))];

  const filteredProducts = data.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      // navigate("/login");
      return;
    }

    addToCartApi({
      productId: product.id,
      quantity: 1,
    }).then((res) => {
      if (res?.data) {
        toast.success("Added to cart");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-400 selection:bg-blue-500/30">
      <header className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">
            Official Inventory
          </span>
          <h1 className="text-5xl font-bold text-white mt-4">
            The{" "}
            <span className="text-zinc-600 italic font-light">Catalogue</span>
          </h1>
        </div>
      </header>

      <div className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-6">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-96 bg-white/[0.03] border border-white/10 px-5 py-3 text-xs text-white outline-none"
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse bg-white/5 aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#111113] border border-white/5">
                    <img
                      src={product.images?.[0]?.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                      <button
                        disabled={product.quantity === 0}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-40"
                      >
                        Add To Bag
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-white font-bold uppercase">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseProducts;
