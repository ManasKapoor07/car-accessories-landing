import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useDeletecartMutation,
  useLazyGetCartQuery,
  useUpdateCartMutation,
} from "../../redux/api/cart.api";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_user");
  const userId = useSelector((state) => state.userSlice.currentUser?.id);

  const [deleteprod] = useDeletecartMutation();
  const [updateQuant] = useUpdateCartMutation();
  const [getItems, { data: Gdata, isLoading }] = useLazyGetCartQuery();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart");
      // navigate("/login");
      return;
    }
    getItems({});
  }, [token, navigate, getItems]);

  const cartItems = useMemo(() => {
    return (
      Gdata?.items?.map((item) => ({
        productId: item.productId,
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
        image: item.images?.[0] || null,
      })) || []
    );
  }, [Gdata]);

  const subtotal = Gdata?.totalAmount || 0;

  const handleRemove = (item) => {
    deleteprod(item.productId).then((res) => {
      if (res?.data) {
        toast.success("Item removed");
        // getItems({});
      }
    });
  };

  const handleQuantityChange = (item, qty) => {
    updateQuant({
      userId,
      productId: item.productId,
      quantity: qty,
    }).then((res) => {
      if (res?.data) {
        toast.success("Quantity updated");
        // getItems({});
      }
    });
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-300 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-6 mb-8">
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                Shopping <span className="text-zinc-600 font-light">Bag.</span>
              </h1>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {cartItems.length} Products
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10">
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-6">
                  Your bag is currently empty
                </p>
                <Link
                  to="/products"
                  className="text-blue-500 text-[10px] font-black uppercase tracking-widest border-b border-blue-500 pb-1"
                >
                  Browse Inventory
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-white/[0.03]"
                  >
                    {/* IMAGE */}
                    <div className="w-full sm:w-40 aspect-square bg-[#111113] border border-white/5 p-2">
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/300x300?text=No+Image"
                        }
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white text-lg font-bold uppercase tracking-tighter mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">
                            Unit Price: ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <span className="text-white font-mono text-lg font-bold">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* CONTROLS */}
                      <div className="flex items-center gap-8 mt-6">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item, Number(e.target.value))
                          }
                          className="bg-black border border-white/10 px-3 py-1 text-white text-xs"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleRemove(item)}
                          className="text-[9px] font-black text-zinc-600 hover:text-red-500 uppercase tracking-widest"
                        >
                          [ Remove ]
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:w-96">
            <div className="bg-[#0e0e10] border border-white/10 p-8 sticky top-32 shadow-2xl">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
                Transaction Summary
              </h2>

              <div className="flex justify-between text-[11px] font-bold uppercase text-zinc-500 mb-6">
                <span>Subtotal</span>
                <span className="text-white font-mono">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-10"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
