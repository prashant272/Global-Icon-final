import React from "react";

const GUIDELINES = [
  {
    icon: "📝",
    title: "General Submission",
    color: "from-[#ffeec3]/90 via-[#d4af37]/70 to-[#fffbe770]",
    bg: "bg-[#fffbe7]/[0.16] border-[#ffeec3]/30",
    items: [
      "All nominations must be submitted before the official deadline.",
      "Form must be filled completely with accurate and verifiable information.",
      "Each entry should demonstrate excellence, innovation, and impact.",
      "Incomplete, misleading, or false information may result in disqualification.",
      "Once submitted, entries cannot be edited or withdrawn."
    ]
  },
  {
    icon: "👨‍⚖️",
    title: "Evaluation & Judging",
    color: "from-[#ffd966]/80 via-[#ffeec3]/70 to-[#d4af37]/60",
    bg: "bg-[#fffbe7]/[0.11] border-[#ffd966]/30",
    items: [
      "All nominations reviewed by an independent jury panel.",
      "Evaluation based on quality, innovation, and impact.",
      "Jury may request supporting documentation if needed.",
      "Jury’s decision is final and binding."
    ]
  },
  {
    icon: "📑",
    title: "Documentation & Verification",
    color: "from-[#f7c273]/80 via-[#ffeec3]/60 to-[#b2994c]/60",
    bg: "bg-[#fffbe7]/[0.14] border-[#b2994c]/30",
    items: [
      "Requested supporting documents must be valid and authentic.",
      "Information may be independently verified.",
      "Entries failing verification may be rejected."
    ]
  },
  {
    icon: "⚠️",
    title: "Important Notes",
    color: "from-[#d4af37]/95 via-[#ffeec3]/70 to-[#ffdbc1]/70",
    bg: "bg-[#fffbe7]/[0.10] border-[#d4af37]/30",
    items: [
      "Award management reserves the right to amend guidelines or categories.",
      "Attempting to influence jury will result in disqualification.",
      "Participation implies acceptance of all rules."
    ]
  }
];

// Card: responsive height and width, optimized padding
function GuidelineCard({ icon, title, items, color, bg }) {
  return (
    <div
      className={`
        shadow-xl rounded-xl border ${bg}
        w-full
        py-4 px-4 sm:px-6
        mx-auto
        backdrop-blur-[2px]
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-2xl
        flex flex-col
        justify-start
        min-h-[140px]
      `}
      style={{
        boxShadow: "0 4px 24px 0 rgba(200,180,100,0.11)",
      }}
    >
      <h2 className={`
        text-base sm:text-xl font-bold mb-2
        text-transparent bg-gradient-to-r ${color} bg-clip-text tracking-wide
        flex gap-2 items-center
      `}>
        <span className="inline-block text-xl sm:text-2xl flex-shrink-0">{icon}</span>
        {title}
      </h2>
      <ul className="space-y-1 text-[#ffeec3]/90 leading-tight xs:leading-normal text-xs xs:text-sm sm:text-[0.99rem] font-medium ml-0 pl-1 sm:pl-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="text-[#ffd966] font-bold mt-[2px] flex-shrink-0">•</span>
            <span className="break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Guidelines() {
  return (
    <section className="relative min-h-screen bg-[#0a0503] selection:bg-[#ffeec350] py-24 overflow-hidden flex flex-col justify-start">
      {/* Decorative Blurs */}
      <div className="absolute -top-32 -left-28 w-[410px] h-[410px] rounded-full bg-gradient-to-tr from-[#ffeec370] to-transparent blur-[110px] -z-10 pointer-events-none" />
      <div className="absolute top-10 right-0 w-[170px] h-[280px] rounded-full bg-gradient-to-tl from-[#d4af371a] via-[#6c3924cc] to-transparent blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,235,191,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,235,191,0.045)_1px,transparent_1px)] bg-[size:84px_84px] opacity-40 -z-10 pointer-events-none" />
      <div
        className="absolute left-1/2 -top-8 -translate-x-1/2 w-[600px] h-28 opacity-70 blur-[22px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #ffeec355 10%, transparent 70%)"
        }}
      />

      <div className="relative z-20 max-w-3xl mx-auto w-full px-4 sm:px-8 pt-14 mb-1 flex flex-col items-center">
        <div className="flex gap-2 items-center justify-center mb-2 w-full">
          <span className="h-5 w-1 flex-shrink-0 rounded-lg bg-gradient-to-b from-[#f5d968] via-[#d4af37] to-[#c62828]" />
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.4rem] font-extrabold tracking-tight sm:tracking-wider bg-gradient-to-r from-[#f5d968] via-[#ffeec3] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg text-center"
            style={{ letterSpacing: "1px" }}
          >
            Entry Guidelines
          </h1>
          <span className="h-5 w-1 flex-shrink-0 rounded-lg bg-gradient-to-b from-[#d4af37] to-[#c62828]" />
        </div>
        <div className="mx-auto w-32 h-1 rounded-full bg-gradient-to-r from-[#ffd966]/0 via-[#d4af37] to-[#ffd966]/0 opacity-80 my-2" />
        <p className="text-[#ffeec3] text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
          Please read the guidelines before you submit your nomination for the Global Icon Awards.
          <span className="block mt-1 text-[#d4af37]/90 font-semibold text-xs sm:text-sm">
            Adherence is mandatory for successful evaluation.
          </span>
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-3 sm:px-6">
        <div className="
          grid grid-cols-1
          md:grid-cols-2
          gap-4 sm:gap-6 md:gap-8 lg:gap-10
          pt-6 sm:pt-8 pb-10
        ">
          {GUIDELINES.map((g, idx) => (
            <GuidelineCard
              {...g}
              key={g.title}
            />
          ))}
        </div>
      </div>

      {/* Declaration */}
      <div className="relative left-1/2 -translate-x-1/2 bottom-0 w-full max-w-lg px-3 z-40 mt-auto">
        <div className="text-center pt-5 pb-3 md:pt-4 border-t border-[#ffd966]/10 font-medium text-[0.99rem] text-[#ffeec3]/90 italic tracking-wide leading-relaxed w-full bg-[#1a0a05]/50 rounded-b-xl shadow-inner">
          <svg className="mx-auto mb-1.5" width={36} height={24} fill="none" viewBox="0 0 41 27">
            <path d="M7.5 10C4.02 15.44 3 20.5 7 23.5C11 26.5 17.09 26.09 20.21 20.77M33.5 10C36.98 15.44 38 20.5 34 23.5C30 26.5 23.91 26.09 20.79 20.77" stroke="#ffd966" strokeWidth="2" strokeLinecap="round" />
            <circle cx="7" cy="7" r="2.5" fill="#ffeec3" />
            <circle cx="33" cy="7" r="2.5" fill="#ffeec3" />
          </svg>
          By submitting a nomination, you confirm that all information is accurate to the best of your knowledge and you agree to follow the final decision of the jury.
        </div>
      </div>
    </section>
  );
}
