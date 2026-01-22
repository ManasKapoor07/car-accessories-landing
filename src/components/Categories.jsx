import seatImg from "../assets/seat.jpg";
import floorImg from "../assets/FLOORmAT.jpg";
import dashCamImg from "../assets/dashCam.jpg";
import lightingImg from "../assets/light.jpg";

const categories = [
  {
    title: "Interior accessories",
    desc: "Seat covers, mats and comfort upgrades",
    img: seatImg,
  },
  {
    title: "Exterior & lighting",
    desc: "Lighting and exterior visual upgrades",
    img: lightingImg,
  },
  {
    title: "Electronics & safety",
    desc: "Dash cams and smart car electronics",
    img: dashCamImg,
  },
  {
    title: "Mats & utility",
    desc: "Floor mats and everyday essentials",
    img: floorImg,
  },
];

const Categories = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <span className="text-xs font-semibold tracking-wide uppercase text-blue-600">
            Shop by category
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900">
            Designed around your car
          </h2>
          <p className="mt-3 text-slate-600">
            Each category is curated for precise fit, clean finish and everyday
            usability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.title}
              className="group relative h-[260px] rounded-2xl overflow-hidden text-left"
            >
              {/* Image */}
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay (very subtle) */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              {/* Text */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <h3 className="text-base font-semibold text-white">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-white/85">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
