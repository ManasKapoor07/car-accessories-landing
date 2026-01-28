import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetProductByIdQuery } from "../../redux/api/products.api";
import Products from "../Products";
import { useDispatch } from "react-redux";
import addToCartReducer from "../../redux/reducer/addToCart.reducer";

const ProductDetail = () => {
  const { id } = useParams();
    const [added, setAdded] = useState(false);

  const navigate = useNavigate();
  const [getProdData, { data: product, isLoading, isError }] =
    useLazyGetProductByIdQuery();

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      getProdData(id);
      setActiveImg(0);
    }
  }, [id, getProdData]);

  if (isLoading)
    return (
      <div className="h-screen bg-[#0a0a0b] flex items-center justify-center text-blue-500 font-mono text-[10px] tracking-[0.5em]">
        SYNCHRONIZING_RESOURCES...
      </div>
    );
  if (isError)
    return (
      <div className="h-screen bg-[#0a0a0b] flex items-center justify-center text-zinc-500">
        SYSTEM_MISMATCH: PRODUCT_NOT_FOUND
      </div>
    );

  const dispatch = useDispatch();
  const addItemsToCart = addToCartReducer.actions.addItemToCart;
  const handleAddToBag = () => {
    if (!product) return;

    dispatch(
      addItemsToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.imageUrl,
        quantity,
      }),
    );

    setAdded(true);

    // Reset feedback after short delay
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-300 pt-16">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-8">
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span>/</span>
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/products")}
          >
            {product?.category}
          </span>
          <span>/</span>
          <span className="text-zinc-400">{product?.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* 1. LEFT: GALLERY */}
          <div className="lg:w-[45%] flex gap-4">
            <div className="flex flex-col gap-2 shrink-0">
              {product?.images?.map((img, idx) => (
                <div
                  key={img.id}
                  onMouseEnter={() => setActiveImg(idx)}
                  className={`w-14 h-14 border transition-all cursor-pointer bg-[#111113] ${activeImg === idx ? "border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : "border-white/5 opacity-50 hover:opacity-100"}`}
                >
                  <img
                    src={img.imageUrl}
                    className="w-full h-full object-contain p-1"
                    alt="thumb"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 bg-[#111113] border border-white/5 flex items-center justify-center aspect-square relative overflow-hidden">
              <img
                src={product?.images?.[activeImg]?.imageUrl}
                key={product?.images?.[activeImg]?.imageUrl}
                className="max-h-[85%] w-auto object-contain p-4 transition-all duration-300"
                alt={product?.name}
              />
              <span className="absolute top-4 left-4 text-[9px] font-mono text-zinc-700">
                CV_REF_{product?.id}
              </span>
            </div>
          </div>

          {/* 2. CENTER: TECHNICAL SPECS (Removed redundant price) */}
          <div className="lg:w-[32%] space-y-6">
            <div className="border-b border-white/5 pb-6">
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4 italic">
                {product?.name}
              </h1>
              <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.3em]">
                Visit the Car Vatika Professional Store
              </p>
            </div>

            {/* SAVINGS & DEAL SECTION (Psychological focus) */}
            <div className="space-y-2 border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <span className="text-blue-500 font-black text-2xl italic">
                  -25% OFF
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">
                    Typical Price
                  </span>
                  <span className="text-zinc-400 font-mono text-lg line-through decoration-blue-500/50">
                    ₹{(product?.price * 1.25).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-zinc-700 uppercase font-bold italic">
                Inclusive of all environmental and technical taxes
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">
                Core Specifications
              </h4>
              <ul className="space-y-3 text-xs text-zinc-500 font-medium leading-relaxed italic">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▪</span>{" "}
                  {product?.description}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▪</span> High-precision
                  fitment guaranteed for luxury units.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▪</span> System-verified
                  aerospace grade materials.
                </li>
              </ul>
            </div>
          </div>

          {/* 3. RIGHT: THE BUY BOX (Single source of price) */}
          <div className="lg:w-[23%]">
            <div className="bg-[#111113] border border-white/10 p-6 space-y-6 sticky top-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest block mb-1">
                  Secure Transaction
                </span>
                <span className="text-4xl font-mono text-white font-bold tracking-tighter italic">
                  ₹{product?.price?.toLocaleString("en-IN")}
                </span>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest italic">
                    In Stock // Ships Now
                  </p>
                </div>
              </div>

              <div className="text-[11px] space-y-2 border-y border-white/5 py-4">
                <p>
                  <span className="text-zinc-600 uppercase font-black">
                    Ship From:
                  </span>{" "}
                  Car Vatika
                </p>
                <p>
                  <span className="text-zinc-600 uppercase font-black">
                    Sold By:
                  </span>{" "}
                  CV_RETAIL_HQ
                </p>
              </div>

              <div className="space-y-4">
                {/* Quantity Select */}
                <div className="flex items-center justify-between bg-black border border-white/10 px-4 py-3">
                  <span className="text-[9px] font-black uppercase text-zinc-500">
                    Unit Quantity
                  </span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="bg-black">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToBag}
                  disabled={added}
                  className={`w-full py-4 font-black uppercase text-[10px] tracking-[0.2em] transition
                  ${
                    added
                      ? "bg-emerald-500 text-black"
                      : "bg-white text-black hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {added ? "Added to Bag ✓" : "Add to Bag"}
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
                >
                  Secure Checkout
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                AES-256 Encrypted Connection
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductDetail;
