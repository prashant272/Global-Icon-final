import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EDITIONS } from "../data/editions.js";

// Each card highlights "Chief Guest" with clean styling, text never overflows, and all info is distinct.

export default function PreviousEditions() {
  const navigate = useNavigate();

  // Editions sorted by newest first
  const sorted = useMemo(
    () => [...EDITIONS].sort((a, b) => b.year - a.year),
    []
  );

  return (
    <section className="bg-gradient-to-tl from-[#1c1001] via-[#2e2312] to-[#1b140a] text-white min-h-screen py-9 px-0 flex items-start w-full">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 pt-16 px-0 w-full">
          <div>
            <h1 className="font-extrabold text-[#fdc537] text-[2.8rem] sm:text-[3.6rem] md:text-[4rem] leading-tight tracking-tight drop-shadow-[0_3px_20px_rgba(253,197,55,0.22)] text-left">
              Previous Editions
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-200 text-left max-w-2xl font-medium">
              <span className="inline-block px-4 py-2 bg-[#212121]/50 rounded-full border border-[#e6b832] text-[#fffbed] font-semibold tracking-wide shadow-sm">
                Explore a gallery of all our past award editions. Click "View Details" for more info on any year!
              </span>
            </p>
          </div>
          <div className="mt-5 md:mt-0 flex items-center">
            <Link
              to="/winners"
              className="rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#ffe761] to-[#ffd700] text-[#2f1b07] px-8 py-2 text-lg font-extrabold shadow-md hover:bg-[#fff700] hover:text-[#2f1b07] hover:border-[#e9b904] transition focus:outline-none"
              style={{
                boxShadow: "0 3px 16px 0 #d4af3766,0 1.5px 6px #d4af3732",
                letterSpacing: "0.01em",
              }}
            >
              Winners
            </Link>
          </div>
        </header>
        {/* Card Grid */}
        <div
          className="
            w-full
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-x-8 gap-y-14
            px-0 mb-14 animate-fadein
          "
          style={{ justifyItems: "center", alignItems: "stretch" }}
        >
          {sorted.map((e) => (
            <button
              key={e.year}
              type="button"
              onClick={() =>
                navigate(e.path, {
                  state: { from: "previous" },
                })
              }
              aria-label={`View details for ${e.year} edition`}
              className={`
                group
                bg-gradient-to-br from-[#24170b] to-[#322109]
                border-2 border-[#f9d563] hover:border-[#ffd700] transition-all
                rounded-xl
                shadow-[0_8px_32px_rgba(198,163,59,0.18),0_2px_10px_#ffd70035]
                flex flex-col items-center
                relative overflow-hidden
                w-full max-w-[370px] min-w-[240px]
                py-6 px-5
                min-h-[540px] h-[540px] max-h-[540px]
                cursor-pointer
                focus:outline-none
                bg-clip-padding
              `}
              style={{
                background: "linear-gradient(120deg, #23180c 85%, #4d3309 100%)",
                boxShadow:
                  "0 8px 32px 0 rgba(212,175,55,0.10), 0 2px 10px 0 #fde8b847",
              }}
            >
              {/* Light Glow - reduced opacity and less white */}
              <span className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#fde18838] via-[#ffd70008] to-transparent opacity-60 group-hover:opacity-75 transition rounded-xl" />

              {/* Top badge */}

              {/* Edition Photo Section */}
              <div className="mt-1 mb-5 w-full flex flex-col items-center z-20">
                <div className="w-full h-[220px] rounded-xl border-[3px] border-[#ffe391d5] bg-[#fff8e3cc] shadow-lg overflow-hidden flex items-center justify-center relative group-hover:border-[#ffd700] transition-colors duration-300">
                  <img
                    src={`/${e.year}/1.jpg`}
                    alt={`${e.year} Edition`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(event) => {
                      // If 1.jpg fails, try the coverImage from editions.js
                      if (event.target.src.includes(`/${e.year}/1.jpg`)) {
                        event.target.src = e.coverImage || "/images/edition_placeholder.jpg";
                      } else if (!event.target.src.includes("/images/edition_placeholder.jpg")) {
                        // Final fallback
                        event.target.src = "/images/edition_placeholder.jpg";
                      }
                    }}
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Award not organized badge for COVID years */}
                  {(e.year === 2020 || e.year === 2021) && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center backdrop-blur-[2px]">
                      <span className="text-4xl mb-2">😷</span>
                      <span className="text-[#ffd966] text-xs font-black uppercase tracking-tighter bg-black/40 px-3 py-1 rounded-full border border-[#ffd966]/30">
                        Not Organised (COVID)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edition Info */}
              <div className="w-full flex flex-col items-center z-20 px-0">
                <div className="font-extrabold text-[#ffe780] text-3xl mb-1 tracking-wide drop-shadow text-center">
                  {e.year}
                </div>
                <div className="text-[#fdc537] text-sm font-bold tracking-widest uppercase mb-2">
                  {e.editionLabel}
                </div>

                <span className="text-[#ffe595] font-semibold text-[1.1rem] text-center mb-1 max-w-full leading-tight">
                  {e.fullDate || e.year}
                </span>

                <div className="flex items-center gap-2 text-[#bdb383] text-[0.9rem] mb-4">
                  <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{e.locations?.join(" · ")}</span>
                </div>
              </div>

              {/* Award (if any) */}

              {/* Spacer */}
              <div className="flex-1" />

              {/* "View More" Button */}
              <div className="w-full flex justify-center mt-auto z-20">
                <span className="inline-flex items-center bg-gradient-to-r from-[#ffd700]/80 to-[#ffea91]/60 text-[#301a0b] px-5 py-2.5 text-[1rem] font-black rounded-full border-2 border-[#ffe58f]/50 shadow group-hover:scale-105 transition-transform duration-150 tracking-wide">
                  View Details <span className="ml-2 text-[1.3em]">→</span>
                </span>
              </div>

              {/* Card border glow and bottom shadow */}
              <span className="pointer-events-none absolute inset-0 rounded-xl border-[2px] border-[#fffbed12] group-hover:border-[#fff7c055] transition-all duration-300 z-30"></span>
              <span className="pointer-events-none absolute bottom-0 left-0 w-full h-7 rounded-b-xl bg-gradient-to-t from-[#fffbd908] to-transparent z-10" />
            </button>
          ))}
        </div>
        <div className="hidden">
          {/* Old detailed edition cards not shown in redesign. */}
        </div>
      </div>
    </section>
  );
}
