import React from "react";

// Minimal vertical gap between cards for mobile view, better spacing
const terms = [
  {
    icon: "1️⃣",
    title: "Eligibility & Nomination",
    items: [
      "Nominations must be submitted through the official nomination platform only.",
      "The nominee must fall under the relevant award category.",
      "Incomplete, incorrect, or misleading information may lead to immediate disqualification.",
      "Submission of a nomination does not guarantee selection or shortlisting.",
    ]
  },
  {
    icon: "2️⃣",
    title: "Information Accuracy",
    items: [
      "All information, data, documents, and claims provided in the nomination must be true, accurate, and verifiable.",
      "The Awards Committee reserves the right to verify, validate, or seek clarification regarding any submitted information.",
      "Any false or misleading representation may result in cancellation of nomination at any stage.",
    ]
  },
  {
    icon: "3️⃣",
    title: "Research & Evaluation Process",
    items: [
      "Each valid nomination will undergo a multi-stage evaluation process, including:",
      <ul className="pl-6 list-disc opacity-90 mt-1 list-inside" key="ev-steps">
        <li>Initial screening</li>
        <li>Research &amp; data validation</li>
        <li>Independent jury assessment</li>
        <li>Scoring and benchmarking</li>
      </ul>,
      "Evaluation will be based on pre-defined criteria, industry benchmarks, and jury discretion.",
    ]
  },
  {
    icon: "4️⃣",
    title: "Jury Decision",
    items: [
      "All nominations are evaluated by an independent and impartial jury panel.",
      "The decision of the jury is final and binding.",
      "No correspondence, feedback, or appeal regarding jury scores or decisions shall be entertained.",
    ]
  },
  {
    icon: "5️⃣",
    title: "Confidentiality",
    items: [
      "All nomination details, documents, and evaluation records will be treated as strictly confidential.",
      <>
        Information will be used only for:
        <ul className="pl-6 list-disc opacity-90 mt-1 list-inside">
          <li>Research</li>
          <li>Evaluation</li>
          <li>Award-related communication</li>
        </ul>
      </>,
      "No confidential data will be shared with third parties, except where required for evaluation purposes.",
    ]
  },
  {
    icon: "6️⃣",
    title: "Disqualification Rights",
    items: [
      "The Organising Committee reserves the right to reject or disqualify any nomination if:",
      <ul className="pl-6 list-disc opacity-90 mt-1 list-inside" key="disq-criteria">
        <li>Eligibility criteria are not met</li>
        <li>Information is incomplete, false, or unverifiable</li>
        <li>Ethical, legal, or professional misconduct is identified</li>
        <li>Nomination violates the spirit or integrity of the awards</li>
      </ul>,
    ]
  },
  {
    icon: "7️⃣",
    title: "Award Announcement & Participation",
    items: [
      "Award winners will be officially informed via email or official communication.",
      "Participation in the award ceremony is subject to event terms, travel, and logistics arrangements.",
      "The Awards Committee reserves the right to change event dates, venue, or format, if required.",
    ]
  },
  {
    icon: "8️⃣",
    title: "Use of Name, Logo & Content",
    items: [
      "By submitting a nomination, the nominee grants permission to:",
      <ul className="pl-6 list-disc opacity-90 mt-1 list-inside" key="usage">
        <li>Use their name, logo, photographs, and submitted content</li>
        <li>For promotional, marketing, press releases, and digital platforms related to the awards</li>
      </ul>,
      "No monetary compensation shall be claimed for such usage.",
    ]
  },
  {
    icon: "9️⃣",
    title: "Limitation of Liability",
    items: [
      "The Organisers shall not be responsible for:",
      <ul className="pl-6 list-disc opacity-90 mt-1 list-inside" key="liab">
        <li>Technical errors during submission</li>
        <li>Loss of data due to system issues</li>
        <li>Any indirect or consequential losses</li>
      </ul>,
      "Participation is entirely at the nominee’s own discretion and responsibility.",
    ]
  },
  {
    icon: "🔟",
    title: "Amendments & Governing Rights",
    items: [
      "The Organising Committee reserves the right to modify or amend these Terms & Conditions at any time without prior notice.",
      "All matters shall be governed by applicable laws, and jurisdiction shall lie with the organiser’s registered office location."
    ]
  }
];

