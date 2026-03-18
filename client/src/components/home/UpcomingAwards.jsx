import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function UpcomingAwards({ upcomingAwards, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden ${HIGHLIGHT_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#c62828]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-xl">
            Our Other Upcoming Awards
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          <p className="mt-6 text-[#ebdcc8] text-base sm:text-lg max-w-2xl mx-auto">
            Join us in celebrating excellence across various industries globally.
          </p>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 2000,
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
            }}
            className="pb-16"
          >
            {upcomingAwards.map((award, index) => (
              <SwiperSlide key={index}>
                <div className="group relative flex flex-col rounded-2xl bg-gradient-to-br from-[#0f0805] to-[#0a0503] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:shadow-[0_20px_40px_-12px_#d4af3733] overflow-hidden max-w-sm mx-auto h-full">
                  {/* Banner Image - Adjusted for better fitting */}
                  <div className="relative h-52 overflow-hidden bg-black/50">
                    <img
                      src={award.banner}
                      alt={award.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider">
                        {award.location}
                      </span>
                    </div>
                  </div>

                  {/* Content - More compact */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 text-[#ffeec3] group-hover:text-white transition-colors line-clamp-2">
                      {award.title}
                    </h3>
                    <p className="text-[#d4af37] font-semibold text-xs mb-3">
                      {award.date}
                    </p>
                    <p className="text-[#dbc6ad] text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors flex-grow line-clamp-3">
                      {award.desc}
                    </p>

                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 relative overflow-hidden group/btn rounded-lg bg-gradient-to-r from-[#d4af37] to-[#a28533] text-black font-bold px-4 py-2 text-sm text-center transition-all duration-300 hover:brightness-110"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Visit Website
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
