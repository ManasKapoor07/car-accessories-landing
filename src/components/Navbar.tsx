const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* BRAND */}
        <div className="text-lg font-semibold tracking-wide text-blue-600">
          Car Vatika
        </div>

        {/* LINKS */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-700">
          <a className="hover:text-blue-600 transition">Accessories</a>
          <a className="hover:text-blue-600 transition">By Car</a>
          <a className="hover:text-blue-600 transition">New Arrivals</a>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 text-sm">
          <button className="text-gray-700 hover:text-blue-600 transition">
            Account
          </button>

          <button className="text-gray-700 hover:text-blue-600 transition">
            Cart (2)
          </button>

          <button className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
