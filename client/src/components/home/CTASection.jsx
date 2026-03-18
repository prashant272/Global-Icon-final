export default function CTASection({ handleNominateClick, sectionRefs, PRIMARY_BG }) {
  return (
    <section className={`relative pt-10 sm:pt-14 md:pt-20 pb-12 sm:pb-20 md:pb-28 text-center overflow-hidden ${PRIMARY_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#c62828]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div
        ref={(el) => (sectionRefs.current[21] = el)}
        className="relative z-10 opacity-0 transform translate-y-8 transition-all duration-700 max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6"
      >
        <h2 className="text-xl xs:text-3xl md:text-5xl font-extrabold font-heading mb-4 md:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
          Get the recognition you and your team deserve
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-5 sm:mb-8"></div>
        <p className="mb-8 sm:mb-12 text-[#ebdcc8] text-base sm:text-lg md:text-xl">
          Nomination Extended Deadline – <span className="font-semibold bg-gradient-to-r from-[#d4af37] to-[#f1d46b] bg-clip-text text-transparent">10 March 2026</span>
        </p>
        <button
          type="button"
          onClick={handleNominateClick}
          className="relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#d4af37] text-black font-extrabold px-8 sm:px-12 md:px-16 py-4 sm:py-5 text-base md:text-lg transition-all duration-300 tracking-wide hover:scale-110 hover:shadow-[0_4px_32px_-4px_#d4af3780] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
        >
          <span className="relative z-10">Nominate Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-1000 pointer-events-none"></div>
        </button>
      </div>
    </section>
  );
}
