import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import seatImg from "../assets/seat.jpg";
import floorImg from "../assets/FLOORmAT.jpg";
import dashCamImg from "../assets/dashCam.jpg";
import lightingImg from "../assets/light.jpg";

const slides = [
  {
    img: seatImg,
    tag: "Interior",
    title: "Luxury Redefined",
    desc: "Bespoke vegan leather seat covers tailored for your comfort.",
  },
  {
    img: floorImg,
    tag: "Protection",
    title: "All-Weather 7D Mats",
    desc: "Precision-molded protection for the most demanding environments.",
  },
  {
    img: dashCamImg,
    tag: "Electronics",
    title: "4K Road Intelligence",
    desc: "Professional dash monitoring with seamless interior integration.",
  },
  {
    img: lightingImg,
    tag: "Lighting",
    title: "Ambient Architecture",
    desc: "Studio-grade lighting kits synchronized with your driving mood.",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#0a0a0b] min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* 1. Subtle Radial Depth - This replaces messy glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1c1c1f_0%,#0a0a0b_100%)] opacity-70" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* 2. Content Area: Clean, High-Contrast Typography */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-blue-600"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">
                Precision Engineering
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.0] tracking-tighter mb-8">
              The Art of <br />
              <span className="text-zinc-500 italic font-light">
                The Upgrade.
              </span>
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto lg:mx-0 font-light">
              We provide professional on-site installation for premium
              automotive accessories, bringing a factory-finish directly to your
              driveway.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link
                to="/products"
                className="w-full sm:w-auto px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
              >
                Shop Collection
              </Link>
              <button className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center gap-3 group">
                Installation Process
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
              </button>
            </div>
          </div>

          {/* 3. The "Product Stage" - No messy shadows, just clean depth */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] bg-[#111113] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1) ${
                    activeIndex === idx
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover brightness-75 transition-all"
                  />

                  {/* Internal Gradient for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.4em]">
                          Series 0{idx + 1}
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                          {slide.title}
                        </h3>
                      </div>

                      {/* Minimalist Progress Indicator */}
                      <div className="flex gap-3 h-1 mb-2">
                        {slides.map((_, sIdx) => (
                          <div
                            key={sIdx}
                            className={`h-full transition-all duration-700 ${
                              sIdx === activeIndex
                                ? "bg-white w-12"
                                : "bg-white/10 w-4"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Reflection Accent Below Image */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
