export default function WhyEnter({ sectionRefs, getGridCols, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-6 pb-16 md:pb-24 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[320px] sm:w-[420px] md:w-[500px] h-[320px] sm:h-[420px] md:h-[500px] bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[320px] sm:w-[420px] md:w-[500px] h-[320px] sm:h-[420px] md:h-[500px] bg-[#c62828]/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className="opacity-0 transform translate-y-8 transition-all duration-700 text-center mb-16 relative"
        >
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            The Value of Excellence
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white inline-block">
            Why Enter <span className="bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#b6932f] bg-clip-text text-transparent">Prime Time Awards</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rounded-full border border-[#d4af37] rotate-45"></div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </div>

        <div
          className={`grid ${getGridCols(2)} md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10`}
        >
          {[
            {
              title: "Global Recognition",
              desc: "Gain prestigious recognition across all major sectors and position your organisation among the most trusted and respected industry leaders worldwide.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              ),
            },
            {
              title: "Independent Jury",
              desc: "All nominations are evaluated by an eminent and independent jury panel, ensuring credibility, transparency, and unbiased assessment.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              ),
            },
            {
              title: "Showcase Innovation",
              desc: "Highlight your pedagogical innovations and academic achievements before policymakers and industry leaders on a global platform.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              ),
            },
            {
              title: "Brand Authority",
              desc: "Enhance institutional reputation and reinforce trust among parents, students, partners, and the broader educational ecosystem.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              ),
            },
            {
              title: "Benchmark Excellence",
              desc: "Measure your performance against industry best practices, global standards, and emerging educational trends.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              ),
            },
            {
              title: "Future-Ready",
              desc: "Demonstrate your organisation's readiness for future challenges through leadership, scalability, and sustainable growth.",
              icon: (
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[5 + index] = el)}
              className="group relative opacity-0 transform translate-y-8 transition-all duration-1000 flex"
            >
              {/* Glass Card */}
              <div className="relative w-full bg-[#0a0503]/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-[#d4af37]/40 shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden">
                
                {/* Accent Decor */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#d4af37]/10 to-transparent blur-3xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                  <div className="relative p-4 rounded-2xl bg-[#2a1b12] border border-[#d4af37]/30 shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 group-hover:text-[#f1d46b] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#e6dfcc] leading-relaxed text-base font-medium flex-grow group-hover:text-white transition-colors duration-300">
                  {item.desc}
                </p>
                
                {/* Bottom Shine */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/0 to-transparent group-hover:via-[#d4af37]/40 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
