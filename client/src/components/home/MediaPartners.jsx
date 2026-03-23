import { getAwardName } from "../../utils/brand.js";

export default function MediaPartners({ mediaPartners, SECTION_BG }) {
  return (
    <section
      className={`relative pt-8 sm:pt-10 md:pt-16 pb-8 sm:pb-12 md:pb-20 overflow-hidden ${SECTION_BG}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* hello */}
      {/* Decorative mesh gradients for premium depth - responsive sizes */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-50px] xs:top-[-80px] left-1/2 -translate-x-1/2 w-[160px] xs:w-[260px] sm:w-[350px] md:w-[500px] lg:w-[580px] h-[160px] xs:h-[260px] sm:h-[350px] md:h-[500px] lg:h-[580px] bg-[#d4af37]/15 rounded-full blur-[32px] xs:blur-[80px] sm:blur-[110px] animate-pulse -z-10" />
        <div className="absolute -bottom-10 xs:-bottom-20 right-[4%] xs:right-[7%] w-[90px] xs:w-[140px] sm:w-[200px] md:w-[310px] lg:w-[350px] h-[90px] xs:h-[160px] sm:h-[200px] md:h-[310px] lg:h-[350px] bg-[#c62828]/10 rounded-full blur-[32px] xs:blur-[80px] sm:blur-[120px] animate-pulse delay-1000 -z-10" />
        <div className="absolute top-1/4 left-[-13%] xs:left-[-10%] w-16 xs:w-24 sm:w-36 h-24 xs:h-36 sm:h-60 bg-[#ffd966]/10 rounded-full blur-xl xs:blur-2xl rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 xs:px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-14">
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-2 sm:mb-4 md:mb-6 bg-gradient-to-r from-[#f7e791] via-[#d4af37] to-[#f7e791] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Our Previous Media Partners
          </h2>
          <div className="w-20 xs:w-28 sm:w-36 md:w-40 h-1 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-1 sm:mb-2" />
          <p className="mt-2 text-sm xs:text-base sm:text-lg md:text-xl text-[#faecc6] max-w-xs xs:max-w-lg sm:max-w-2xl mx-auto leading-snug font-semibold drop-shadow">
            <span className="italic text-[#ffd966] font-display text-base sm:text-lg md:text-2xl">“</span>
            <span className="font-serif">
              A strong network of media partners has helped amplify the <span className="text-[#ffd966] font-semibold">{getAwardName()}</span> across India and internationally.
            </span>
            <span className="italic text-[#ffd966] font-display text-base sm:text-lg md:text-2xl">”</span>
          </p>
        </div>

        {/* Automatic Infinite Slider */}
        <div className="overflow-hidden py-6 sm:py-10 lg:py-14 w-full">
          <div className="animate-marquee flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Combine original list twice for seamless loop */}
            {[...mediaPartners, ...mediaPartners].map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex-shrink-0 group"
              >
                <div
                  className="
                    relative h-28 xs:h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80
                    aspect-square rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]
                    bg-gradient-to-br from-[#1d140e]/95 via-[#251c10]/98 to-[#b0872b1a]
                    border border-[#eed47c]/25
                    hover:border-[#ffd966]
                    hover:shadow-[0_20px_60px_-15px_#efd77c66,0_0_0_3px_#ffd96622]
                    transition-all duration-500
                    flex items-center justify-center
                    overflow-hidden p-4 xs:p-7 sm:p-10 md:p-12 lg:p-14
                  "
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  {/* Glow Background */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-110 group-hover:brightness-105 transition-all duration-500"
                      loading="lazy"
                      draggable="false"
                    />
                  ) : (
                    <span className="text-[#ffd966] text-xl sm:text-3xl md:text-4xl font-black drop-shadow-lg">
                      {partner.name[0]}
                    </span>
                  )}

                  {/* Corner Ornaments */}
                  <div className="absolute top-2 left-2 w-3 sm:w-4 h-3 sm:h-4 border-t border-l border-[#d4af37]/30 rounded-tl-lg group-hover:border-[#d4af37] transition-all duration-300"></div>
                  <div className="absolute bottom-2 right-2 w-3 sm:w-4 h-3 sm:h-4 border-b border-r border-[#d4af37]/30 rounded-br-lg group-hover:border-[#d4af37] transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
