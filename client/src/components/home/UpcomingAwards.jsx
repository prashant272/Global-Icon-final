import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function UpcomingAwards({ upcomingAwards, HIGHLIGHT_BG }) {
  return (
    <section className={`relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden ${HIGHLIGHT_BG}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#c62828]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-2xl px-2">
            Our Other Upcoming Awards
          </h2>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          <p className="mt-4 sm:mt-6 text-[#ebdcc8] text-sm sm:text-base md:text-lg max-w-2xl mx-auto italic font-medium px-4">
            Join us in celebrating excellence across various industries globally.
          </p>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            speed={1500}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 25,
                centeredSlides: false
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="pb-16 sm:pb-24 !px-4 sm:!px-0"
          >
            {upcomingAwards.map((award, index) => (
              <SwiperSlide key={index}>
                <div className="group relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[3/4] sm:aspect-[2/2.5] max-w-[320px] sm:max-w-sm mx-auto border border-white/10 hover:border-[#d4af37]/50 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.4)]">

                  {/* Full Background Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900">
                    <img
                      src={award.banner}
                      alt={award.title}
                      className="w-full h-full object-fill transition-transform duration-[4s] group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay for Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700"></div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-between p-5 sm:p-8 z-10">

                    {/* Top: Location Tag */}
                    <div className="flex justify-start">
                      <span className="px-3 py-1.5 rounded-full bg-[#d4af37] text-black text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em] shadow-xl border border-white/20">
                        {award.location}
                      </span>
                    </div>

                    {/* Bottom: Title and Button */}
                    <div className="space-y-3 sm:space-y-4 translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-2xl line-clamp-2">
                        {award.title}
                      </h3>

                      <a
                        href={award.link || `/upcoming-awards/${award.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center py-3 sm:py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.5)]"
                      >
                        View Details
                      </a>
                    </div>
                  </div>

                  {/* Top-right Shine Effect on Hover */}
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
