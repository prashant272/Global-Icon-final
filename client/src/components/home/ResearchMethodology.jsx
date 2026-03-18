export default function ResearchMethodology({ SECTION_BG }) {
  const items = [
    {
      title: "Data Collection & Screening",
      desc: "All nominations are collected through a structured submission process. Each entry undergoes an initial screening to ensure eligibility, completeness, and alignment with the award category.",
      number: "01",
    },
    {
      title: "Qualitative & Quantitative Analysis",
      desc: "Submissions are evaluated using a balanced research framework combining qualitative insights and quantitative metrics to assess performance, innovation, and impact.",
      number: "02",
    },
    {
      title: "Expert Jury Evaluation",
      desc: "An independent panel of industry experts, academicians, and subject-matter specialists reviews shortlisted entries to ensure unbiased and credible assessment.",
      number: "03",
    },
    {
      title: "Benchmarking & Industry Standards",
      desc: "Each nomination is benchmarked against industry best practices, regulatory standards, and emerging global trends to measure relevance and excellence.",
      number: "04",
    },
    {
      title: "Score Normalisation & Validation",
      desc: "Scores from multiple evaluators are normalised to eliminate bias and ensure consistency, fairness, and transparency across all categories.",
      number: "05",
    },
    {
      title: "Final Review & Approval",
      desc: "The final results undergo an internal audit and validation process before approval, ensuring accuracy, integrity, and credibility of the award outcomes.",
      number: "06",
    },
  ];

  return (
    <section className={`relative overflow-hidden pt-6 md:pt-10 pb-6 ${SECTION_BG}`}>
      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#d4af37]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#c62828]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-2xl xs:text-4xl md:text-5xl font-semibold font-heading mb-3 sm:mb-7 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
            Research Methodology
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {items.map((item, index) => (
            <div key={index} className="relative group flex flex-col items-center">
              {/* CARD */}
              <div className="relative w-full flex flex-col min-h-[250px] bg-gradient-to-br from-black/80 via-black/40 to-black/70 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-[#efd779]/10 hover:border-[#ffe98c]/60 hover:scale-105 hover:shadow-[0_8px_32px_-10px_#eed47ccc] transition-all duration-500">
                {/* Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#f7e7a1] via-[#eed47c] to-[#c9a530] flex items-center justify-center text-black font-bold text-base sm:text-lg shadow-lg border-2 border-[#d4af37] ring-2 ring-white/10">
                  {item.number}
                </div>
                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-[#f1d46b] to-[#d4af37] bg-clip-text text-transparent">
                  {item.title}
                </h3>
                {/* Desc */}
                <p className="text-sm sm:text-base text-[#e6ddcc] leading-relaxed flex-grow">
                  {item.desc}
                </p>
                <div className="mt-5 sm:mt-6 h-1 w-12 sm:w-14 bg-gradient-to-r from-[#d4af37] to-transparent opacity-40 rounded-full"></div>
              </div>

              {/* ARROWS */}
              {index !== items.length - 1 && (
                <>
                  {/* Desktop Right Arrow */}
                  <div className="hidden md:flex absolute right-[-40px] top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-gradient-to-br from-[#fffbe9] via-[#d4af37] to-[#c62828]/70 rounded-full shadow-lg p-[2.5px] border-2 border-[#eed47c]/50 animate-pulse-slow transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_2px_#d4af3766]">
                      <div className="bg-black/30 rounded-full p-0.5 flex items-center justify-center">
                        <svg width="34" height="34" viewBox="0 0 34 34" className="drop-shadow-lg" fill="none">
                          <defs>
                            <radialGradient id={`arrowGradient${index}`} cx="50%" cy="50%" r="70%">
                              <stop offset="0%" stopColor="#ffd657" />
                              <stop offset="80%" stopColor="#d4af37" />
                              <stop offset="100%" stopColor="#c62828" />
                            </radialGradient>
                          </defs>
                          <circle cx="17" cy="17" r="16" fill={`url(#arrowGradient${index})`} opacity="0.21" />
                          <path
                            d="M10 17h14m0 0l-5-5m5 5l-5 5"
                            stroke="#d4af37"
                            strokeWidth="2.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Down Arrow */}
                  <div className="md:hidden flex flex-col items-center mt-4 z-20">
                    <div className="bg-gradient-to-br from-[#fffbe9] via-[#d4af37] to-[#c62828]/70 rounded-full shadow-lg p-[2.5px] border-2 border-[#eed47c]/50 animate-pulse-slow transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_2px_#d4af3766]">
                      <div className="bg-black/30 rounded-full p-0.5 flex items-center justify-center">
                        <svg width="34" height="34" viewBox="0 0 34 34" className="drop-shadow-lg" fill="none">
                          <defs>
                            <radialGradient id={`arrowGradientMobile${index}`} cx="50%" cy="50%" r="70%">
                              <stop offset="0%" stopColor="#ffd657" />
                              <stop offset="80%" stopColor="#d4af37" />
                              <stop offset="100%" stopColor="#c62828" />
                            </radialGradient>
                          </defs>
                          <circle cx="17" cy="17" r="16" fill={`url(#arrowGradientMobile${index})`} opacity="0.21" />
                          <path
                            d="M17 10v14m0 0l5-5m-5 5l-5-5"
                            stroke="#d4af37"
                            strokeWidth="2.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
