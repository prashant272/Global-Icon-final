import { Fragment } from "react";

export default function FAQ() {
    const faqs = [
        {
            q: "What is Global Icon Awards 2026?",
            a: "Global Icon Awards 2026 is an international recognition platform that honours excellence, innovation, and leadership across Healthcare, Education, Business, Dental, and Lifestyle sectors.",
        },
        {
            q: "Who can apply for nomination?",
            a: "Hospitals, doctors, schools, universities, business leaders, entrepreneurs, dental clinics, and lifestyle brands from across the globe are invited to nominate themselves.",
        },
        {
            q: "What is the nomination process and deadline?",
            a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and documents. The current extended deadline is 15 April 2026 (subject to change); latest timelines are always updated on the official website.",
        },
        {
            q: "How are the winners selected?",
            a: "Winners are selected through a structured, multi-level evaluation process that includes research-based assessment, service quality, innovation, and industry impact, as described in the official Selection Process.",
        },
        {
            q: "Who are the judges? Is the evaluation fair?",
            a: "The judging panel includes eminent academicians, industry professionals, education analysts, and independent evaluators. The process is designed to remain transparent, unbiased, and independent at every stage.",
        },
        {
            q: "Where and when will the awards be held?",
            a: "Global Icon Awards 2026 will be organised in international editions, including a New Delhi Edition (14 March 2026) and a Dubai Edition (26 April 2026). Detailed venue and schedule updates are shared on the official website.",
        },
        {
            q: "What are the benefits of participating?",
            a: "Participants gain global recognition and industry credibility, enhanced brand visibility, media exposure, networking opportunities with industry leaders, and marketing assets such as certificates and winner logos.",
        },
        {
            q: "What documents are required for nomination?",
            a: "Applicants need to submit basic institution or individual details along with supporting documents such as academic certifications, innovation records, or student achievement data, as per the category guidelines.",
        },
        {
            q: "Is self-nomination allowed?",
            a: "Yes, self-nomination is allowed. Eligible institutions and individuals can nominate themselves directly for relevant categories.",
        },
        {
            q: "Can international organisations apply?",
            a: "Yes, organisations and professionals from all countries are welcome to apply for Global Icon Awards 2026.",
        },
        {
            q: "Can I apply for more than one category?",
            a: "Yes, applicants can apply for multiple relevant categories, subject to the specific eligibility guidelines of each category.",
        },
        {
            q: "Is there any nomination fee?",
            a: "Yes, nomination submission is subject to a standard nomination fee. The fee supports the rigorous evaluation process, research activities, and operational costs. Fee structures are shared before final submission.",
        },
        {
            q: "Is attending the award ceremony mandatory?",
            a: "Physical attendance is strongly recommended for networking and visibility, but not strictly mandatory. Representative or virtual attendance may be allowed as per specific event guidelines.",
        },
        {
            q: "Is the submitted information confidential?",
            a: "Yes, all data and documents submitted during nomination are kept strictly confidential and are used purely for evaluation and verification purposes.",
        },
        {
            q: "Can winners use the award logo and title?",
            a: "Yes, winners can use the official award logo, certificate, and title for academic branding, marketing, and promotional purposes as per the provided guidelines.",
        },
        {
            q: "Will winners receive media coverage?",
            a: "Yes, selected winners receive official media and promotional coverage through Prime Time Research Media and associated partner channels, as highlighted in the Media section.",
        },
        {
            q: "How will applicants be informed about the results?",
            a: "All official communication, including shortlisting and final results, is shared through the registered email address and contact number provided during the nomination process.",
        },
        {
            q: "How can we apply for sponsorship or partnership?",
            a: "For sponsorship or partnership opportunities, you can connect with our team via the official Contact Us page or the contact details provided in the footer.",
        },
        {
            q: "Are Global Icon Awards government-affiliated?",
            a: "No, Global Icon Awards is an independent recognition platform by Prime Time Research Media and is not directly affiliated with any government body.",
        },
        {
            q: "Where can we see previous editions or media coverage?",
            a: "Details of previous editions, award highlights, winners, and media coverage are available under the Previous Editions and Media sections of this website.",
        },
    ];

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-[#22130d] via-[#281910] to-[#1a0c07] text-[#f5f3f0] font-sans overflow-x-hidden pt-20">
            {/* Premium Animated Sparkles */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-16 right-[-60px] w-72 h-72 bg-gradient-to-br from-[#ffeec3]/30 via-[#d4af37]/30 to-transparent rounded-full blur-3xl animate-pulse opacity-70" />
                <div className="absolute bottom-[-60px] left-[-64px] w-80 h-80 bg-gradient-to-tr from-[#ffd966]/30 via-[#c62828]/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-50" />
                <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-[#d4af37]/15 rounded-full blur-2xl opacity-30 pointer-events-none animate-pulse" />
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-[#ffeec3]/20 to-transparent blur-sm opacity-60 animate-shimmer" />
            </div>

            <section className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 md:py-24">
                {/* Header block */}
                <div className="text-center mb-16 sm:mb-24">
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex animate-pulse text-4xl sm:text-5xl mr-3">✨</span>
                        <span className="inline-flex animate-pulse text-4xl sm:text-5xl text-[#ffd966]">🎓</span>
                        <span className="inline-flex animate-pulse text-4xl sm:text-5xl ml-3">✨</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading mb-4 tracking-tight bg-gradient-to-r from-[#fffbe7] via-[#ffe479] via-50% to-[#ffd966] bg-clip-text text-transparent drop-shadow-lg">
                        Global Icon Awards 2026
                        <span className="block text-xl sm:text-3xl font-[350] text-[#fce69a] tracking-[0.2em] opacity-90 mt-2 uppercase">
                            Frequently Asked Questions
                        </span>
                    </h1>
                    <div className="mt-6 w-32 sm:w-56 h-[6px] mx-auto rounded-full bg-gradient-to-r from-transparent via-[#ffd966] via-60% to-transparent shadow-[0_0_24px_4px_#ffeec377]" />
                    <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#ffefb0] max-w-3xl mx-auto font-medium tracking-wide leading-relaxed drop-shadow">
                        <span className="bg-gradient-to-br from-[#fffbe7] via-[#ffe79b] to-[#d4af37] bg-clip-text text-transparent font-bold">
                            Everything you need to know about nominations, eligibility, and celebrating excellence across industries—
                        </span> all in one place.
                    </p>
                </div>

                {/* FAQ GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {faqs.map((faq, index) => (
                        <Fragment key={index}>
                            <div className="
                relative group rounded-[2.5rem] overflow-hidden
                bg-gradient-to-br from-[#2a1b12]/85 via-[#3c230f]/95 to-[#dac377]/15
                border border-[#eed47c]/25 hover:border-[#ffd966]/70
                hover:scale-[1.03] shadow-2xl hover:shadow-[0_20px_50px_-10px_#ffd96644]
                p-8 sm:p-10 flex flex-col min-h-[260px] transition-all duration-500
                cursor-default box-border backdrop-blur-xl
              ">
                                {/* Top Accent Bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd966] via-[#ffeec3] to-[#d4af37] opacity-80"></div>
                                {/* Decorative Glow */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#ffeec3]/10 via-transparent to-transparent opacity-90 -z-10 rounded-b-[2.5rem] pointer-events-none" />

                                {/* Q Number Circle & Icon */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#fbf6df] via-[#ffe7a1] to-[#d4af37] rounded-full shadow-xl w-11 h-11 text-xl font-black text-[#a28533] border-2 border-[#ffeec3]/80 group-hover:rotate-[360deg] transition-transform duration-700">
                                        Q{index + 1}
                                    </span>
                                    <div className="h-px flex-grow bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
                                </div>

                                {/* Question */}
                                <h3 className="mb-4 text-xl sm:text-2xl font-black bg-gradient-to-r from-[#ffeec3] via-[#ffe07d] to-[#d4af37] bg-clip-text text-transparent drop-shadow group-hover:scale-[1.02] transition-transform duration-300 leading-tight">
                                    {faq.q}
                                </h3>

                                {/* Answer */}
                                <p className="text-base sm:text-lg text-[#ebdcc8] leading-relaxed font-medium mt-auto group-hover:text-white transition-colors duration-300">
                                    {faq.a}
                                </p>

                                {/* Bottom Accent */}
                                <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#d4af37] to-transparent opacity-40 group-hover:w-full group-hover:opacity-100 transition-all duration-700 rounded-full"></div>
                            </div>
                        </Fragment>
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="mt-20 mb-4 flex flex-col items-center">
                    <span className="inline-flex items-center gap-3 text-[#ffd966] text-lg sm:text-xl font-bold tracking-wide">
                        <svg className="w-6 h-6 animate-pulse text-[#ffd966]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                        </svg>
                        <span>Honouring Excellence & Innovation Globally</span>
                        <svg className="w-6 h-6 animate-pulse animation-delay-1000 text-[#ffd966]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                        </svg>
                    </span>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ffd966]/60 to-transparent mt-4 rounded-full shadow-gold" />
                    <p className="mt-6 text-xs font-bold text-gray-500 uppercase tracking-[0.4em]">
                        Prime Time Research Media Pvt. Ltd
                    </p>
                </div>
            </section>
        </div>
    );
}
