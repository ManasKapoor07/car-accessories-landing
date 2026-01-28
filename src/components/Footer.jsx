const Footer = () => {
  return (
    <footer className="bg-[#0a0a0b] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-7 w-7 bg-blue-600 rounded flex items-center justify-center text-white font-black italic">
                V
              </div>
              <span className="text-white font-bold tracking-tighter uppercase">
                Car Vatika
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Precision accessories for the modern driver. Elevating your daily
              commute with factory-grade fitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">
              Shop
            </h4>
            <ul className="space-y-4 text-slate-500 text-xs">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Interior Accessories
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Safety Electronics
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Lighting Systems
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-6">
              Service
            </h4>
            <ul className="space-y-4 text-slate-500 text-xs">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Doorstep Fitting
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Warranty Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Installation Guide
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="text-white text-xs font-bold mb-2">Join the Club</h4>
            <p className="text-slate-500 text-[10px] mb-4 uppercase tracking-tighter">
              Get launch updates & offers.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500 w-full"
              />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all">
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
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest">
            © 2026 Car Vatika. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-600 text-[10px] uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">
              Instagram
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Facebook
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              WhatsApp
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
