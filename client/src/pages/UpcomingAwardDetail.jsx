import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUpcomingAwardBySlug } from "../services/api.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRef } from "react";

// Home Components for enrichment
import ReelsSection from "../components/home/ReelsSection.jsx";
import PreviousAwardees from "../components/home/PreviousAwardees.jsx";
import Guests from "../components/home/Guests.jsx";

export default function UpcomingAwardDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const sectionRefs = useRef([]);

  // Global Guests data (from Home.jsx context)
  const globalGuests = [
    { name: "Virender Sehwag", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Sunil Manohar Gavaskar", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Shri Ashwini Kumar Choubey", designation: "Guest of Honour & Former Union Minister" },
    { name: "Dr. Yoganand Shashtri", designation: "Former Reader, Shaheed Bhagat Singh College, Delhi" },
    { name: "Shri G. V. L. Narsimha Rao", designation: "National Spokesperson, BJP" },
    { name: "Mr. Brad Hogg", designation: "Former Australian Cricketer" },
    { name: "Dr. Najma A. Heptulla", designation: "Former Governor, Manipur" },
    { name: "Shri Anand Kumar", designation: "Founder & Director, Super 30" },
  ];

  useEffect(() => {
    fetchUpcomingAwardBySlug(slug)
      .then(setAward)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "!z-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [award]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!award) return null;

  const banners = (award.banners && award.banners.length > 0)
    ? award.banners
    : (award.banner ? [award.banner] : []);

  return (
    <div className="min-h-screen bg-[#0a0503] text-white pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden relative">
      {/* ===== LUXURY BACKGROUND EFFECTS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Gold Dust / Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#d4af37] rounded-full blur-[1px] animate-float-gold"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-gold {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          33% { transform: translateY(-100px) translateX(50px); opacity: 0.6; }
          66% { transform: translateY(-200px) translateX(-30px); opacity: 0.3; }
        }
        .animate-float-gold {
          animation: float-gold linear infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shine-effect::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          animation: shine 3s infinite;
        }
      `}</style>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="guest" className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-[#d4af37]" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===== HERO BANNER SLIDER (Boxed Style - Refined) ===== */}
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 sm:mb-12 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl group ring-2 sm:ring-4 ring-[#d4af3733] bg-[#0a0503]">
          {banners.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {banners.map((url, i) => (
                <SwiperSlide key={i} className="relative w-full h-full">
                  <img
                    src={url}
                    alt={`${award.title} banner ${i + 1}`}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-1000"
                  />
                  {/* Subtle Gradient for readability - matching EditionDetail style */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0503] to-[#0f0805] flex items-center justify-center">
              <div className="bg-[#d4af37]/10 px-6 py-2 rounded-full border border-[#d4af37]/30">
                <p className="text-[#ffd788] font-black tracking-widest uppercase">Global Icon Awards</p>
              </div>
            </div>
          )}

          {/* Back button */}
          <button onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 text-white hover:text-[#d4af37] px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:border-[#d4af37]/50 group/back">
            <svg className="w-3.5 h-3.5 group-hover/back:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            BACK
          </button>

          <div className="absolute top-6 right-6 z-10">
            <span className="bg-[#d4af37] text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg border border-white/20">
              UPCOMING AWARD
            </span>
          </div>
        </div>

        {/* ===== INTRO SECTION (Sidebar Layout - Focused) ===== */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-8 flex flex-col h-full">
            {/* Title Card */}
            <div className="bg-gradient-to-br from-[#0a0503]/95 to-[#0f0805]/90 backdrop-blur-md border border-[#d4af37]/25 rounded-[3rem] p-8 sm:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.7)] relative overflow-hidden group flex-grow">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#d4af37]/10 blur-[100px] rounded-full" />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight mb-10 bg-gradient-to-r from-[#fff8e7] via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent drop-shadow-2xl">
                {award.title}
              </h1>

              {/* Meta Badges (Mobile/Tablet Only) */}
              <div className="flex flex-wrap gap-4 mb-10 lg:hidden">
                {award.date && (
                  <div className="flex items-center gap-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl px-6 py-4">
                    <p className="text-white font-black text-sm tracking-widest">{award.date}</p>
                  </div>
                )}
                {award.location && (
                  <div className="flex items-center gap-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl px-6 py-4">
                    <p className="text-white font-black text-sm tracking-widest">{award.location}</p>
                  </div>
                )}
              </div>

              <div className="w-40 h-1.5 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full mb-10" />

              {award.desc && (
                <p className="text-[#f7e9d7] text-lg sm:text-xl leading-relaxed whitespace-pre-wrap font-medium opacity-90">{award.desc}</p>
              )}
            </div>

            {/* Highlights (Inline with sidebar) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                { icon: "✨", title: "Recognition", desc: "Elite Global Fame" },
                { icon: "🤝", title: "Networking", desc: "VVIP Connections" },
                { icon: "📢", title: "News", desc: "Top Media Coverage" }
              ].map((box, i) => (
                <div key={i} className="bg-black/40 border border-[#d4af37]/10 p-8 rounded-[2.5rem] text-center group hover:bg-[#d4af37]/15 hover:border-[#d4af37]/40 transition-all duration-700 hover:-translate-y-2">
                  <div className="text-5xl mb-5 group-hover:scale-125 transition-transform duration-700 drop-shadow-2xl">{box.icon}</div>
                  <h4 className="text-[#ffd966] font-black text-xs uppercase tracking-[0.3em] mb-2">{box.title}</h4>
                  <p className="text-[#d4af3780] text-[9px] font-black uppercase tracking-[0.2em]">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SIDEBAR (Sticky Register Widget) ===== */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 space-y-10">
              <div className="bg-gradient-to-br from-[#0a0503] to-[#0f0805] border border-[#d4af37]/40 rounded-[4rem] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group shine-effect">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                <h3 className="text-xl font-black text-[#ffd966] mb-12 tracking-[0.25em] uppercase flex items-center gap-4">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                  Nominations Open
                </h3>

                <div className="space-y-12 mb-14">
                  {award.date && (
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-3xl bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 text-[#d4af37] shadow-xl">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/50 font-black mb-1">Event Date</p>
                        <p className="text-white font-black text-sm sm:text-base">{award.date}</p>
                      </div>
                    </div>
                  )}
                  {award.location && (
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-3xl bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 text-[#d4af37] shadow-xl">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/50 font-black mb-1">Venue Location</p>
                        <p className="text-white font-black text-sm sm:text-base">{award.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  {award.link && (
                    <a href={award.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gradient-to-br from-[#ffeec3] via-[#d4af37] to-[#8a6e2a] text-black font-black w-full py-6 rounded-3xl text-sm uppercase tracking-[0.15em] shadow-[0_20px_40px_rgba(212,175,-55,0.3)] hover:scale-[1.03] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(212,175,55,0.4)]">
                      Register Now
                    </a>
                  )}
                  <button onClick={() => navigate(`/nominate?award=${encodeURIComponent(award.title)}`)} className="flex items-center justify-center bg-white/5 border border-white/15 text-white font-black w-full py-6 rounded-3xl text-sm uppercase tracking-[0.15em] hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                    Self Nominate
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-[#d4af37]/20 p-8 rounded-[3rem] flex items-center gap-6 shadow-2xl backdrop-blur-md">
                <span className="text-5xl drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">🛡️</span>
                <p className="text-[10px] text-[#ffd966] font-black uppercase tracking-[0.25em] leading-relaxed italic">The World's Most Trusted Recognition Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== GLOBAL ESTEEMED GUESTS (Enrichment) ===== */}
      <div className="mt-12 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-transparent -z-10 blur-[100px]" />
        <Guests
          guests={globalGuests}
          sectionRefs={sectionRefs}
          HIGHLIGHT_BG="bg-transparent"
        />
      </div>

      {/* ===== FULL WIDTH IMMERSIVE SECTIONS (Optimized Spacing) ===== */}
      <div className="space-y-16 sm:space-y-24 mt-12">

        {/* REELS & SHORTS SECTION WITH DIVIDER */}
        <div className="relative pt-4">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af3733] to-transparent" />
          <ReelsSection SECTION_BG="bg-transparent" />
        </div>

        {/* STORY SECTION - CINEMATIC BOX */}
        <section className="relative overflow-hidden group py-10 px-4 sm:px-0">
          <div className="absolute inset-0 bg-[#d4af37]/5 -z-10 rounded-[6rem] border border-[#d4af37]/20 backdrop-blur-3xl" />
          <div className="max-w-5xl mx-auto p-10 sm:p-24 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-[#ffd966] mb-12 uppercase tracking-tighter">The Visionary Journey</h2>
            <div className="text-lg sm:text-2xl text-white/90 leading-relaxed space-y-8 font-bold max-w-4xl mx-auto italic drop-shadow-lg">
              <p>"We don't just give awards. We create legends. Our story is built on the sweat and brilliance of those who dare to lead."</p>
              <p className="text-base sm:text-lg font-black text-[#d4af37] not-italic uppercase tracking-[0.3em] pt-8">— Prime Time Research Media</p>
            </div>
          </div>
        </section>

        {/* PREVIOUS WINNERS - SQUARE IMPACT GRID (Original if exists) */}
        {award.previousWinners?.length > 0 && (
          <div className="relative">
            <div className="flex flex-col items-center mb-24 text-center px-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-widest">Excellence Registry</h2>
              <div className="flex items-center gap-6">
                <div className="h-px w-12 sm:w-20 bg-[#d4af37]" />
                <p className="text-xs font-black text-[#ffd966] uppercase tracking-[0.5em]">The Legacy Continues</p>
                <div className="h-px w-12 sm:w-20 bg-[#d4af37]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {award.previousWinners.map((w, i) => (
                <div key={w._id} className="group relative bg-[#0a0503] rounded-[4rem] overflow-hidden border border-white/5 hover:border-[#d4af37]/40 transition-all duration-[1.2s] hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                  <div className="aspect-square overflow-hidden">
                    <img src={w.image} alt={w.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                    {w.name && (
                      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 shadow-3xl">
                        <p className="text-[9px] text-[#ffd966] font-black uppercase tracking-[0.4em] mb-2 text-center opacity-80">Hall of Fame</p>
                        <h4 className="text-white text-lg font-black text-center truncate tracking-tight">{w.name}</h4>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SECTION CTA */}
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => navigate(`/nominate?award=${encodeURIComponent(award.title)}`)}
                className="group relative px-12 py-5 bg-gradient-to-r from-[#d4af37] to-[#ffd966] rounded-full overflow-hidden shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 text-black font-black text-[10px] uppercase tracking-[0.3em]">Become the Next Winner &mdash; Nominate Now</span>
              </button>
            </div>
          </div>
        )}

        {/* GLOBAL PREVIOUS AWARDEES (Brand Showcase) */}
        <div className="relative pt-8 pb-12">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af3733] to-transparent" />
          <PreviousAwardees />
        </div>

        {/* STATS STRIP */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "1,500+", sub: "Official Entries" },
            { label: "60+", sub: "Unique Sectors" },
            { label: "15+", sub: "Legacy Years" },
            { label: "100%", sub: "Pure Transparency" }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0503] p-12 rounded-[3.5rem] border border-[#d4af37]/10 flex flex-col justify-center text-center group hover:bg-[#d4af37]/5 hover:border-[#d4af37]/30 transition-all duration-700">
              <div className="text-4xl text-[#ffd966] font-black mb-4 group-hover:scale-110 transition-transform">{item.label}</div>
              <div className="text-[9px] font-black text-[#d4af3780] uppercase tracking-[0.4em]">{item.sub}</div>
            </div>
          ))}
        </section>

        {/* SELECTION PROCESS - CINEMATIC STEPPER */}
        <section className="bg-gradient-to-br from-[#0a0503] via-[#0f0805] to-[#040404] p-8 sm:p-16 lg:p-20 rounded-[4rem] border border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.9)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/10 blur-[150px] rounded-full animate-pulse" />
          <h2 className="text-4xl sm:text-6xl font-black text-center mb-28 tracking-tighter leading-none relative z-10 transition-colors uppercase">
            How Legends <span className="text-[#ffd966]">Are Born</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 sm:gap-24 relative z-10">
            {[
              { title: "Filtering", desc: "We scan thousands of applications for real impact." },
              { title: "Verification", desc: "Documents and ground work are checked by experts." },
              { title: "Interview", desc: "Top names are called for a deep one-on-one session." },
              { title: "Final Veto", desc: "The VVIP jury selects the absolute global icons." }
            ].map((step, i) => (
              <div key={i} className="relative group/step">
                <div className="text-[10rem] font-black text-[#d4af37]/5 group-hover/step:text-[#d4af37]/15 transition-all duration-1000 absolute -top-24 -left-8 select-none leading-none">0{i + 1}</div>
                <div className="relative z-10 pt-10">
                  <h4 className="text-2xl font-black text-[#ffd966] mb-5 uppercase tracking-tighter leading-none">{step.title}</h4>
                  <div className="w-10 h-1 bg-[#d4af37] mb-5 group-hover/step:w-16 transition-all duration-700" />
                  <p className="text-[10px] text-white/50 font-black leading-relaxed uppercase tracking-widest">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA - MOBILE REPLICA */}
        <div className="lg:hidden pb-20">
          <div className="bg-gradient-to-br from-[#0a0503] to-[#0f0805] border border-[#d4af37]/40 rounded-[4rem] p-14 text-center shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Become a <span className="text-[#ffd966]">Global Icon</span></h3>
            <p className="text-[#d4af3780] text-xs mb-12 font-black uppercase tracking-[0.2em]">Join the prestigious winner's circle.</p>
            <div className="flex flex-col gap-5">
              {award.link && (
                <a href={award.link} target="_blank" rel="noopener noreferrer" className="bg-[#d4af37] text-black font-black py-6 rounded-3xl text-xs uppercase tracking-[0.2em] shadow-2xl">Register Now</a>
              )}
              <button onClick={() => navigate("/nominate")} className="bg-white/5 border border-white/20 text-white font-black py-6 rounded-3xl text-xs uppercase tracking-[0.2em]">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
