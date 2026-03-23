import { getAwardName } from "../../utils/brand.js";

export default function OverviewDates({ handleNominateClick, SECTION_BG }) {
  const awardName = getAwardName();

  return (
    <section className={`relative py-12 lg:py-16 overflow-hidden ${SECTION_BG} border-b border-[#d4af37]/20`}>
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#d4af37]/20 via-[#d4af37]/10 to-transparent rounded-full mix-blend-screen blur-[120px] animate-blob" />
        <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-[#c62828]/20 via-[#d4af37]/10 to-transparent rounded-full mix-blend-screen blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">
          {/* ==== LEFT: OVERVIEW (Col span 7) ==== */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center lg:pr-16">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2a1b12]/20 backdrop-blur-2xl border border-[#d4af37]/20 shadow-2xl hover:bg-[#392818]/20 hover:border-[#d4af37]/40 transition-all duration-500 group/badge w-fit">
              <div className="relative">
                <svg className="w-5 h-5 text-[#d4af37] group-hover/badge:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl rounded-full animate-pulse"></div>
              </div>
              <span className="text-sm font-bold tracking-wider text-[#ffeec3]">ABOUT THE AWARDS</span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl lg:text-3xl font-black mb-6 leading-none flex items-center gap-3 whitespace-nowrap">
                <span className="text-[#d4af37] italic opacity-80">Overview of</span>
                <span className="bg-gradient-to-r from-white to-[#d4af37] bg-clip-text text-transparent uppercase tracking-wider">
                  {awardName}
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#c5b471] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            </div>

            <div className="relative group">
              {/* Animated Glow Backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/30 via-[#f1d46b]/10 to-[#b6932f]/30 opacity-20 group-hover:opacity-40 blur-3xl transition-all duration-1000 rounded-[2rem]" />
              
              <div className="relative bg-[#1a110a]/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-700 p-8 lg:p-12">
                {/* SEO Paragraph - Hidden */}
                <p className="sr-only">
                  Business Excellence Awards, recognize excellence, innovation, and leadership across Healthcare, Education, Business, Dental, and Lifestyle sectors worldwide.
                </p>
                
                {/* Distinctive Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                
                {/* Floating Geometric Decor */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#d4af37]/10 to-transparent blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />

                <div className="relative space-y-10">
                  {/* Card Header Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    <div className="relative flex-shrink-0 group/icon">
                      {/* Double Ring Animated Borders */}
                      <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl rounded-2xl group-hover/icon:animate-pulse" />
                      <div className="absolute -inset-2 border border-[#d4af37]/10 rounded-2xl group-hover/icon:border-[#d4af37]/30 transition-colors duration-500 rotate-6" />
                      
                      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#1a110a] to-[#2a1b12] border border-[#d4af37]/30 shadow-2xl transform transition-transform group-hover/icon:scale-110 duration-500">
                        <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center sm:text-left">
                      <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-3">
                        {awardName}, 2026
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <span className="h-px w-10 bg-[#d4af37]"></span>
                        <p className="text-[#d4af37] font-bold text-sm uppercase tracking-[0.3em]">
                          Global Recognition & Honor
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description Paragraphs with Better Spacing */}
                  <div className="space-y-8 text-[#f5f3f0]/90 leading-relaxed text-lg lg:text-xl font-medium">
                    <p>
                      <span className="text-[#ffd966] font-bold">Prime Time Research Media</span> has conducted multiple national and international awards and business summits in different countries such as <span className="bg-[#d4af37]/10 px-3 py-1 rounded-lg text-[#f1d46b] border border-[#d4af37]/20 font-bold">India, USA, Dubai and UK</span> to recognize excellence in business, leadership, innovation, and professional achievements.
                    </p>
                    <p className="border-l-4 border-[#d4af37]/30 pl-8 italic text-[#e6dfcc] text-xl lg:text-2xl leading-snug">
                      "These events honour individuals and organizations who have shown outstanding performance, dedication, and commitment in their respective fields."
                    </p>
                    <p>
                      The <span className="text-white font-bold border-b-2 border-[#d4af37]/40 pb-1">{awardName}, 2026</span> is one of the prestigious initiatives that brings together industry leaders, entrepreneurs, and professionals on a single platform to celebrate success, reputation, and quality service.
                    </p>
                  </div>

                  {/* Enhanced Feature Pills */}
                  <div className="flex flex-wrap gap-5 pt-4">
                    {['Excellence', 'Innovation', 'Leadership', 'Quality'].map((feature, idx) => (
                      <div
                        key={idx}
                        className="group/pill relative px-6 py-3 rounded-2xl text-base font-bold text-[#ffeec3] bg-white/5 border border-white/10 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 transition-all duration-300 cursor-default"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#d4af37] group-hover/pill:scale-150 transition-transform"></span>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==== VERTICAL SEPARATOR (Desktop Only) ==== */}
          <div className="hidden lg:flex lg:col-span-1 justify-center relative">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a110a] border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <svg className="w-4 h-4 text-[#d4af37] animate-pulse" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" /></svg>
              </div>
            </div>
          </div>

          {/* ==== RIGHT: Key Dates (Col span 4) ==== */}
          <div className="lg:col-span-4 space-y-10 flex flex-col pt-4 lg:pt-0">
            <div className="lg:pl-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#ffeec3] via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent">
                  Key Dates
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] rounded-full" />
            </div>

            {/* Timeline Style Cards */}
            <div className="space-y-6 lg:pl-8">
              {[
                {
                  title: "India Excellence Awards & Conference 2026",
                  date: "17 May 2026",
                  icon: (
                    <span className="block w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#ead481] flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                      <span className="text-2xl">🇮🇳</span>
                    </span>
                  ),
                  border: "from-[#d4af37] to-[#ead481]",
                },
                {
                  title: 'Business and Leadership Summit 2026– USA Edition',
                  date: '30 June 2026',
                  icon: (
                    <span className="block w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#ead481] flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                      <span className="text-2xl">🇺🇸</span>
                    </span>
                  ),
                  border: 'from-[#d4af37] to-[#ead481]',
                },
                {
                  title: 'Invest India Summit 2026 – UK Edition',
                  date: '7 May 2026',
                  icon: (
                    <span className="block w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#ead481] flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                      <span className="text-2xl">🇬🇧</span>
                    </span>
                  ),
                  border: 'from-[#d4af37] to-[#ead481]',
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group"
                  style={{ animation: `fadeInRight 0.8s ease-out ${(idx + 1) * 150}ms both` }}>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.border} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl`} />
                  <div className="relative bg-[#1f140d]/80 backdrop-blur-2xl rounded-2xl border border-[#ffeec3]/10 shadow-xl overflow-hidden hover:bg-[#2a1b12]/50 hover:border-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#ffeec3]/10 transform hover:-translate-y-1 transition-all duration-500">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${item.border}`} />
                    <div className="p-8 flex items-center gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">{item.icon}</div>
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-black text-[#ffeec3] mb-2 leading-tight group-hover:text-[#ffb400] transition-colors duration-300">{item.title}</h3>
                        <div className="flex items-center gap-3 text-[#ffd966]">
                          <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                          <span className="font-bold text-lg">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="relative group mt-4 lg:ml-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#d4af37] opacity-20 group-hover:opacity-40 blur-xl transition-all duration-700 rounded-3xl" />
              <div className="relative bg-[#2a1b12]/70 backdrop-blur-xl rounded-3xl border border-[#ffeec3]/30 shadow-2xl overflow-hidden hover:bg-[#392818]/60 hover:border-[#d4af37]/50 transition-all duration-500 p-10">
                {/* Gold Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd966] via-[#ffeec3] to-[#d4af37]" />
                <div className="flex items-center gap-5 mb-6">
                  <span className="text-4xl animate-bounce">🏆</span>
                  <h4 className="text-2xl font-black text-[#ffeec3] uppercase tracking-tighter">Don't Miss Out!</h4>
                </div>
                <p className="text-[#eedea7] leading-relaxed mb-8 font-semibold text-xl">
                  Please submit your nomination.
                </p>
                <button onClick={handleNominateClick} className="relative w-full py-5 px-8 rounded-2xl font-black text-[#392818] overflow-hidden group/btn transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#a28533] shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]">
                  <span className="relative z-10 text-xl tracking-widest uppercase">Nominate Now</span>
                  <svg className="w-6 h-6 relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-500 text-[#392818]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Decorative */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-[#ffeec3]/70 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#ffeec3]/50" />
            <svg className="w-4 h-4 animate-pulse text-[#ffd966]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
            <span className="font-medium">Celebrating Excellence Across Industries</span>
            <svg className="w-4 h-4 animate-pulse animation-delay-1000 text-[#ffd966]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#ffeec3]/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
