export default function Guests({ guests, sectionRefs, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-6 md:pt-12 pb-8 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] xs:w-[480px] md:w-[800px] h-[360px] xs:h-[480px] md:h-[800px] bg-[#d4af37]/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={(el) => (sectionRefs.current[11] = el)}
          className="opacity-0 transform translate-y-8 transition-all duration-700 text-center mb-10 md:mb-20"
        >
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow">
            Our Esteemed Guests & Speakers
          </h2>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {guests.map((member, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[12 + index] = el)}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 group"
            >
              {/* Card Container */}
              <div className="relative aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-1xl group-hover:border-[#d4af37]/50 transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] group-hover:-translate-y-3">
                
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={member.image || `/images/jury${index + 1}.jpeg`}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-110 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop";
                    }}
                  />
                  {/* Sophisticated Gradient - Bottom Heavy to protect faces */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  
                  {/* Top-Left Floating Tag (Mobile optimized) */}
                  <div className="absolute top-0.5 -left-1 z-20">
                    <span className="inline-block px-2.5 py-1 bg-[#d4af37] text-black text-[6px] sm:text-[10px] font-black uppercase tracking-[0.1em] rounded-lg shadow-xl border border-white/20">
                      Guest Speaker
                    </span>
                  </div>
                </div>
 
                {/* Content Overlay - FULL GLASSMORPHISM Block */}
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-5 z-10">
                  <div className="bg-white/10 backdrop-blur-1xl border border-white/30 rounded-xl sm:rounded-2xl p-2 sm:p-5 shadow-2xl transform transition-all duration-700 group-hover:bg-white/15">
                    <h4 className="text-[10px] sm:text-lg md:text-2xl font-black text-white mb-0.5 sm:mb-1.5 leading-tight tracking-tight drop-shadow-lg line-clamp-2">
                       {member.name}
                    </h4>
                    
                    {/* Decorative Line */}
                    <div className="w-6 sm:w-10 h-[1px] sm:h-[2px] bg-white/20 mb-1 sm:mb-3 group-hover:bg-[#d4af37] group-hover:w-full transition-all duration-1000" />
                    
                    <p className="text-[7px] sm:text-[11px] text-white/90 font-bold leading-relaxed uppercase tracking-[0.1em] sm:tracking-[0.15em] line-clamp-1 sm:line-clamp-2">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Subtle Shine Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.1] to-white/0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
