import { Link } from "react-router-dom";

export default function Media() {
  return (
    <section className="bg-[#0a0503] min-h-screen py-20 px-4 text-white relative overflow-hidden">
      {/* Subtle floating premium golden orbs */}
      <div className="pointer-events-none absolute -top-32 left-0 w-[400px] h-[320px] bg-gradient-to-br from-[#efd27d33] via-[#d4af3730] to-transparent rounded-full blur-3xl z-0 opacity-65"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-[280px] h-[280px] bg-gradient-to-bl from-[#ffe6a666] to-transparent blur-3xl rounded-full z-0 opacity-50"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-1">
          <div>
            <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ffe574] via-[#f5c543] to-[#d4af37] drop-shadow-[0_4px_24px_rgba(212,175,55,0.20)] tracking-tight mb-2">
              Media Coverage
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl font-medium text-[#ffd788d6] leading-relaxed bg-[#1d13080e] rounded-xl px-4 py-3 shadow border border-[#f5c54344]">
              Experience our journey through the eyes of national and international media – in print, on screen, and across digital platforms.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/previous-editions"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#ffe791] to-[#ffe180] border-[2.5px] border-[#ffe18a] px-7 py-2 text-lg font-extrabold text-[#332508] shadow-lg hover:bg-[#fffde8] hover:text-[#ad8826] transition-all hover:scale-[1.035] focus:outline-none"
              style={{
                boxShadow: "0 4px 18px #e3c75840,0 2px 10px #d4af3742",
                letterSpacing: "0.015em",
              }}
            >
              <span className="text-[#d4af37] text-xl font-bold">⟵</span>
              <span>Previous Editions</span>
            </Link>
          </div>
        </header>

        {/* Media Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadein-fast">
          {/* Print Media */}
          <section className="relative bg-gradient-to-br from-[#2e210e]/90 to-[#1c1306]/60 border-[2.5px] border-[#ffe7b052] rounded-4xl p-7 shadow-[0_6px_34px_rgba(212,175,55,0.18)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px]">
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-[#ffe17c30] via-[#fff1c520] to-transparent blur-2xl pointer-events-none rounded-full opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">📰</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-[#ffe9bb] via-[#eedd99] to-[#ffd468] text-transparent bg-clip-text tracking-wide drop-shadow">
                  Print Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-[#ffe699] text-[#6e571a] font-semibold text-xs rounded-full border border-[#e3c87577] shadow">Premium</span>
              </div>
              <div className="space-y-5">
                {/* Placeholders for Print Media */}
                <div className="bg-gradient-to-br from-[#27221c]/80 to-[#b08d3415] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Times of India Feature (Jan 2024)
                </div>
                <div className="bg-gradient-to-br from-[#27221c]/80 to-[#a48d4815] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Hindustan Exclusive Coverage (Feb 2023)
                </div>
              </div>
            </div>
          </section>

          {/* Electronic Media */}
          <section className="relative bg-gradient-to-br from-[#2e210e]/90 to-[#1c1306]/60 border-[2.5px] border-[#ffe7b052] rounded-4xl p-7 shadow-[0_6px_34px_rgba(212,175,55,0.20)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px]">
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-[#ffe17c33] via-[#fff1c517] to-transparent blur-2xl pointer-events-none rounded-full opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">📺</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-[#ffe9bb] via-[#eedd99] to-[#ffd468] text-transparent bg-clip-text tracking-wide drop-shadow">
                  Electronic Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-[#ffe699] text-[#6e571a] font-semibold text-xs rounded-full border border-[#e3c87577] shadow">Featured</span>
              </div>
              <div className="space-y-5">
                {/* Placeholders for Electronic Media */}
                <div className="bg-gradient-to-br from-[#1b120a]/80 to-[#b08d341a] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Zee News Interview <span className="ml-2 text-[#ffe783]">— March 2024</span>
                </div>
                <div className="bg-gradient-to-br from-[#1b120a]/80 to-[#a48d4815] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] DD National Event Coverage <span className="ml-2 text-[#ffe783]">— 2023</span>
                </div>
              </div>
            </div>
          </section>

          {/* Digital Media */}
          <section className="relative bg-gradient-to-br from-[#2e210e]/90 to-[#181008]/60 border-[2.5px] border-[#ffe7b052] rounded-4xl p-7 shadow-[0_6px_34px_rgba(212,175,55,0.18)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px]">
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-[#ffd85e44] via-[#ffeebc13] to-transparent blur-2xl pointer-events-none rounded-full opacity-65 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">🌐</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-[#ffe9bb] via-[#eedd99] to-[#ffd468] text-transparent bg-clip-text tracking-wide drop-shadow">
                  Digital Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-[#ffe699] text-[#6e571a] font-semibold text-xs rounded-full border border-[#e3c87577] shadow">Online</span>
              </div>
              <div className="space-y-5">
                {/* Placeholders for Digital Media */}
                <div className="bg-gradient-to-br from-[#231711]/80 to-[#bbb18d16] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] The Print – Special Coverage <span className="ml-2 text-[#ffe783]">May 2024</span>
                </div>
                <div className="bg-gradient-to-br from-[#231711]/80 to-[#cec07311] rounded-2xl p-5 border border-[#ffe6b41a] hover:border-[#ebbb3a]/80 transition h-[126px] flex items-center justify-center text-[#dacd96b7] text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Twitter: #GlobalEducationAwards Trending <span className="ml-2 text-[#ffe783]">2024</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full flex justify-center mt-16">
          <span className="bg-gradient-to-r from-[#ffe580]/80 to-[#ffe9c8]/50 text-[#624202] font-extrabold text-lg px-8 py-3 rounded-full border-2 border-[#ffeab399] drop-shadow-2xl shadow inline-flex items-center gap-2 tracking-wide animate-fadein-up">
            More highlights coming soon.
            <span className="ml-2 text-2xl">✨</span>
          </span>
        </div>
      </div>
    </section>
  );
}
