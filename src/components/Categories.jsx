import seatImg from "../assets/seat.jpg";
import floorImg from "../assets/FLOORmAT.jpg";
import dashCamImg from "../assets/dashCam.jpg";
import lightingImg from "../assets/light.jpg";

const categories = [
  {
    title: "Interior Comfort",
    desc: "Ergonomic leatherette covers designed for long-distance durability.",
    img: seatImg,
  },
  {
    title: "Visual Performance",
    desc: "Synchronized ambient lighting and high-intensity LED upgrades.",
    img: lightingImg,
  },
  {
    title: "Safety & Tech",
    desc: "Smart 4K monitoring systems with professional hidden wiring.",
    img: dashCamImg,
  },
  {
    title: "Utility & Mats",
    desc: "Custom-molded protection kits for extreme weather conditions.",
    img: floorImg,
  },
];

const Categories = () => {
  return (
    <section className="bg-[#0f1012] py-16 md:py-24 relative overflow-hidden border-b border-white/5">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-blue-600/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Responsive Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="h-px w-6 bg-blue-500" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                Product Ecosystem
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight">
              Specialized categories for <br className="hidden sm:block" />
              <span className="text-slate-500 font-normal">
                complete vehicle transformation.
              </span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-slate-400 text-xs md:text-[13px] max-w-xs leading-relaxed font-medium border-l border-white/10 pl-5">
              Every component is vetted for compatibility and longevity before
              reaching your doorstep.
            </p>
          </div>
        </div>

        {/* Grid — Optimized for Mobile/Tablet/Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              className="group cursor-pointer relative h-[350px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden bg-[#1a1b1e] border border-white/10 transition-all duration-500 hover:border-blue-500/40 shadow-xl"
            >
              {/* Image with adaptive brightness */}
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 brightness-[0.75] sm:brightness-[0.85] group-hover:brightness-[0.6]"
              />

              {/* Gradient Overlay - Darker on mobile for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                {/* Always visible on mobile, animated on desktop hover */}
                <div className="translate-y-0 lg:translate-y-8 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-blue-400 font-mono text-[9px] md:text-[10px] block mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                    Series 0{idx + 1}
                  </span>

                  <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-[11px] md:text-[12px] text-slate-400 leading-relaxed mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 delay-75 line-clamp-2 sm:line-clamp-none">
                    {cat.desc}
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    Explore Details
                    <svg
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Corner Accent — Responsive visibility */}
              <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-white/10 group-hover:border-blue-500/40 transition-colors hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
