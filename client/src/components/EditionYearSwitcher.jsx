import { Link } from "react-router-dom";
import { EDITIONS } from "../data/editions.js";
import { getAwardName } from "../utils/brand.js";

export default function EditionYearSwitcher({ currentYear }) {
  const years = EDITIONS.map((e) => e.year).sort((a, b) => b - a);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-bold">
          Previous Editions
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold text-[#ffe9b3]">
          {getAwardName()} – {currentYear}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {years.map((year) => (
          <Link
            key={year}
            to={`/editions/${year}`}
            className={`px-3 py-1 rounded-full border transition ${year === currentYear
              ? "border-[#d4af37] bg-[#d4af37]/15 text-[#ffe9b3] font-semibold"
              : "border-white/20 text-gray-200 hover:bg-white hover:text-black"
              }`}
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}


