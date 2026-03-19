export default function Guests({ guests, sectionRefs, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-6 md:pt-12 pb-8 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] xs:w-[480px] md:w-[800px] h-[360px] xs:h-[480px] md:h-[800px] bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={(el) => (sectionRefs.current[11] = el)}
          className="opacity-0 transform translate-y-8 transition-all duration-700 text-center mb-14 md:mb-20"
        >
          <h2 className="text-2xl xs:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow">
            Our Esteemed Guests & Speakers
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {guests.map((member, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[12 + index] = el)}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 group"
            >
              {/* Card Container */}
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden border border-[#d4af37]/30 bg-black/40 backdrop-blur-xl group-hover:border-[#d4af37]/60 transition-all duration-700 shadow-2xl group-hover:-translate-y-4">
                
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={member.image || `/images/jury${index + 1}.jpeg`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-75 group-hover:brightness-90"
                    loading="lazy"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <p className="text-[10px] text-[#ffd966] font-black uppercase tracking-[0.4em] mb-2 opacity-80">Guest Speaker</p>
                    <h4 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-xl">
                      {member.name}
                    </h4>
                    <div className="w-12 h-1 bg-[#d4af37] mb-4 group-hover:w-20 transition-all duration-700" />
                    <p className="text-xs text-[#d4af37b0] font-bold leading-relaxed line-clamp-2 uppercase tracking-widest italic">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Shine Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