function getGradient(idx) {
  // Alternate left/right and color gradients
  const bgCombinations = [
    // left
    "from-[#fde68a40] via-[#210a0e50] to-[#fffbe780]",
    // right
    "from-[#eab30836] via-[#242f2f30] to-[#fde68a33]",
  ];
  return `bg-gradient-to-br ${bgCombinations[idx % 2]}`;
}

export default function Terms() {
  return (
    <section className="bg-[#210a0e] text-white min-h-screen py-8 md:py-20 selection:bg-[#ffeec350] relative">
      {/* Hero Title */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center mb-8 md:mb-12">
        <div className="flex justify-center text-3xl md:text-4xl mb-2 md:mb-3">
          <span role="img" aria-label="scroll"></span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#eab308] bg-clip-text text-transparent mb-1 md:mb-2 drop-shadow-lg tracking-wide">
          Terms &amp; Conditions
        </h1>
        <p className="block font-semibold text-[#fde68a]/90 text-base md:text-lg mb-2 md:mb-3">
          Global Education Excellence Awards 2026
        </p>
        <div className="mx-auto w-20 md:w-28 h-1 rounded-full bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#eab308] mb-3 md:mb-4 opacity-70" />
        <p className="text-[#fde68a]/80 text-xs sm:text-sm md:text-base font-medium">
          By submitting a nomination for the Global Education Excellence Awards 2026, the nominee and/or nominator agrees to the following terms and conditions:
        </p>
      </div>

      {/* Terms as Modern Cards */}
      <div
        className="
          max-w-6xl mx-auto px-2 sm:px-3 md:px-0 
          grid grid-cols-1 sm:grid-cols-2 
          gap-y-3 sm:gap-y-4 gap-x-2 md:gap-x-7 
          w-full
          relative z-10
        "
      >
        {terms.map((term, idx) => (
          <div
            key={term.title}
            className={`
              rounded-2xl shadow-md border border-[#fde68a33]
              backdrop-blur-xl p-3 sm:p-4 md:p-7
              ${getGradient(idx)}
              flex flex-col relative
              transition-transform duration-300 group
              hover:-translate-y-1 hover:shadow-2xl
              ${idx % 2 ? "sm:mt-6" : ""}
              bg-opacity-80
              w-full
              max-w-full
              sm:min-w-0
            `}
            style={{
              minHeight: 178,
              marginTop: idx % 2
                ? "1.2rem"
                : undefined,
            }}
          >
            {/* Icon & Title */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span className="text-2xl md:text-3xl drop-shadow">{term.icon}</span>
              <span className="font-bold text-base sm:text-lg md:text-xl text-transparent bg-gradient-to-r from-[#fde68a] to-[#fbbf24] bg-clip-text">
                {term.title}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm md:text-base text-[#fde68aeb] font-medium leading-relaxed">
              {term.items.map((item, i) =>
                typeof item === "string" ? (
                  <div key={i}>{item}</div>
                ) : (
                  React.cloneElement(item, { key: i })
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* A subtle decorative mesh or accent */}
      <div className="absolute pointer-events-none left-0 right-0 top-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-24 w-[380px] h-[350px] rounded-full bg-gradient-to-br from-[#fbbf24]/20 via-[#eab308]/20 to-transparent blur-[104px]" />
        <div className="absolute bottom-[-100px] right-[-70px] w-[320px] h-[320px] rounded-full bg-gradient-to-tl from-[#a3e635]/10 via-[#210a0e]/10 to-transparent blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient( rgba(255,235,191,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,235,191,0.02)_1px,transparent_1px)] bg-[size:75px_75px]" />
      </div>
    </section>
  );
}
