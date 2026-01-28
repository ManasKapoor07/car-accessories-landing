import { useState } from "react";

const brands = [
  "All",
  "Maruti",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Toyota",
  "Kia",
];

const VehicleFilter = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");

  return (
    <div className="bg-[#0a0a0b] pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-8 gap-6">
          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                Filter by Garage
              </p>
              <h3 className="text-white font-bold">Find your fit</h3>
            </div>
          </div>

          {/* Brand Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                  selectedBrand === brand
                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Body Type Dropdown (Optional Look) */}
          <select className="bg-transparent text-white text-xs font-bold uppercase tracking-widest border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors">
            <option className="bg-[#0a0a0b]">SUV</option>
            <option className="bg-[#0a0a0b]">Sedan</option>
            <option className="bg-[#0a0a0b]">Hatchback</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;
