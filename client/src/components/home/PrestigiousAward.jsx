import React from 'react';
import { getAwardName } from "../../utils/brand.js";

const PrestigiousAward = ({ SECTION_BG }) => {
  const sections = [
    {
      title: "Global Achievers Summit & Awards 2026 – Washington DC, USA Edition",
      subtitle: "Washington DC Edition",
      description:
        "The Global Achievers Summit & Awards, 2026 is an elite international platform honoring leaders, innovators, and achievers from diverse fields who have made a global impact. Scheduled for 12 October 2026 in Washington DC, USA, it stands as a premium stage for global networking and high-level honors.",
      highlight: "Honouring Global Achievers, Innovation & Leadership.",
      image: "/Awards/archivers.jpeg",
      reverse: false,
      link: "/nominate?award=Global%20Achievers%20Summit%20%26%20Awards%202026%20%E2%80%93%20Washington%20DC%2C%20USA%20Edition",
      stats: ["Washington DC, USA", "Global Achievers", "12 October 2026"]
    },
    {
      title: "Global Icon Awards & Summit 2026 – Dubai Edition",
      subtitle: "Dubai Edition",
      description:
        "The Global Icon Awards & Summit, 2026 is an elite international platform honoring leaders, innovators, and achievers from diverse fields who have made a global impact. Scheduled for 30 October 2026 in Dubai, it stands as a premium stage for global networking and high-level honors.",
      highlight: "Honouring Global Icons, Innovation & Leadership.",
      image: "/Awards/global_icon_dubai_sania.jpg",
      reverse: true,
      link: "/nominate?award=Global%20Icon%20Awards%20%26%20Summit%202026%20%E2%80%93%20Dubai%20Edition",
      stats: ["Dubai, UAE", "Global Icons", "30 October 2026"]
    },
    {
      title: "ASIA ALLIANCE SUMMIT & AWARDS 2026 – Dubai Edition",
      subtitle: "Asia Alliance Dubai",
      description:
        "The Asia Alliance Summit & Awards 2026 is a premium event celebrating the visionaries, leaders, and most outstanding organizations that are shaping the future of the Asian continent. Hosted in Dubai on 30 October 2026, it brings together top professionals to honor exceptional contributions across various sectors.",
      highlight: "Honouring Asian Leadership, Innovation & Impact.",
      image: "/Awards/asia_alliance.jpg",
      reverse: false,
      link: "/nominate?award=ASIA%20ALLIANCE%20SUMMIT%20%26%20AWARDS%202026%20%E2%80%93%20Dubai%20Edition",
      stats: ["Dubai, UAE", "Asia Alliance", "30 October 2026"]
    }
  ];

  return (
    <section className={`py-8 md:py-12 overflow-hidden ${SECTION_BG} relative`}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 md:opacity-10">
        <div className="absolute top-1/4 -left-10 md:-left-20 w-64 md:w-96 h-64 md:h-96 bg-[#d4af37] rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-10 md:-right-20 w-64 md:w-96 h-64 md:h-96 bg-[#d4af37] rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[#d4af37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Prime Time Research Media
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-white inline-block">
            Most{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#b6932f] bg-clip-text text-transparent">
              Prestigious
            </span>{" "}
            {getAwardName()}
          </h2>
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-[#d4af37] rotate-45"></div>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          <p className="mt-6 text-[#e6dfcc] text-base md:text-lg max-w-2xl mx-auto font-medium">
            Recognising excellence in business, leadership, and innovation across global platforms.
          </p>
        </div>

        {/* Award Sections Grid */}
        <div className="space-y-10 lg:space-y-20">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
            >
              {/* Image side */}
              <div className={`w-full group flex flex-col ${sec.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative flex-1 flex flex-col h-full">
                  {/* Image Border/Glow */}
                  <div className="absolute -inset-1.5 md:-inset-2 bg-gradient-to-r from-[#d4af37]/25 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>

                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 bg-gradient-to-br from-[#1a110a] via-[#100a06] to-[#050302] p-0 w-full flex-1 min-h-[240px] sm:min-h-[320px] lg:h-full lg:min-h-0">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-fill transform transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Subtle bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={`w-full space-y-5 md:space-y-6 flex flex-col justify-center ${sec.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-2">
                  <span className="text-[#d4af37] text-xs md:text-sm font-bold uppercase tracking-[0.3em] block">
                    {sec.subtitle}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight">
                    {sec.title}
                  </h2>
                  <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full"></div>
                </div>

                <p className="text-[#e6dfcc] text-base md:text-lg leading-relaxed font-medium">
                  {sec.description}
                </p>

                <div className="bg-white/5 border-l-4 border-[#d4af37] p-5 rounded-r-2xl backdrop-blur-sm">
                  <p className="text-[#f1d46b] text-base md:text-lg font-bold italic leading-relaxed">
                    "{sec.highlight}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 md:gap-3 items-center">
                  <a
                    href={`/nominate?award=${encodeURIComponent(sec.title)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#f1d46b] text-black font-black text-xs md:text-sm uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    Nominate Now
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a
                    href={sec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:scale-95 bg-white/5 backdrop-blur-sm"
                  >
                    Know More
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {sec.stats && sec.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[10px] md:text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrestigiousAward;
