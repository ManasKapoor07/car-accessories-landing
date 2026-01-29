import { useEffect } from "react";
import { useLazyGetProductsQuery } from "../redux/api/products.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import addToCartSlice from "../redux/reducer/addToCart.reducer";
import toast from "react-hot-toast";

const Products = () => {
  const [getprod, { data = [], isLoading }] = useLazyGetProductsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addItemsToCart = addToCartSlice.actions.addItemToCart;

  useEffect(() => {
    getprod({});
  }, [getprod]);

  const featuredProducts = data.slice(0, 6);

  const handleAddToCart = (product) => {
    dispatch(
      addItemsToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.imageUrl,
        quantity: 1,
      }),
    );
  };

  return (
    <section className="bg-[#0a0a0b] py-16 md:py-24 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3">
              Selected Series
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
              Featured{" "}
              <span className="text-zinc-600 italic font-light">Units</span>
            </h2>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] hover:text-white transition"
          >
            Full Catalogue →
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading
            ? [1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse space-y-6">
                  <div className="aspect-square bg-white/[0.03]" />
                  <div className="h-4 bg-white/[0.05] w-2/3" />
                </div>
              ))
            : featuredProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  {/* IMAGE */}
                  <div className="relative aspect-square bg-[#111113] overflow-hidden border border-white/[0.05]">
                    <img
                      src={product.images?.[0]?.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* DESKTOP HOVER */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition hidden md:flex flex-col justify-end p-6 gap-3">
                      <button
                        onClick={() => navigate(`/checkout/${product.id}`)}
                        className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white"
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={() => {
                          toast.success("Added to cart!");
                          handleAddToCart(product);
                        }}
                        className="w-full py-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full py-3 text-white text-[10px] font-black uppercase tracking-widest underline"
                      >
                        View Specification
                      </button>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-white text-lg font-bold uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <span className="text-white font-mono text-base font-bold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="text-zinc-500 text-xs italic line-clamp-2">
                      {product.description ||
                        "Premium automotive upgrade with precision fitment guaranteed."}
                    </p>

                    {/* MOBILE ACTIONS */}
                    <div className="flex md:hidden gap-2 pt-2">
                      <button
                        onClick={() => navigate(`/checkout/${product.id}`)}
                        className="flex-1 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 flex items-center justify-center border border-white/10 text-white"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
