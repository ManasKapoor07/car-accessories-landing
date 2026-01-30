import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetProductByIdQuery } from "../../redux/api/products.api";
import { useAddTocartMutation } from "../../redux/api/cart.api";
import Products from "../Products";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_user");

  const [getProdData, { data: product, isLoading, isError }] =
    useLazyGetProductByIdQuery();
  const [addToCartApi] = useAddTocartMutation();

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      getProdData(id);
      setActiveImg(0);
    }
  }, [id, getProdData]);

  const handleAddToBag = () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      // navigate("/login");
      return;
    }

    if (!product) return;

    addToCartApi({
      productId: product.id,
      quantity,
    }).then((res) => {
      if (res?.data) {
        setAdded(true);
        toast.success("Added to cart");
        setTimeout(() => setAdded(false), 2000);
      }
    });
  };

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
          {/* LEFT: GALLERY */}
          <div className="lg:w-[45%] flex gap-4">
            <div className="flex flex-col gap-2 shrink-0">
              {product?.images?.map((img, idx) => (
                <div
                  key={img.id}
                  onMouseEnter={() => setActiveImg(idx)}
                  className={`w-14 h-14 border cursor-pointer bg-[#111113] ${
                    activeImg === idx
                      ? "border-blue-500"
                      : "border-white/5 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    className="w-full h-full object-contain p-1"
                    alt="thumb"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 bg-[#111113] border border-white/5 flex items-center justify-center aspect-square">
              <img
                src={product?.images?.[activeImg]?.imageUrl}
                className="max-h-[85%] object-contain p-4"
                alt={product?.name}
              />
            </div>
          </div>

          <div className="lg:w-[32%] space-y-6">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              {product?.name}
            </h1>
            <p className="text-xs text-zinc-500">{product?.description}</p>
          </div>

          <div className="lg:w-[23%]">
            <div className="bg-[#111113] border border-white/10 p-6 space-y-6 sticky top-24">
              <span className="text-4xl font-mono text-white font-bold italic">
                ₹{product?.price?.toLocaleString("en-IN")}
              </span>

              <div className="flex justify-between bg-black border border-white/10 px-4 py-3">
                <span className="text-[9px] font-black uppercase text-zinc-500">
                  Quantity
                </span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-transparent text-white text-xs"
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
                className={`w-full py-4 font-black uppercase text-[10px] tracking-[0.2em]
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
                className="w-full py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.2em]"
              >
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Products />
    </div>
  );
};

export default ProductDetail;
