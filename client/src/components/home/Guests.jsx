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
        
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-y-9 gap-x-5 xs:gap-x-8">
          {guests.map((member, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[12 + index] = el)}
              className="text-center group opacity-0 transform translate-y-8 transition-all duration-700 flex flex-col items-center"
            >
              <div
                className="relative mx-auto mb-5 sm:mb-6 h-32 w-32 xs:h-44 xs:w-44 md:h-56 md:w-56 rounded-full overflow-visible bg-gradient-to-br from-[#d4af37]/30 via-[#fffbe9]/20 to-[#c62828]/25 p-[4px] group-hover:p-[7px] transition-all duration-400 shadow-xl group-hover:shadow-2xl"
                style={{
                  boxShadow: '0 6px 28px 0 rgba(212,175,55,0.12), 0 1.5px 6px 0 #fffbe950'
                }}
              >
                <div
                  className="absolute inset-0 rounded-full border-2 xs:border-4 border-transparent bg-gradient-to-r from-[#ffe684] via-[#c62828] to-[#d4af37] opacity-0 group-hover:opacity-90 group-hover:animate-spin"
                  style={{ animationDuration: '7s', zIndex: 1 }}
                ></div>
                <div className="absolute inset-[7px] xs:inset-2 rounded-full border-2 border-[#d4af37]/50 group-hover:border-[#ffd966]/90 transition-all duration-500" style={{
                  boxShadow: '0 0 8px 2px #ffeec390,0 2px 8px #d4af3740'
                }}></div>
                <div className="relative z-10 h-full w-full rounded-full overflow-hidden bg-[#2a1b12]">
                  <img
                    src={`/images/jury${index + 1}.jpeg`}
                    alt={member.name}
                    className="h-full w-full rounded-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105 bg-[#221710]"
                    loading="lazy"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-20 md:w-28 bg-black/10 rounded-full blur-md"></div>
              </div>
              <p className="font-bold text-base xs:text-lg md:text-xl text-white mb-1 md:mb-2 group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1 drop-shadow">
                {member.name}
              </p>
              <div className="w-9 xs:w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-1 xs:mb-3 opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-500"></div>
              <p className="text-xs xs:text-sm md:text-base text-[#dbc6ad] leading-relaxed group-hover:text-[#fffbe9] transition-colors duration-300 line-clamp-2">
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
