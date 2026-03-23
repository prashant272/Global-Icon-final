import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getEditionByYear } from "../data/editions.js";
import { getAwardName } from "../utils/brand.js";

import VideoGallery from "../components/VideoGallery.jsx";

// Helper to check if an image exists
const checkImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Banner slider with auto-scroll and modern UI
function BannerSlider({ images, year }) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurr((c) => (c + 1) % images.length);
    }, 3000); // 3s as requested in latest edit
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] mb-12 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-6">
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-xl font-bold text-[#ffd966] mb-2">Capturing Memories...</h3>
        <p className="text-[#ffeab080] text-sm max-w-md">We are currently organizing and uploading high-quality photos for the {year} edition. Check back soon!</p>
      </div>
    );
  }

  function next() {
    setCurr((c) => (c + 1) % images.length);
  }
  function prev() {
    setCurr((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 sm:mb-12 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl group ring-2 sm:ring-4 ring-[#ffe38c33]">
      <img
        src={images[curr]}
        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-1000"
        alt={`Banner ${curr + 1}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Navigation Buttons */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 bg-black/30 hover:bg-[#ffd966] hover:text-[#23140f] text-[#ffe184] rounded-full p-2 sm:p-3 transition z-10 border border-[#ffeeb044] backdrop-blur-md opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 22 22" fill="none"><path d="M14.5 18.5L8 12L14.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 bg-black/30 hover:bg-[#ffd966] hover:text-[#23140f] text-[#ffe184] rounded-full p-2 sm:p-3 transition z-10 border border-[#ffeeb044] backdrop-blur-md opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 22 22" fill="none"><path d="M7.5 18.5L14 12L7.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => setCurr(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${curr === i
              ? "bg-[#ffd966] w-6 sm:w-10 shadow-[0_0_15px_#ffd966]"
              : "bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// Event Gallery - Scrolling Image Marquee
function EventGallery({ images }) {
  if (images.length === 0) return null;

  return (
    <div className="mb-16 sm:mb-24 overflow-hidden">
      <h3 className="text-2xl sm:text-3xl font-black text-[#fbd24e] mb-6 sm:mb-10 tracking-wide flex items-center gap-3 sm:gap-4">
        <span className="w-8 sm:w-12 h-1 bg-[#d4af37] rounded-full"></span>
        Event Highlights
      </h3>

      <div className="relative group">
        <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...images, ...images, ...images].map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[240px] h-[160px] sm:w-[350px] sm:h-[240px] md:w-[400px] md:h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.05] hover:border-[#ffd966]/50"
            >
              <img
                src={img}
                alt={`Highlight ${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function EditionDetail() {
  const { slug } = useParams();

  // Try parsing slug to see if it's just a year
  const rawYearMatch = slug.match(/\d{4}$/);
  const derivedYear = rawYearMatch ? rawYearMatch[0] : slug;

  // Static fallback data
  const staticEdition = useMemo(() => getEditionByYear(derivedYear), [derivedYear]);

  const [edition, setEdition] = useState(staticEdition);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const isCovidYear = derivedYear === "2020" || derivedYear === "2021";

  useEffect(() => {
    if (isCovidYear) {
      setImages([]);
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      try {
        // 1. Try to fetch dynamic data from API using slug
        const { fetchEditionByYear } = await import("../services/api.js");
        const apiData = await fetchEditionByYear(slug);

        if (apiData) {
          // Merge API data over static data
          setEdition({ ...staticEdition, ...apiData });

          if (apiData.images && apiData.images.length > 0) {
            setImages(apiData.images);
            setLoading(false);
            return; // We have dynamic images, skip local probing
          }
        }
      } catch (err) {
        console.warn(`No dynamic edition found for ${slug}, falling back to static/local images.`);
      }

      // 2. Fallback to local image probing if no dynamic images exist
      const potentialPaths = Array.from({ length: 30 }, (_, i) => `/${derivedYear}/${i + 1}.jpg`);

      const results = await Promise.all(
        potentialPaths.map(async (url) => {
          const exists = await checkImage(url);
          return exists ? url : null;
        })
      );

      const found = results.filter((url) => url !== null);
      setImages(found);
      setLoading(false);
    }
    fetchData();
  }, [slug, derivedYear, isCovidYear]);

  useEffect(() => {
    const title = edition?.title || derivedYear;
    if (title) {
      window.dispatchEvent(new CustomEvent("updateWhatsAppMessage", { 
        detail: `Hello, I'm interested in the ${title} Edition of ${getAwardName()}.` 
      }));
    }
    return () => {
      window.dispatchEvent(new CustomEvent("updateWhatsAppMessage", { detail: null }));
    };
  }, [edition, derivedYear]);

  if (!edition) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center p-6 text-white text-center">
        <div>
          <h1 className="text-4xl font-black text-[#ffd966] mb-4">Edition Not Found</h1>
          <p className="text-[#ffeab080] mb-8">We couldn't find the information for this edition.</p>
          <Link to="/previous-editions" className="bg-[#ffd966] text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
            Browse All Editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0a0503] text-white min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {isCovidYear ? (
          <div className="relative w-full h-[300px] sm:h-[450px] mb-12 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1a130d] to-[#0a0503] border-2 border-[#d4af37]/20 flex flex-col items-center justify-center text-center p-8 shadow-2xl">
            <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            <div className="text-6xl mb-6">😷</div>
            <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd966] to-[#b2872d] mb-4">
              Edition {derivedYear}
            </h2>
            <div className="bg-[#ffd966]/10 px-6 py-2 rounded-full border border-[#ffd966]/30 animate-pulse">
              <p className="text-[#ffd788] font-black text-lg sm:text-2xl uppercase tracking-tighter">
                Award Not Organised Due to COVID-19
              </p>
            </div>
            <p className="mt-8 text-[#ffeab080] max-w-lg italic">
              The safety of our educational community was our top priority during the global pandemic. We returned stronger in the following years.
            </p>
          </div>
        ) : (
          <>
            <BannerSlider images={images} year={derivedYear} />
            <EventGallery images={images} />
            <VideoGallery videoLinks={edition.youtubeLinks} />
          </>
        )}

        <div className="space-y-16 sm:space-y-24">
          <header className="max-w-4xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
              ✨ {edition.editionLabel || `Edition ${derivedYear}`}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              {edition.title || derivedYear} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd966] via-[#f7c53a] to-[#b2872d]">Education Awards</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#ffeab0a0] leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {edition.hero || `The ${derivedYear} ${getAwardName()} celebrated the visionaries, institutions, and academic leaders who redefined educational standards.`}
            </p>
          </header>

          {!isCovidYear && (
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
              <section className="space-y-6 sm:space-y-8">
                <div className="bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/10 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full group-hover:bg-[#d4af37]/20 transition-colors" />
                  <h2 className="text-2xl sm:text-3xl font-black text-[#ffe19f] mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-4xl">📌</span>
                    The {derivedYear} Legacy
                  </h2>
                  <div className="text-base sm:text-lg text-[#fffaddcc] leading-relaxed space-y-4 sm:space-y-6">
                    <p>
                      Organized by <strong className="text-[#ffd966]">Prime Time Research Media Pvt. Ltd.</strong>, the {derivedYear} ceremony in <strong className="text-[#ffd966]">{edition.locations?.join(", ")}</strong> served as a powerful platform for networking and recognition.
                    </p>
                    <p>
                      From private schools to prestigious universities, we identified leaders who prioritize student success, pedagogical innovation, and institutional excellence.
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { label: "500+", sub: "Nominations Received" },
                  { label: "40+", sub: "Award Categories" },
                  { label: "100+", sub: "Institutions Represented" },
                  { label: (edition.editionLabel || "").split(" ")[0], sub: "Successful Edition" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a0503] p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#d4af37]/10 flex flex-col justify-center text-center group hover:border-[#d4af37]/30 transition-all">
                    <div className="text-3xl sm:text-4xl text-[#ffd966] font-black mb-1 sm:mb-2">{item.label}</div>
                    <div className="text-[10px] sm:text-xs font-bold text-[#ffeab080] uppercase tracking-widest leading-tight">{item.sub}</div>
                  </div>
                ))}
              </section>
            </div>
          )}

          <section className="bg-gradient-to-r from-[#0a0503] to-[#0f0805] p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-[#d4af37]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#d4af37]/5 blur-[100px] rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-10 sm:mb-16 tracking-tight">
              Rigorous <span className="text-[#ffd966]">Evaluation</span> Architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">
              {[
                { title: "Nomination", desc: "Open call for academic leaders and institutions." },
                { title: "Audit", desc: "Detailed performance analysis and benchmarking." },
                { title: "Review", desc: "Secondary feedback from industry peers." },
                { title: "Jury", desc: "Final verification by our elite board of experts." }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="text-4xl sm:text-5xl font-black text-[#d4af37]/20 mb-4 sm:mb-6 group-hover:text-[#d4af37]/40 transition-colors">0{i + 1}</div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#ffd966] mb-2 sm:mb-3">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-[#ffeab080] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
