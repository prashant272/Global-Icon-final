import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Hero({ videoRef, events, handleNominateClick }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0503]">
      {/* ===== BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_30%] transition-all duration-700 max-h-[120vh] min-h-full"
          src="/videos/hero.mp4"
          autoPlay muted loop playsInline preload="auto"
          poster="/videos/hero-poster.jpg"
          style={{ background: "linear-gradient(180deg,#0f0805,#0a0503 80%)", minHeight:"100%", maxHeight:"120vh", minWidth:"100%" }}
        />
        <noscript>
          <img src="/videos/hero-poster.jpg" alt="Award Ceremony" className="w-full h-full object-cover object-center" />
        </noscript>
        <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#0a0503]/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ===== GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/70 via-black/30 to-[#0a0503]/60" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-15 md:pt-24 pb-10 text-center">

        {/* ===== FLOATING PARTICLES ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-bounce shadow-lg"
              style={{
                width: i % 3 === 0 ? '1.5rem' : i % 2 === 0 ? '1rem' : '0.75rem',
                height: i % 3 === 0 ? '1.5rem' : i % 2 === 0 ? '1rem' : '0.75rem',
                background: i % 2 === 0 ? '#d4af37aa' : '#ffd96666',
                opacity: i % 2 === 0 ? 0.33 : 0.18,
                left: `${10 + i * (7 + i)}%`,
                top: `${25 + ((i * 11) % 60)}%`,
                animationDelay: `${i * 0.35}s`,
                animationDuration: `${2.7 + i * 0.77}s`,
                zIndex: 3 + i,
                filter: "blur(0.1px)",
              }}
            />
          ))}
        </div>

        {/* ===== HERO TEXT ===== */}
        <div className="max-w-[48rem] mx-auto space-y-5 sm:space-y-1 animate-fade-in relative">
          <div className="absolute inset-0 -inset-x-20 bg-black/20 blur-3xl -z-10 rounded-full" />
          <h1 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight drop-shadow-2xl flex items-center justify-center flex-wrap gap-y-2">
            <span className="text-[#ffeec3] opacity-80 font-medium mr-2 text-lg md:text-2xl">Become</span>
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#d4af37] bg-clip-text text-transparent">
              Local to Vocal
            </span>
            <span className="ml-3 text-sm md:text-xl bg-gradient-to-br from-[#d4af37] to-[#8a6d1a] text-[#0a0503] px-3 py-0.5 rounded-lg font-black transform -rotate-2 inline-block shadow-xl border border-white/20">
              2026
            </span>
          </h1>
          <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mt-6" />
          <p className="-mt-10 text-base xs:text-lg md:text-xl text-[#f4ecd8] font-medium leading-7 drop-shadow-md">
            Organised by{" "}
            <span className="font-semibold bg-gradient-to-r from-[#c62828] to-[#d4af37] bg-clip-text text-transparent hover:brightness-125 transition duration-200">
              Prime Time Research Media Pvt. Ltd.
            </span>{" "}
            – Global Award Events
          </p>
        </div>

        {/* ===== EVENTS SWIPER ===== */}
        <div className="mt-4 sm:mt-2 w-full max-w-full mx-auto flex flex-col items-center relative z-30">
          <div className="w-full relative z-10 px-0 sm:px-4 md:px-8 max-w-[1600px] mx-auto">
            <style>{`
              .hero-swiper .swiper-pagination-bullet { background: #d4af37 !important; opacity: 0.5; }
              .hero-swiper .swiper-pagination-bullet-active { background: #ffd966 !important; opacity: 1; box-shadow: 0 0 10px #d4af37; }
            `}</style>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={events.length > 1}
              autoplay={events.length > 1 ? { delay: 3500, disableOnInteraction: false } : false}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                640: { slidesPerView: events.length === 1 ? 1 : 2, spaceBetween: 20 },
                768: { slidesPerView: events.length === 1 ? 1 : 2, spaceBetween: 24 },
                1024: { slidesPerView: events.length === 1 ? 1 : 2, spaceBetween: 30 },
              }}
              className="hero-swiper w-full pb-16 !px-4 pt-10"
              style={{ alignItems: 'stretch' }}
            >
              {events.map((event, index) => (
                <SwiperSlide key={index} className="flex justify-center py-4 px-2" style={{ height: 'auto' }}>
                  <div className={`
                    relative w-full ${events.length === 1 ? 'max-w-2xl' : 'max-w-full'} mx-auto
                    flex flex-col justify-between h-full
                    rounded-2xl
                    bg-white/20 backdrop-blur-0.1xl
                    border border-white/30
                    transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01]
                    hover:border-[#d4af37]/60
                    hover:shadow-[0_20px_60px_rgba(212,175,55,0.3)]
                    group
                    p-6 md:p-8
                  `}>
                    {/* L-Bracket Corners */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl-md group-hover:border-[#d4af37] transition-colors duration-300" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr-md group-hover:border-[#d4af37] transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl-md group-hover:border-[#d4af37] transition-colors duration-300" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br-md group-hover:border-[#d4af37] transition-colors duration-300" />

                    <div>
                      {/* Card Header Icon + Divider */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shadow-sm">
                          <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                          </svg>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-black font-heading tracking-tight text-white mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-5 text-white/90 font-semibold text-sm md:text-base leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        {event.desc}
                      </p>

                      {/* Metadata Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/20 group-hover:bg-black/40 transition-colors">
                          <div className="text-[#d4af37]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">Event Date</span>
                            <span className="text-white font-bold text-xs truncate drop-shadow">{event.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/20 group-hover:bg-black/40 transition-colors">
                          <div className="text-[#d4af37]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">Venue</span>
                            <span className="text-white font-bold text-xs truncate drop-shadow">{event.place}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nominate Button */}
                    <div className="mt-auto">
                      <button
                        onClick={handleNominateClick}
                        className="w-full relative overflow-hidden rounded-full bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#a28533] px-6 py-2.5 text-sm md:text-base font-black uppercase tracking-wider text-[#644b0d] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 group/btn"
                        style={{ letterSpacing: '0.065em' }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_20%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_80%)] -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Nominate Now
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
