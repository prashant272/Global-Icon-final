import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

export default function PreviousAwardees() {
  const banners = [
    { id: 1, src: '/awardees/1.jpeg', title: 'Media Partner1' },
    { id: 2, src: '/awardees/2.png', title: 'Media Partner2' },
    { id: 3, src: '/awardees/3.jpg', title: 'Media Partner3' },
    { id: 4, src: '/awardees/4.webp', title: 'Media Partner4' },
    { id: 5, src: '/awardees/5.png', title: 'Media Partner5' },
    { id: 6, src: '/awardees/6.svg', title: 'Media Partner6' },
    { id: 7, src: '/awardees/7.png', title: 'Media Partner7' },
    { id: 8, src: '/awardees/8.png', title: 'Media Partner8' },
    { id: 9, src: '/awardees/9.png', title: 'Media Partner9' },
    { id: 10, src: '/awardees/10.svg', title: 'Media Partner10' },
  ];

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 relative">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white inline-block">
            Previous <span className="bg-gradient-to-r from-[#d4af37] via-[#f1d46b] to-[#b6932f] bg-clip-text text-transparent">Awardees</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 rounded-full border border-[#d4af37] rotate-45"></div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </div>

        <div className="relative">
          <style>{`
            .awardees-swiper .swiper-pagination-bullet { background: #d4af37 !important; }
            .awardees-swiper .swiper-button-next, .awardees-swiper .swiper-button-prev { 
              color: #d4af37 !important; 
              background: rgba(255,255,255,0.1); 
              width: 35px; 
              height: 35px; 
              border-radius: 4px;
            }
            .awardees-swiper .swiper-button-next:after, .awardees-swiper .swiper-button-prev:after { font-size: 14px; font-weight: bold; }
            .awardees-swiper .swiper-wrapper {
              transition-timing-function: linear !important;
            }
          `}</style>
          <Swiper
            modules={[Autoplay, Pagination, Navigation, FreeMode]}
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            freeMode={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 15 },
              768: { slidesPerView: 4, spaceBetween: 15 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              1280: { slidesPerView: 7, spaceBetween: 20 },
            }}
            className="awardees-swiper"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="bg-white rounded-md shadow-md flex items-center justify-center p-4 h-[100px] md:h-[120px] transition-transform duration-300 hover:scale-105 border border-gray-200">
                  <img
                    src={banner.src}
                    alt={banner.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
