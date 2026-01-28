import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  removeItemFromCart,
  updateQuantity,
} from "../../redux/reducer/addToCart.reducer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-300 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: ITEM LIST */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-6 mb-8">
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                Shopping <span className="text-zinc-600 font-light">Bag.</span>
              </h1>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {cartItems.length} Product Series
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
                    {/* Item Image */}
                    <div className="w-full sm:w-40 aspect-square bg-[#111113] border border-white/5 p-2">
                      <img
                        src={item.image || item.images?.[0]?.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Item Details */}
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

                      {/* Controls */}
                      <div className="flex items-center gap-8 mt-6">
                        <div className="flex items-center bg-black border border-white/10 px-3 py-1.5">
                          <span className="text-[8px] font-black text-zinc-600 uppercase mr-3">
                            Qty
                          </span>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              dispatch(
                                updateQuantity({
                                  productId: item.productId,
                                  quantity: Number(e.target.value),
                                }),
                              )
                            }
                            className="bg-transparent text-white font-mono text-xs outline-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                              <option key={n} value={n} className="bg-black">
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeItemFromCart(item.productId))
                          }
                          className="text-[9px] font-black text-zinc-600 hover:text-red-500 uppercase tracking-widest transition-colors"
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

          {/* RIGHT: BUY BOX */}
          <div className="lg:w-96">
            <div className="bg-[#0e0e10] border border-white/10 p-8 sticky top-32 shadow-2xl">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
                Transaction Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-bold uppercase text-zinc-500">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase text-zinc-500">
                  <span>Delivery</span>
                  <span className="text-emerald-500 font-black italic">
                    FREE_SHIPPING
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-10">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-black text-white uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-3xl font-mono font-bold text-white tracking-tighter italic">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-10"
              >
                Proceed To Checkout
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-[0.2em]">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
                Secure 256-bit Connection
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
