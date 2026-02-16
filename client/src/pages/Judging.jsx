export default function Judging() {
  // Card step data
  const steps = [
    {
      icon: "📥",
      title: "Step 1: Nomination Submission & Eligibility Check",
      description: (
        <>
          All nominations are submitted through an official online process.<br />
          Each entry is screened for:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Eligibility criteria</li>
            <li>Category relevance</li>
            <li>Completeness of information</li>
            <li>Supporting documents and evidence</li>
          </ul>
          <span className="block mt-3 text-[#22d3ee] font-semibold">👉 Incomplete or ineligible nominations are not carried forward.</span>
        </>
      ),
      gradient: "from-[#21184a]/80 via-[#442430]/60 to-[#210a0e]/90",
      border: "border-[#facc15]/30",
    },
    {
      icon: "🔍",
      title: "Step 2: Research & Data Validation",
      description: (
        <>
          Our in-house research team performs qualitative and quantitative analysis, including:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Background research</li>
            <li>Performance indicators</li>
            <li>Innovation impact</li>
            <li>Market relevance</li>
            <li>Industry standards compliance</li>
          </ul>
          <span className="block mt-3 text-[#fbbf24] font-semibold">
            👉 This ensures factual accuracy and consistency across all entries.
          </span>
        </>
      ),
      gradient: "from-[#210a0e]/80 via-[#3b2f41]/80 to-[#311030]/70",
      border: "border-[#fbbf24]/25",
    },
    {
      icon: "👨‍⚖️",
      title: "Step 3: Independent Jury Evaluation",
      description: (
        <>
          Shortlisted nominations are evaluated by an eminent and independent jury panel comprising:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Industry experts</li>
            <li>Senior academicians</li>
            <li>Academic professionals</li>
            <li>Policy and domain specialists</li>
          </ul>
          <span className="block mt-3 text-[#60a5fa] font-semibold">
            Each jury member evaluates independently, ensuring:
            <br />
            <span className="ml-3">Zero bias</span>
            <br />
            <span className="ml-3">Transparency</span>
            <br />
            <span className="ml-3">Ethical practices</span>
          </span>
        </>
      ),
      gradient: "from-[#221a22]/80 via-[#25314c]/60 to-[#210a0e]/60",
      border: "border-[#60a5fa]/30",
    },
    {
      icon: "📊",
      title: "Step 4: Scoring & Benchmarking",
      description: (
        <>
          Each nomination is scored with a standardized framework, based on:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Excellence & leadership</li>
            <li>Innovation & impact</li>
            <li>Sustainability & scalability</li>
            <li>Industry contribution</li>
          </ul>
          <span className="block mt-3 text-[#fb7185] font-semibold">
            Scores are benchmarked against global best practices and sector standards.
          </span>
        </>
      ),
      gradient: "from-[#210a0e]/90 via-[#4b3325]/70 to-[#6b21a8]/10",
      border: "border-[#fb7185]/30",
    },
    {
      icon: "⚖️",
      title: "Step 5: Score Normalisation & Final Validation",
      description: (
        <>
          To eliminate subjectivity:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Scores from multiple evaluators are normalised</li>
            <li>Cross-checks are performed</li>
            <li>Internal validation ensures fairness and balance</li>
          </ul>
          <span className="block mt-3 text-[#34d399] font-semibold">
            👉 Guarantees equal opportunity for all nominees across categories.
          </span>
        </>
      ),
      gradient: "from-[#212820]/90 via-[#134e4a]/70 to-[#210a0e]/90",
      border: "border-[#34d399]/30",
    },
    {
      icon: "🏅",
      title: "Step 6: Final Review & Approval",
      description: (
        <>
          The final list of awardees undergoes:
          <ul className="list-inside list-disc ml-4 mt-2 space-y-1">
            <li>Internal audit</li>
            <li>Final approval by the awards committee</li>
            <li>Confidential verification process</li>
          </ul>
          Once approved, winners are officially announced and invited for the Award Ceremony.
        </>
      ),
      gradient: "from-[#734418]/70 via-[#210a0e]/80 to-[#d97706]/10",
      border: "border-[#f59e42]/20",
    },
  ];

  const principles = [
    {
      icon: "🔎", title: "Transparency",
      desc: "Clear and documented evaluation criteria"
    },
    {
      icon: "🕊️", title: "Independence",
      desc: "Jury decisions are unbiased and confidential"
    },
    {
      icon: "🛡️", title: "Integrity",
      desc: "Ethical and professional standards at every stage"
    },
    {
      icon: "🔒", title: "Confidentiality",
      desc: "All nomination data is securely protected"
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#210a0e] selection:bg-[#ffeec350] py-24 overflow-hidden flex flex-col">
      {/* Decorative mesh gradients */}
      <div className="absolute -top-20 -left-32 w-[500px] h-[420px] rounded-full bg-gradient-to-br from-[#fbbf24]/20 via-[#210a0e]/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-120px] right-[-70px] w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-[#a3e635]/30 via-[#210a0e]/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient( rgba(255,235,191,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,235,191,0.04)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none z-0" />

      {/* Hero Title */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-8 md:pt-12 pb-5 md:pb-8">
        <h1 className="text-2xl md:text-4xl font-heading font-extrabold bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#eab308] bg-clip-text text-transparent mb-4 drop-shadow-lg tracking-wide">
          Global Education Excellence Awards 2026: Selection Process
        </h1>
        <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#fbbf24]/0 via-[#fde68a]/80 to-[#fbbf24]/0 mb-4 opacity-80" />
        <p className="text-[#fde68a]/90 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          The Awards follow a multi-stage, transparent, and fair evaluation framework using both research and eminent jury mechanisms, recognising only the most deserving organizations and individuals.
        </p>
      </div>

      {/* STEPS GRID */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-0 grid gap-7 md:gap-10 grid-cols-1 sm:grid-cols-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`
              relative group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
              flex flex-col
              px-5 py-7 sm:px-6 sm:py-7 md:px-8 md:py-8
              min-h-[380px] max-h-full
              rounded-2xl border backdrop-blur bg-gradient-to-br
              ${step.gradient} ${step.border}
              ${idx % 2 === 1 ? "sm:mt-8" : ""}
              shadow-md
            `}
            style={{
              minHeight: "380px", // ensures all cards are the same min height
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            {/* Gradient mesh accent */}
            <div className={`absolute right-[-30px] top-[-30px] w-28 h-20 opacity-60 pointer-events-none z-0 ${idx % 2 === 0 ? "bg-gradient-to-bl from-[#fde68a80] to-transparent" : "bg-gradient-to-br from-[#fbbf2480] to-transparent"}`} />
            {/* Step icon + title */}
            <div className="relative z-10 flex items-center gap-2 mb-4">
              <span className="text-2xl md:text-3xl">{step.icon}</span>
              <span className="text-base md:text-lg font-bold text-transparent bg-gradient-to-r from-[#fde68a] to-[#fbbf24] bg-clip-text">{step.title}</span>
            </div>
            <div className="relative z-10 text-[#f1f5f9]/90 text-sm md:text-base leading-relaxed font-medium flex-1">
              {step.description}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-36 md:w-44 h-1 rounded-full bg-gradient-to-r from-[#fbbf24] via-[#fde68a] to-[#fbbf24] mx-auto opacity-70 mt-14 mb-6" />

      {/* Core Principles */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center mb-10 md:mb-16">
        <div className="flex flex-wrap justify-center gap-4 md:gap-7 mb-9">
          {principles.map((p, i) => (
            <div
              key={i}
              className="bg-[#fde68a]/[0.07] rounded-xl px-4 py-4 min-w-[130px] border border-[#fec869]/20 flex flex-col items-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                minWidth: 160,
                maxWidth: 220,
                minHeight: 120,
                height: "100%",
              }}
            >
              <span className="text-lg mb-1">{p.icon}</span>
              <div className="font-semibold bg-gradient-to-r from-[#fde68a] via-[#fffbe7] to-[#fbbf24] bg-clip-text text-transparent text-base md:text-lg">{p.title}</div>
              <div className="text-[#fde68a]/80 text-xs md:text-sm">{p.desc}</div>
            </div>
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-[#fde68a] via-[#fbbf24] to-[#fffbe7] bg-clip-text text-transparent drop-shadow-lg">
          Why This Process Matters
        </h2>
        <p className="text-[#fde68a]/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Our rigorous and transparent selection process ensures awards are merit-based, truly credible, and that every winner enjoys global trust and respect in the education sector.
        </p>
      </div>
    </section>
  );
}
