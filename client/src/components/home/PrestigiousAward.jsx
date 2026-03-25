import React from 'react';
import { getAwardName } from "../../utils/brand.js";

const PrestigiousAward = ({ SECTION_BG }) => {
  const sections = [
 {
  title: "India Excellence Awards & Conference 2026",
  subtitle: "Mumbai Edition",
  description:
    "Prime Time Research Media presents the India Excellence Awards & Conference 2026, a prestigious platform honouring outstanding entrepreneurs, professionals, and organizations for their excellence, innovation, and leadership across various industries. The event will be held in Mumbai on 17th May 2026 with distinguished guests and award winners from across India.",
  highlight: "Honouring Excellence, Innovation & Leadership.",
  image: "/Awards/excellence.jpeg",
  reverse: false,
  link: "https://india-excellence.primetimemedia.in/upcoming-awards/india-excellence-awards-2026/"
},
    {
    title: "USA Business & Leadership Summit 2026",
    subtitle: "Washington DC Edition",
    description:
      "Prime Time Research Media presents the USA Business & Leadership Summit 2026, a prestigious international platform honouring entrepreneurs, professionals, and organizations creating global impact through leadership, innovation, and growth. The summit brings together distinguished personalities at Capitol Hill, Washington DC.",
    highlight: "Honouring Leadership, Innovation & Global Growth.",
    image: "/Awards/usa.png",
    reverse: true,
    link: "https://business-leadership.primetimemedia.in//upcoming-awards/usa-business-leadership-summit"
  },
{
  title: "Invest India Summit 2026",
  subtitle: "UK Edition – London",
  description:
    "Prime Time Research Media presents Invest India Summit 2026 – UK Edition, a global platform focused on investment, business growth, and international leadership. The summit connects entrepreneurs, professionals, and organizations to global markets and strategic opportunities in London, UK.",
  highlight: "Fostering Investment, Leadership, and Global Opportunities.",
  image: "/Awards/uk.png",
  reverse: false,
  link: "https://investment-india.primetimemedia.in/upcoming-awards/invest-india-summit-2026---uk-edition"
},
  ];

  return (
    <section className={`py-12 md:py-20 overflow-hidden ${SECTION_BG} relative`}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 md:opacity-10">
        <div className="absolute top-1/4 -left-10 md:-left-20 w-64 md:w-96 h-64 md:h-96 bg-[#d4af37] rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-10 md:-right-20 w-64 md:w-96 h-64 md:h-96 bg-[#d4af37] rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
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

        {sections.map((sec, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col ${sec.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 md:gap-12 mb-12 md:mb-20 last:mb-0`}
          >
            {/* Image side */}
            <div className="w-full lg:w-1/2 group">
              <div className="relative">
                {/* Image Border/Glow */}
                <div className="absolute -inset-1.5 md:-inset-2 bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl skew-x-1 group-hover:skew-x-0 transition-transform duration-700">
                  <div className="w-full h-[240px] sm:h-[340px] md:h-[380px] lg:h-[420px] bg-[#050302] flex items-center justify-center">
                    <img 
                      src={sec.image} 
                      alt={sec.title} 
                      className="w-full h-full object-contain transform transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  {/* Subtle bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-[#050302]/60 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
              <div className="space-y-1.5 md:space-y-2">
                <span className="text-[#d4af37] text-xs md:text-sm font-bold uppercase tracking-[0.3em] block">
                  {sec.subtitle}
                </span>
                <h2 className="text-2xl md:text-5xl font-black text-white leading-tight">
                  {sec.title}
                </h2>
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full"></div>
              </div>

              <p className="text-[#e6dfcc] text-base md:text-lg leading-relaxed font-medium">
                {sec.description}
              </p>

              <div className="bg-white/5 border-l-4 border-[#d4af37] p-4 md:p-6 rounded-r-2xl backdrop-blur-sm">
                <p className="text-[#f1d46b] text-lg md:text-xl font-bold italic">
                  "{sec.highlight}"
                </p>
              </div>

              <div className="pt-3 md:pt-4 flex flex-wrap gap-3 md:gap-4 items-center">
                <a
                  href={`/nominate?award=${encodeURIComponent(sec.title)}`}
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#f1d46b] text-black font-black text-xs md:text-sm uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
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
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 active:scale-95 bg-white/5 backdrop-blur-sm"
                >
                  Know More
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[10px] md:text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                  Corporate Leaders
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[10px] md:text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                  Innovation Hub
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrestigiousAward;
