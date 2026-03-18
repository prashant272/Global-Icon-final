import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function Categories({ nomineeCategories, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden ${HIGHLIGHT_BG}`}>
      {/* Animated Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#c62828]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-6 group hover:bg-[#d4af37]/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase">Nomination Categories</span>
          </div>

          <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl">
            Who Should Nominate
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          <p className="mt-8 text-[#dbc6ad] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We invite visionaries and institutions that are shaping the future of their respective industries to join our prestigious circle of excellence.
          </p>

          {/* Premium Sector Tags */}
          <div className="mt-10 mb-12 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              "Healthcare", "Education", "Real Estate & Infrastructure", "Hospitality & Tourism",
              "Manufacturing & Industrial", "Beauty & Wellness", "Technology & Digital Transformation",
              "Finance & Banking", "Sustainability & Environment", "Public & Government Sector",
              "Media, Culture & Sports"
            ].map((sector, idx) => (
              <div key={idx} className="px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#ffeec3] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300">
                {sector}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={1500}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="pb-16"
          >
            {nomineeCategories.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto flex flex-col">
                <div
                  className="group relative flex flex-col p-8 sm:p-10 bg-gradient-to-br from-[#2a1b12]/90 via-[#1a110a]/95 to-[#2a1b12]/90 backdrop-blur-xl rounded-[2rem] border border-[#d4af37]/20 hover:border-[#d4af37]/80 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_#d4af3744] hover:-translate-y-3 mx-auto max-w-sm w-full flex-grow"
                >
                  {/* Main Card Content */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon with Glow */}
                  <div className="relative mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative text-5xl md:text-6xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                      {item.icon}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl font-black mb-4 bg-gradient-to-r from-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#ffeec3] transition-all duration-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#dbc6ad] leading-relaxed group-hover:text-white/90 transition-colors flex-grow">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Accent Loader */}
                  <div className="mt-8 h-1 w-12 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full group-hover:w-full transition-all duration-700 opacity-40 group-hover:opacity-100"></div>

                  {/* Outer Card Glow Overlay */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-[#d4af37]/40 via-transparent to-[#d4af37]/40 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[2px] -z-10 transition-opacity duration-500"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
