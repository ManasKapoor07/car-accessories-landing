const services = [
  {
    step: "01",
    title: "On-Site Installation",
    desc: "Our certified technicians bring the workshop to you, ensuring precision fitment in the comfort of your home or office.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Vehicle Logistics",
    desc: "Seamless pick-up and drop-off service for complex technical upgrades at our specialized centers.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Precision Fitment",
    desc: "No universal parts. Every component is laser-scanned for model-specific compatibility and an OEM finish.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section className="bg-[#0f1012] py-16 md:py-24 relative border-b border-white/5 overflow-hidden">
      {/* Background Glow - Subtle on mobile */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Info Header (Sticky only on Large Screens) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-blue-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                Service Architecture
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight">
              Premium care, <br className="hidden md:block" />
              <span className="text-slate-500 font-normal">
                engineered for ease.
              </span>
            </h2>

            <p className="text-slate-400 text-sm md:text-[14px] leading-relaxed max-w-md lg:max-w-sm">
              We've eliminated the friction of car upgrades. Professional
              service that respects your time and your vehicle's integrity.
            </p>

            <div className="pt-4 md:pt-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <p className="text-white text-xs font-semibold mb-2">
                  Technical Support
                </p>
                <p className="text-slate-500 text-[12px] mb-4 leading-snug">
                  Connect with our specialists for a model-specific
                  consultation.
                </p>
                <button className="text-blue-400 text-[11px] font-black uppercase tracking-widest hover:text-blue-300 transition-colors flex items-center gap-2">
                  Request Quote{" "}
                  <span className="text-base leading-none">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Service Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-[#16171a] hover:border-blue-500/30 transition-all duration-500 
                  ${idx === 0 ? "md:col-span-2" : "col-span-1"}`}
              >
                {/* Step Number - Adjusted for mobile visibility */}
                <div className="absolute top-6 right-6 md:right-8 text-white/[0.03] md:text-white/5 text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-blue-500/10 transition-colors">
                  {service.step}
                </div>

                <div className="relative z-10">
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-900/10">
                    {service.icon}
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p
                    className={`text-slate-400 text-[13px] leading-relaxed ${idx === 0 ? "max-w-lg" : "max-w-xs"}`}
                  >
                    {service.desc}
                  </p>
                </div>

                {/* Mobile-Friendly Arrow Link */}
                <div className="mt-6 md:mt-0 md:absolute md:bottom-8 md:right-8 opacity-60 md:opacity-0 group-hover:opacity-100 md:translate-x-2 group-hover:translate-x-0 transition-all flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  <span className="md:hidden">View Details</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
