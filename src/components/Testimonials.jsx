import React from "react";

const reviews = [
  {
    name: "Rahul Sharma",
    car: "Mahindra Thar",
    text: "Doorstep fitting was seamless. The seat covers fit like a glove!",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    car: "Hyundai Creta",
    text: "The 4K dashcam wiring is completely hidden. Impressive work.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    car: "Tata Nexon",
    text: "Premium quality floor mats. They really elevate the interior look.",
    rating: 5,
  },
  {
    name: "Sahil Khan",
    car: "Toyota Fortuner",
    text: "Best ambient lighting setup in town. Very professional team.",
    rating: 5,
  },
  {
    name: "Priya Das",
    car: "Kia Seltos",
    text: "Ordered the car purifier. Delivery was fast and the product is genuine.",
    rating: 4,
  },
  {
    name: "Amit Verma",
    car: "Maruti Swift",
    text: "Great value for money. The steering cover feels very premium.",
    rating: 5,
  },
  {
    name: "Siddharth J.",
    car: "Skoda Kushaq",
    text: "The pickup and drop service for my car was very convenient.",
    rating: 5,
  },
  {
    name: "Rohan G.",
    car: "MG Hector",
    text: "Excellent customer support. They helped me choose the right LEDs.",
    rating: 5,
  },
  {
    name: "Karan Johar",
    car: "BMW 3 Series",
    text: "Precision fitment indeed. My car looks brand new from the inside.",
    rating: 5,
  },
  {
    name: "Deepak R.",
    car: "Honda City",
    text: "The reverse camera quality is crystal clear even at night.",
    rating: 5,
  },
];

const Testimonials = () => {
  const row1 = reviews.slice(0, 5);
  const row2 = reviews.slice(5, 10);

  return (
    <section className="bg-[#0a0a0b] py-16 md:py-24 overflow-hidden border-t border-white/[0.03] relative">
      {/* 1. Header: Balanced for Mobile/Desktop */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="w-8 md:w-12 h-[1px] bg-blue-600"></span>
              <span className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">
                Owner Reports
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              Verified{" "}
              <span className="text-zinc-600 italic font-light">
                Experiences.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-[12px] md:text-sm max-w-xs font-medium text-center md:text-right mx-auto md:mx-0">
            Precision fitment trusted by India's most demanding car enthusiasts.
          </p>
        </div>
      </div>

      {/* 2. Marquee Container */}
      <div className="relative flex flex-col gap-4 md:gap-8">
        {/* Cinematic Edge Fades: Smaller on mobile to keep space usable */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-48 bg-gradient-to-r from-[#0a0a0b] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-48 bg-gradient-to-l from-[#0a0a0b] to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="group flex overflow-hidden select-none gap-4 md:gap-6">
          <div className="flex animate-marquee-slow group-hover:[animation-play-state:paused] gap-4 md:gap-6">
            {[...row1, ...row1].map((rev, i) => (
              <ReviewCard key={i} review={rev} />
            ))}
          </div>
        </div>

        {/* Row 2: Hidden on very small screens for better performance, or kept for density */}
        <div className="group flex overflow-hidden select-none gap-4 md:gap-6">
          <div className="flex animate-marquee-slow-reverse group-hover:[animation-play-state:paused] gap-4 md:gap-6">
            {[...row2, ...row2].map((rev, i) => (
              <ReviewCard key={i} review={rev} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => (
  <div className="w-[280px] md:w-[400px] flex-shrink-0 p-6 md:p-8 bg-[#111113] border border-white/[0.03] transition-all duration-500 hover:border-blue-500/40 hover:bg-[#161618]">
    {/* Ratings */}
    <div className="flex items-center gap-1.5 mb-4 md:mb-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-[2px] w-3 md:w-4 ${i < review.rating ? "bg-blue-600" : "bg-zinc-800"}`}
        />
      ))}
    </div>

    {/* Content */}
    <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed font-medium mb-6 md:mb-8 italic line-clamp-3 md:line-clamp-none">
      "{review.text}"
    </p>

    {/* User Details */}
    <div className="flex items-center gap-4 border-t border-white/[0.05] pt-5 md:pt-6">
      {/* Avatar: Square "Tech" look */}
      <div className="h-9 w-9 md:h-10 md:w-10 bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-black text-white shrink-0">
        {review.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <div className="min-w-0">
        <h4 className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest truncate">
          {review.name}
        </h4>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-blue-500 text-[8px] md:text-[9px] font-black uppercase tracking-tighter">
            Verified Owner
          </span>
          <span className="hidden xs:block h-1 w-1 rounded-full bg-zinc-700" />
          <span className="text-zinc-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest truncate">
            {review.car}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
