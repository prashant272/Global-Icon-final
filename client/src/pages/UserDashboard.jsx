import { useEffect, useState } from "react";
import { fetchMyNominations } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Crown, UserCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_LABELS = {
  nominated: "Nominated",
  evaluation: "Under Evaluation",
  in_progress: "Shortlisted",
  selected: "Selected",
  rejected: "Rejected",
};
const STATUS_COLORS = {
  nominated:
    "bg-gradient-to-tr from-blue-800/60 via-blue-400/20 to-blue-700/10 text-blue-100 border-blue-400/50",
  evaluation:
    "bg-gradient-to-tr from-yellow-900/70 via-yellow-400/20 to-yellow-800/10 text-yellow-100 border-yellow-400/50",
  selected:
    "bg-gradient-to-tr from-emerald-800/60 via-emerald-500/20 to-emerald-700/10 text-emerald-100 border-emerald-400/50",
  in_progress:
    "bg-gradient-to-tr from-lime-900/70 via-lime-400/20 to-lime-800/10 text-lime-100 border-lime-400/50",
  rejected:
    "bg-gradient-to-tr from-red-900/60 via-red-500/20 to-red-800/10 text-red-100 border-red-400/50",
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setError("");
      try {
        const data = await fetchMyNominations(token);
        if (!cancelled) {
          setNominations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load your nominations");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    if (token) {
      load();
    } else {
      setLoading(false);
      setNominations([]);
    }
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <section className="relative min-h-screen py-16 px-2 sm:py-20 sm:px-4 md:px-8 bg-[#0a0503] text-white flex items-start justify-center">
      {/* Decorations for premium look */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[90vw] max-w-[700px] h-[80vw] max-h-[220px] rounded-[14vw] blur-[14vw] opacity-80 bg-gradient-to-br from-[#ffeec3]/40 via-[#d4af37]/50 to-[#c62828]/30" />
      <div className="pointer-events-none absolute right-[-8vw] lg:right-[-20vw] bottom-4 sm:bottom-9 z-0 w-[60vw] max-w-[430px] h-[40vw] max-h-[300px] rounded-[15vw] blur-[15vw] opacity-70 bg-gradient-to-br from-[#ffd966]/30 via-[#d4af37]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-1 sm:px-2 md:px-0">
        {/* Dashboard Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#ffeec3]/25 bg-black/40 shadow-[0_6px_22px_#c4a44038] md:shadow-[0_18px_48px_#c4a44048] backdrop-blur-3xl overflow-hidden">
          {/* Header Premium */}
          <header className="relative px-3 xs:px-5 sm:px-7 md:px-14 pt-7 sm:pt-10 pb-5 sm:pb-7 bg-gradient-to-br from-[#0a0503]/80 via-[#0f0805]/90 to-[#0a0503]/75 shadow-gold flex flex-col items-center gap-2 sm:gap-3 border-b border-[#ffd966]/15">
            <div className="flex flex-col xs:flex-row items-center justify-center gap-1.5 xs:gap-3 sm:gap-4 text-center w-full">
              <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffedc3] drop-shadow-gold animate-gold-glow" />
              <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-[#ffeec3] via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent [text-shadow:0_1px_6px_#d4af3740] drop-shadow-2xl">
                My Nominations Dashboard
              </h1>
              <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffedc3] drop-shadow-gold animate-gold-glow-slow" />
            </div>
            <div className="h-[2.5px] sm:h-[3px] w-36 sm:w-44 rounded-full my-2 bg-gradient-to-r from-[#d4af37] via-[#ffeec3] to-[#c62828] opacity-90" />
            {user && (
              <div className="flex flex-col xs:flex-row items-center gap-2 xs:gap-3 mt-1 mb-1.5 text-center xs:text-left">
                <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd966] bg-black/40 rounded-full shadow-md ring-1 ring-[#d4af37]/25" />
                <div className="text-sm sm:text-base md:text-lg font-semibold text-[#ffeec3]">
                  {user.name}
                  <span className="text-xs sm:text-sm text-[#ffeec3]/70 ml-1 sm:ml-2 font-medium inline-block align-middle">
                    ({user.email})
                  </span>
                </div>
              </div>
            )}
            {nominations[0] && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">
                <span className="text-[#ffeec3]/80 font-medium">
                  Latest Nomination Status:
                </span>
                <StatusBadge status={nominations[0].status} />
                <span className="text-[#ffeec3]/35 font-medium">
                  (Latest nomination only)
                </span>
              </div>
            )}
          </header>

          {error && (
            <div className="mx-2 sm:mx-6 mt-7 rounded-lg border border-red-700/40 bg-gradient-to-br from-red-900/40 to-black/50 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-red-100 shadow-lg animate-shake">
              {error}
            </div>
          )}

          <div className="px-2 sm:px-4 md:px-8 py-6 sm:py-8 min-h-[90px] sm:min-h-[100px]">
            {loading ? (
              <div className="flex items-center justify-center text-base sm:text-lg text-[#ffeec3]/70 h-24 sm:h-32 animate-pulse">
                Loading your nominations...
              </div>
            ) : nominations.length === 0 ? (
              <div className="flex items-center justify-center text-xs sm:text-base text-[#ffeec3]/70 h-24 sm:h-32">
                You have not submitted any nominations yet.
              </div>
            ) : (
              <div className="grid gap-5 sm:gap-7 md:gap-8 py-1 sm:py-2">
                {nominations.map((n, i) => (
                  <article
                    key={n._id}
                    className={`
                      relative overflow-visible
                      rounded-xl sm:rounded-2xl group border border-[#ffd966]/30 bg-gradient-to-tr
                      from-[#0a0503]/70 via-[#0f0805]/85 to-[#0a0503]/80 shadow-[0_2px_10px_0_#d4af3710] sm:shadow-[0_4px_24px_0_#d4af371a]
                      hover:shadow-[0_5px_18px_0_#ffeec350] sm:hover:shadow-[0_6px_34px_0_#ffeec370] transition duration-300
                      px-3 pt-5 pb-4 xs:px-4 xs:pt-6 xs:pb-5 sm:px-6 sm:pt-7 sm:pb-6 md:px-10 md:pt-9 md:pb-8
                    `}
                    style={{
                      animation: `fade-in-bottom 0.4s both ${i * 90}ms`,
                    }}
                  >
                    {/* Card Glow Top Left */}
                    <div className="absolute -top-5 sm:-top-6 -left-4 sm:-left-8 w-24 sm:w-32 h-20 sm:h-28 bg-gradient-to-br from-[#d4af37]/15 via-[#ffeec3]/15 to-transparent rounded-full blur-xl sm:blur-2xl pointer-events-none z-0" />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex-1 min-w-[120px] xs:min-w-[150px] sm:min-w-[180px]">
                        <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#ffd966] bg-clip-text mb-0.5">
                          {n.nomineeName}
                        </h2>
                        <h3 className="text-xs xs:text-sm sm:text-base text-[#ffeec3]/80 font-semibold mb-2">
                          {n.organization}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2 text-xs xs:text-sm sm:text-sm font-medium text-[#ffeec3]/80">
                          <span className="inline-block bg-[#d4af37]/20 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-semibold shadow ring-[1.2px] ring-[#ffd966]/10">
                            {n.participationType}
                          </span>
                          {n.field && (
                            <span className="inline-block bg-blue-900/40 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-blue-400/30 text-blue-300 font-semibold shadow ring-1 ring-blue-400/10">
                              {n.field}
                            </span>
                          )}
                          <span className="inline-block bg-[#c62828]/15 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-[#c62828]/25 text-[#c62828] font-semibold shadow ring-1 ring-[#ffd966]/10">
                            {n.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 md:mt-0 self-end md:self-auto">
                        <StatusBadge status={n.status} />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-col gap-1 text-xs xs:text-sm sm:text-sm text-[#ffeec3]/80 italic">
                        <span>
                          <span className="font-bold text-[#ffd966] not-italic">
                            Submitted on{" "}
                          </span>
                          {n.createdAt
                            ? new Date(n.createdAt).toLocaleString()
                            : "-"}
                        </span>
                        {n.remarks && (
                          <span className="line-clamp-1 max-w-xs text-[#ffeec3]/60 not-italic">
                            <span className="font-semibold text-[#fff]/90 mr-1">
                              Remarks:
                            </span>
                            {n.remarks}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/nomination/${n._id}`)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] font-bold uppercase tracking-widest text-[10px] hover:bg-[#d4af37] hover:text-black transition-all group"
                      >
                        See All Details <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom CSS for premium UI */}
        <style>{`
          @media (max-width: 639px) {
            .font-heading { font-size: 5vw !important; }
          }
          @keyframes fade-in-bottom {
            0% { opacity: 0; transform: translateY(24px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .drop-shadow-gold {
            filter: drop-shadow(0 0 10px #ffd966) drop-shadow(0 0 5px #d4af37a3);
          }
          .animate-gold-glow {
            animation: gold-glow 2.1s infinite alternate;
          }
          .animate-gold-glow-slow {
            animation: gold-glow 3.7s infinite alternate;
          }
          .shadow-gold {
            box-shadow: 0 2px 16px 0 #d4af3770;
          }
          @keyframes gold-glow {
            from { filter: drop-shadow(0 0 8px #ffd966cc);}
            to { filter: drop-shadow(0 0 24px #ffeec388); }
          }
          .hover\\:shadow-gold:hover {
            box-shadow: 0 8px 36px 0 #ffeec340, 0 4px 18px #d4af3760;
          }
        `}</style>
      </div>
    </section>
  );
}

// Make the badges scale down well on very small screens!
function StatusBadge({ status }) {
  const normalized = status || "nominated";
  const label = STATUS_LABELS[normalized] || "Nominated";
  const colorClasses = STATUS_COLORS[normalized] || STATUS_COLORS.nominated;
  let dotColor =
    normalized === "selected"
      ? "bg-emerald-300"
      : normalized === "evaluation"
        ? "bg-yellow-300"
        : normalized === "rejected"
          ? "bg-red-400"
          : "bg-blue-400";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm md:text-base
        font-bold uppercase tracking-widest shadow
        ${colorClasses}
      `}
      style={{
        letterSpacing: "0.11em",
        boxShadow: "0 2px 14px 0 rgba(212,175,55,0.12)",
      }}
    >
      <span
        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-1 sm:mr-2 border-2 border-current ${dotColor}`}
      />
      <span className="tracking-wide">{label}</span>
    </span>
  );
}
