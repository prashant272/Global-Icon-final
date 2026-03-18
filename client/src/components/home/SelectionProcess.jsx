export default function SelectionProcess({ SECTION_BG }) {
  return (
    <section className={`relative pt-10 md:pt-20 pb-16 md:pb-24 overflow-hidden ${SECTION_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xs:w-[450px] md:w-[600px] h-[320px] xs:h-[450px] md:h-[600px] bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl xs:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow">
            Selection Process.
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {[
            {
              title: "Judging Criteria",
              desc: "A structured and transparent evaluation framework ensures credibility, consistency, and fairness across all nominations.",
              icon: "📋",
            },
            {
              title: "Persistent Fairness & Integrity",
              desc: "Each entry is reviewed independently by an eminent jury panel, maintaining complete impartiality and ethical standards.",
              icon: "⚖️",
            },
            {
              title: "Confidentiality",
              desc: "All nomination data, documentation, and evaluation outcomes are treated with the highest level of confidentiality.",
              icon: "🔒",
            },
          ].map((item, index) => (
            <div key={item.title} className="group h-full flex">
              {/* CARD */}
              <div className="relative flex flex-col text-center flex-grow bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-md rounded-3xl p-7 sm:p-9 md:p-10 border border-[#eed47c]/20 hover:border-[#ffd966]/70 hover:scale-105 hover:shadow-[0_8px_32px_-10px_#eed47ccc] transition-all duration-500">
                {/* Icon */}
                <div className="text-3xl sm:text-5xl mb-3 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-[#f1d46b] to-[#d4af37] bg-clip-text text-transparent">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-sm sm:text-base text-[#ecdcb9] leading-relaxed flex-grow">
                  {item.desc}
                </p>
                {/* Bottom Accent */}
                <div className="mt-4 sm:mt-6 h-1 w-10 sm:w-14 mx-auto bg-gradient-to-r from-[#d4af37] to-transparent opacity-40 rounded-full"></div>
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:via-[#d4af37]/10 group-hover:to-[#d4af37]/20 transition-all duration-700 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
