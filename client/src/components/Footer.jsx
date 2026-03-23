import { Link } from "react-router-dom";
const gold = "#d4af37";
const goldGrad = `linear-gradient(90deg, #b2872d 0%, #d4af37 40%, #ffeec3 70%, #d4af37 100%)`;
const borderGold = "rgba(212,175,55,0.45)";
const bgGrad = "linear-gradient(120deg, #090402 0%, #0f0805 63%, #0a0503 100%)";

export default function Footer() {
  return (
    <footer
      className="mt-"
      style={{
        background: bgGrad,
        color: "#d6cfc8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Glow/Blurred Gradient Shape */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 blur-[80px] opacity-70 hidden lg:block"
        style={{
          width: 600,
          height: 180,
          background: "radial-gradient(circle at 50% 10%, #d4af3750 0%, transparent 90%)"
        }}
      ></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 md:py-10">
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-5
          gap-y-12 gap-x-8
        ">

          {/* ==== ABOUT/BRAND ==== */}
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src="/images/primetimelogo.gif"
                alt="GHA Logo"
                className="w-15 h-15 rounded-full shadow-md ring-2 ring-[#d4af37]/50 bg-black object-contain"
                loading="lazy"
              />
              <span
                className="font-heading text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: goldGrad }}>
                Global Icon Awards 2026
              </span>
            </div>
            <div
              className="mt-3 rounded-full h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-4"
            />
            <p className="text-sm lg:text-base font-medium leading-relaxed opacity-80">
              Recognising outstanding leadership, innovation & excellence across Healthcare, Education, Business, Dental, and Lifestyle – celebrating visionary organisations and individuals shaping tomorrow.
            </p>
          </div>

          {/* ==== QUICK LINKS ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f5f3f0] tracking-wide 
                border-l-4 pl-3 border-[#ffeec3]/20"
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Award Categories
                </Link>
              </li>
              <li>
                <Link to="/jury" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Guest
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Media
                </Link>
              </li>
            </ul>
          </div>

          {/* ==== INFORMATION ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f5f3f0] tracking-wide
                border-l-4 pl-3 border-[#ffeec3]/20"
            >
              Information
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/guidelines" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Entry Guidelines
                </Link>
              </li>
              <li>
                <Link to="/judging" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Selection Process
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  T&C
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ==== OTHER SERVICES (Prime Time Media) ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f5f3f0] tracking-wide
                border-l-4 pl-3 border-[#ffeec3]/20"
            >
              Other Services
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <a
                  href="https://primetimemedia.in/market-research/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Market Research
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/digital-marketing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/brand-reputation-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Brand Reputation Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/business-consultancy-services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Business Consultancy
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/public-relation-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Public Relation Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/social-media-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Social Media Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/web-development/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] hover:pl-2 transition-all duration-200"
                >
                  Web Development
                </a>
              </li>
            </ul>
          </div>

          {/* ==== POWERED BY PRIMETIME MEDIA, OFFICE ADDRESS & MAP ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f5f3f0] tracking-wide
                border-l-4 pl-3 border-[#ffeec3]/20"
            >
              Reach Us
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex items-start gap-2">
                <span className="inline-block w-5 mt-0.5 text-[#d4af37]">🏢</span>
                <span className="text-sm leading-snug">
                  <strong>Office:</strong> Prime Time Research Media Pvt. Ltd, C-31, Nawada Housing Complex, New Delhi-59
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-[#25D366]">📞</span>
                  <a href="tel:+919810882769" className="hover:text-[#d4af37] transition-all text-sm font-semibold">
                    +91 9810 88 2769 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Nominations)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-[#d4af37]">📞</span>
                  <a href="tel:+919971002984" className="hover:text-[#d4af37] transition-all text-sm font-semibold">
                    +91 9971 00 2984 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Sponsorship)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-[#d4af37]">📞</span>
                  <a href="tel:+919810910686" className="hover:text-[#d4af37] transition-all text-sm font-semibold">
                    +91 9810 91 0686 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Helpline)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-[#d4af37]">☎️</span>
                  <a href="tel:+911169268754" className="hover:text-[#d4af37] transition-all text-sm font-semibold">
                    +91 11-69268754
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="https://www.google.com/maps?rlz=1C1RXQR_enIN1124IN1124&gs_lcrp=EgZjaHJvbWUqCAgDEAAYFhgeMgYIABBFGDkyCAgBEAAYFhgeMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIGCAYQRRg8MgYIBxBFGDzSAQkxOTUwN2owajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQenTyiUHQ05MT3R_yU-7TvL&daddr=housing+complex,+Plot+No+C31,+Najafgarh+Rd,+Block+C,+Vipin+Garden,+Nawada,+New+Delhi,+Delhi,+110059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 hover:bg-[#ffeec3]/20 hover:border-[#d4af37] text-[#d4af37] font-semibold transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 2.71 1.99 6.42 6.21 11.54a1 1 0 0 0 1.58 0C17.01 15.42 19 11.71 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                      fill="currentColor"
                    />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
            </div>
          </div>
        </div>
      </div>

      {/* Gold gradient border line */}
      <div
        className="w-full h-1"
        style={{
          background: goldGrad,
          opacity: "0.6"
        }}
      />

      {/* BOTTOM BAR */}
      <div
        className="text-center text-xs md:text-sm py-6 px-3 border-t border-[#d4af37]/20"
        style={{ background: "rgba(0,0,0,0.10)" }}
      >
        <span
          className="font-semibold text-base sm:text-lg"
          style={{
            background: goldGrad,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Global Icon Awards
        </span>

        {" "} &bull; © {new Date().getFullYear()} All Rights Reserved
        {" "} | This page is owned by{" "}
        <span className="text-[#d4af37] font-bold">
          Prime Time Research Media Pvt. Ltd
        </span>

        {/* Developer Credit Badge */}
        <div className="mt-4 flex justify-center pb-6">
          <a
            href="https://primeimpact.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(212,175,55,0.55)",
              background: "linear-gradient(90deg, rgba(212,175,55,0.08) 0%, rgba(255,238,195,0.13) 50%, rgba(212,175,55,0.08) 100%)",
              boxShadow: "0 0 14px 2px rgba(212,175,55,0.18)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 24px 6px rgba(212,175,55,0.38)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.9)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 14px 2px rgba(212,175,55,0.18)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.55)";
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(214,207,200,0.75)", letterSpacing: "0.04em", fontWeight: 500 }}>
              ✦ Designed &amp; Developed by
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                background: "linear-gradient(90deg, #b2872d 0%, #d4af37 40%, #ffeec3 70%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Prime Impact Solutions
            </span>
          </a>
        </div>
      </div>

    </footer>
  );
}
