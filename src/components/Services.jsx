import seatImg from "../assets/seat.jpg";
import dashCamImg from "../assets/dashCam.jpg";
import floorImg from "../assets/FLOORmAT.jpg";

const services = [
  {
    title: "Doorstep fitting",
    desc: "Professional installation at your home or office by trained technicians.",
    img: seatImg,
  },
  {
    title: "Car pickup & drop",
    desc: "We pick up your car, install accessories and deliver it back safely.",
    img: dashCamImg,
  },
  {
    title: "Quality check & support",
    desc: "Every installation is verified. Support continues even after delivery.",
    img: floorImg,
  },
];

const Services = () => {
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Installation made effortless
          </h2>
          <p className="mt-3 text-slate-600">
            From doorstep fitting to full car pickup, we handle the entire
            installation experience so you don’t have to.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition"
            >
              {/* Image */}
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA + trust */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-wrap gap-5 text-sm text-slate-600">
            <span>Trained technicians</span>
            <span>No damage guarantee</span>
            <span>Post-installation support</span>
          </div>

          <button className="px-7 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition">
            Check service availability
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
