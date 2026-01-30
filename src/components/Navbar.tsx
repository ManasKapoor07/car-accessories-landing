import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetUserbyIdQuery } from "../redux/api/products.api";
import userSlice from "../redux/reducer/userReducer.reducer";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_user");
  const [getUserByIdTrigger, { data }] = useLazyGetUserbyIdQuery();

  const dispatch = useDispatch();

  const setUser = userSlice.actions.setUser;

  // Handle Scroll & Mobile Search
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > 100 && currentScrollY < lastScrollY) {
        setShowMobileSearch(true);
      } else {
        setShowMobileSearch(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Dropdown Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (token)
      getUserByIdTrigger({}).then((res) => {
        if (res.data) {
          console.log(res.data);

          dispatch(setUser(res.data));
        }
      });
  }, [token, location, getUserByIdTrigger]);

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_user");
    setDropdownOpen(false);
    // navigate("/login");
    window.location.reload();
  };

  const cartItems = useSelector(
    (state) => state.addToCartReducer?.cartItems || [],
  );
  const cartCount = cartItems.length;

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md py-3 border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-4">
            <div className="relative h-10 w-10 flex items-center justify-center bg-blue-600 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-black italic text-xl z-10">
                V
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out]" />
            </div>
            <h1 className="hidden sm:block text-white font-black tracking-tighter text-xl uppercase italic">
              CAR<span className="text-blue-500">VATIKA</span>
            </h1>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            <Link to="/shop" className="hover:text-blue-500 transition-colors">
              Shop
            </Link>
            <Link
              to="/brands"
              className="hover:text-blue-500 transition-colors"
            >
              Brands
            </Link>
          </div>

          {/* UTILITIES */}
          <div className="flex items-center gap-6">
            {/* PROFILE SECTION */}
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 group transition-all"
                >
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                      Account
                    </span>
                    <span className="text-[11px] font-black text-white group-hover:text-blue-500 transition-colors italic">
                      Hello , {data?.userName?.split(" ")[0] || "Profile"}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-full border border-white/10 p-0.5 bg-zinc-900 flex items-center justify-center text-blue-500 group-hover:border-blue-500/50 transition-all">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </button>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-52 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl p-1 animate-[slideDown_0.3s_ease-out]">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all tracking-wider uppercase"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/track"
                      className="block px-4 py-2.5 text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all tracking-wider uppercase"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-all border-t border-white/5 mt-1 uppercase"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[10px] font-black text-white/60 hover:text-white uppercase tracking-widest transition-all"
              >
                Sign In
              </Link>
            )}

            {/* CART TRIGGER */}
            <button
              onClick={() => navigate("/cart")}
              className="relative group p-2 outline-none"
            >
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
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-[8px] font-black text-white flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* HAMBURGER (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white p-2"
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
                  d="M4 6h16M4 12h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FLOATING SEARCH */}
      <div
        className={`fixed left-0 w-full z-[90] px-6 transition-all duration-500 lg:hidden ${
          showMobileSearch
            ? "top-[70px] opacity-100"
            : "top-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
          <input
            type="text"
            placeholder="Search parts..."
            className="w-full bg-white/5 rounded-lg px-4 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-700"
          />
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[150] bg-black/95 transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="text-blue-500 font-black italic text-2xl">
              CARVATIKA
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-4xl leading-none"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col gap-10 text-3xl font-black text-white uppercase italic">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            {token ? (
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-blue-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </>
  );
};

export default Navbar;
