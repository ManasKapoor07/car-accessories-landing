import { useEffect, useState } from "react";
import seatImg from "../assets/seat.jpg";
import floorImg from "../assets/FLOORmAT.jpg";
import dashCamImg from "../assets/dashCam.jpg";
import lightingImg from "../assets/light.jpg";

const images = [seatImg, floorImg, dashCamImg, lightingImg];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        {/* LEFT — CONTENT */}
        <div className="lg:col-span-5 space-y-6">
          {/* Eyebrow */}
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-blue-600">
            Car accessories, done right
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            Accessories that fit right,
            <span className="block">look clean and feel original</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 max-w-md leading-relaxed">
            Model-specific seat covers, mats, dash cams and lighting — installed
            at your doorstep or picked up from your home.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="px-7 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
              Explore products
            </button>

            <button className="px-7 py-3 rounded-lg border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition">
              Check service availability
            </button>
          </div>

          {/* Differentiators — Premium & Subtle */}
          <div className="pt-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span>Doorstep fitting</span>
              <span className="h-4 w-px bg-slate-300" />
              <span>Car pickup & drop</span>
              <span className="h-4 w-px bg-slate-300" />
              <span>Model-specific fit</span>
            </div>
          </div>
        </div>

        {/* RIGHT — CAROUSEL */}
        <div className="lg:col-span-7">
          <div className="relative h-[420px] lg:h-[420px] rounded-xl overflow-hidden shadow-md">
            <img
              src={images[activeIndex]}
              alt="Car accessory"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
