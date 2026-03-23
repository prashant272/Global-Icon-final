import { useState } from "react";
import { getAwardName } from "../../utils/brand.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const reels = [
  {
    id: "kwWlXq-YsxU",
    title: "Prime Time Research Media | Awards Highlights",
  },
  {
    id: "uQVIrUzUtPY",
    title: `${getAwardName()} | Ceremony Moments`,
  },
  { 
    id: "wQyIGMZnkQg",
    title: "Business & Leadership Summit | Award Reel",
  },
  {
    id: "otjWjh44h5c",
    title: "India Excellence Awards 2026 | Red Carpet",
  },

  {
    id: "T64_Km02LSw",
    title: `${getAwardName()} | Highlights`,
  },
];

function ReelCard({ reel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[180px] h-[320px] sm:w-[240px] sm:h-[427px] lg:w-[280px] lg:h-[498px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 cursor-pointer flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        /* YouTube iframe on hover – autoplays muted */
        <iframe
        src={`https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1&hd=1&vq=hd720`}
          title={reel.title}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: "none" }}
        />
      ) : (
        /* Thumbnail when not hovered */
        <a
          href={`https://www.youtube.com/watch?v=${reel.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full h-full relative"
        >
          {/* YouTube Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${reel.id}/maxresdefault.jpg`}
            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${reel.id}/hqdefault.jpg`; }}
            alt={reel.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-125 group-hover:bg-red-500">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Hover hint */}
          <div className="absolute top-1/2 left-0 right-0 mt-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white/80 text-[10px] font-semibold uppercase tracking-widest">
              Hover to Play
            </span>
          </div>

          {/* Title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
              {reel.title}
            </p>
          </div>

          {/* YouTube badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1">
            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            <span className="text-white text-[10px] font-bold">Shorts</span>
          </div>

          {/* Gold glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#d4af37]/10 to-transparent pointer-events-none" />
        </a>
      )}
    </div>
  );
}

export default function ReelsSection({ SECTION_BG }) {
  return (
    <section className={`relative py-20 overflow-hidden ${SECTION_BG}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c62828]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Watch &amp; Share
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white inline-block">
            Trending{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#b6932f] bg-clip-text text-transparent">
              Reels &amp; Shorts
            </span>{" "}
            by Popular Media
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="w-2 h-2 rounded-full border border-[#d4af37] rotate-45" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <p className="mt-6 text-[#e6dfcc] text-lg max-w-2xl mx-auto font-medium">
            Watch viral moments, celebrity appearances, and award highlights from our events.
          </p>
        </div>

        {/* Reels Swiper — manual scroll & auto */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={16}
          freeMode={true}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="!overflow-visible"
        >
          {[...reels, ...reels].map((reel, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <ReelCard reel={reel} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@primetimermedia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            View All on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
