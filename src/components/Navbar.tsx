import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: "Shop All", path: "/products" },
    { name: "Our Services", path: "/services" },
    { name: "Track Order", path: "/track" },
  ];

  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);
  const cartItemsFromLocal = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []  ;


  console.log(cartItems.length);
  

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0b]/95 backdrop-blur-md border-b border-white/[0.08] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* 1. BRAND IDENTITY */}
        <Link to="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="h-10 w-10 bg-blue-600 flex items-center justify-center text-white font-black italic shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-105">
            V
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">
              CAR VATIKA
            </span>
            <span className="text-blue-500 text-[8px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80">
              AUTHENTIC AUTOMOTIVE CORE
            </span>
          </div>
        </Link>

        {/* 2. CUSTOMER-FACING NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[11px] font-extrabold text-zinc-400 hover:text-white uppercase tracking-[0.2em] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* 3. E-COMMERCE UTILITIES (Amazon Style) */}
        <div className="flex items-center gap-4 lg:gap-8 border-l border-white/10 pl-8">
          {/* Search Toggle */}
          <button className="text-zinc-500 hover:text-white transition-colors p-1">
            <svg
              className="w-5 h-5"
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
          </button>

          {/* Account Group */}
          <Link
            to="/account"
            className="hidden sm:flex flex-col text-left group"
          >
            <span className="text-[8px] font-bold text-zinc-600 uppercase leading-none">
              Hello, Sign In
            </span>
            <span className="text-[10px] font-black text-white uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
              Account
            </span>
          </Link>

          {/* Cart with Counter */}
          <Link to="/cart" className="relative group flex items-center gap-2">
            <div className="relative">
              <svg
                className="w-6 h-6 text-white group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1.5 h-4 w-4 bg-blue-600 text-[9px] font-black text-white flex items-center justify-center italic shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                {cartItems.length == 0 ?  cartItemsFromLocal.length : cartItems.length || 0}
              </span>
            </div>
            <span className="hidden lg:block text-[10px] font-black text-white uppercase tracking-tighter self-end mb-0.5">
              Cart
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-white hover:bg-white/5 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 4. MOBILE DRAWER (E-commerce Style) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-[#0a0a0b] border-l border-white/5 p-10 transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full uppercase font-black tracking-widest text-[11px]">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-zinc-600 mb-16 hover:text-white"
            >
              [ Close X ]
            </button>

            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-4xl text-white italic tracking-tighter hover:text-blue-500 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-4">
              <Link
                to="/account"
                className="w-full py-4 border border-white/10 text-center text-white"
              >
                My Account
              </Link>
              <Link
                to="/cart"
                className="w-full py-4 bg-blue-600 text-center text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
              >
                Checkout (02)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
