export default function FAQs({ homeFaqs, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-12 md:pt-20 pb-16 md:pb-28 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Premium Glow Ornaments */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-[#d4af37]/25 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-1/6 w-96 h-96 bg-gradient-to-tr from-[#c62828]/15 via-[#d4af37]/10 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 xs:px-3 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl xs:text-5xl md:text-6xl font-heading font-extrabold bg-gradient-to-r from-[#fffbe7] via-[#ffe79b] via-50% to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 w-28 sm:w-40 h-[5px] mx-auto rounded-full bg-gradient-to-r from-transparent via-[#ffd966] to-transparent shadow-[0_0_24px_2px_#ffeec3]" />
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#ffefb0] max-w-2xl mx-auto font-medium tracking-wide leading-relaxed">
            <span className="bg-gradient-to-br from-[#fffbe7] via-[#ffe79b] to-[#d4af37] bg-clip-text text-transparent font-bold">Your most essential queries about nominations, eligibility, and benefits—</span>
            for the complete FAQ, please visit our FAQ page.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {homeFaqs.map((item, index) => (
            <div
              key={index}
              className="relative flex h-full"
            >
              <div
                className="
                  group
                  relative
                  flex flex-col
                  flex-grow
                  overflow-visible
                  bg-gradient-to-br from-[#2a1b12]/70 via-[#3c230f]/90 to-[#dac377]/10
                  border border-[#eed47c]/20
                  hover:border-[#ffd966]
                  rounded-2xl sm:rounded-3xl
                  p-5 xs:p-6 sm:p-7 md:p-8
                  shadow-[0_8px_22px_-8px_#eed47c66]
                  hover:shadow-[0_16px_28px_-8px_#ffd96677]
                  transition-all duration-300
                  cursor-pointer
                  w-full
                  min-h-[240px] xs:min-h-[200px] sm:min-h-[240px] md:min-h-[220px]
                  max-w-full
                  box-border
                "
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {/* Q Number Circle - moved INSIDE card content */}
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#fbf6df] via-[#ffe7a1] to-[#d4af37] rounded-full shadow-lg w-8 h-8 text-base sm:text-xl font-bold text-[#a28533] border-2 border-[#ffeec3]/70">
                    Q{index + 1}
                  </span>
                </div>
                {/* Decorative Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#ffeec3]/10 via-transparent to-transparent opacity-70 -z-10 rounded-b-3xl pointer-events-none" />
                {/* Inner Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Question */}
                  <h3 className="mb-2 sm:mb-3 text-base xs:text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-[#ffeec3] via-[#ffe07d] to-[#d4af37] bg-clip-text text-transparent drop-shadow group-hover:scale-105 group-hover:drop-shadow-[0_2px_12px_#ffeec399] transition duration-300 break-words">
                    {item.q}
                  </h3>
                  {/* Answer */}
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#ffeec3]/90 leading-relaxed font-medium bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#fff7cf] group-hover:via-[#ffefb0] group-hover:to-[#ffe07d] group-hover:text-transparent transition-colors duration-300 break-words line-clamp-6 sm:line-clamp-5">
                    {item.a}
                  </p>
                </div>

                {/* Bottom premium accent */}
                <div className="mt-6 h-1 w-14 sm:w-20 mx-auto rounded-full bg-gradient-to-r from-[#ffeec3] via-[#ffd966] to-transparent opacity-60" />

                {/* Subtle floating gold particles effect (decorative dots) */}
                <div className="absolute left-2 bottom-2 h-2 w-2 bg-[#ffeec3]/30 rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute right-3 top-3 h-2 w-2 bg-[#ffd966]/20 rounded-full blur-[1.5px] animate-pulse delay-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
