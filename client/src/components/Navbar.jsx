import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaUsers,
  FaBook,
  FaGavel,
  FaFileContract,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaTrophy,
  FaHistory,
  FaRegClone,
  FaRegEdit,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPreviousEditions, fetchUpcomingAwards } from "../services/api.js";

export default function Navbar() {
  const [showPill, setShowPill] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Scroll logic for body lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isNominateRoute = location.pathname.startsWith("/nominate");
  const isHomePage = location.pathname === "/";
  const isOtherPage = !isHomePage && !isAdminRoute && !isNominateRoute;
  const isUser = user?.role === "user";
  const isAdminUser = user?.role === "admin";
  // Ref for scrolling trick on tab change
  const headerRef = useRef();

  const [editions, setEditions] = useState([]);
  const [upcomingAwards, setUpcomingAwards] = useState([]);
  const [mobileUpcomingOpen, setMobileUpcomingOpen] = useState(false);
  const [mobileAwardsOpen, setMobileAwardsOpen] = useState(false);

  useEffect(() => {
    fetchPreviousEditions()
      .then((data) => setEditions(data))
      .catch((err) => console.error("Error fetching editions for navbar:", err));
    fetchUpcomingAwards()
      .then((data) => setUpcomingAwards(data))
      .catch((err) => console.error("Error fetching upcoming awards for navbar:", err));
  }, []);

  // Fix: Scroll to top ONLY relative to header on route (tab) change, but only scroll if not already near top
  useEffect(() => {
    if (!isAdminRoute && !isNominateRoute) {
      // Only scroll up if header is visible
      if (window.innerWidth < 768 && headerRef.current) {
        // Check if page is near the bottom, then scroll to just below header
        const y = window.scrollY;
        if (y > 80) {
          // Determine how much to scroll down so header doesn't overlap
          window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
        }
      }
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (isAdminRoute) return;

    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowPill(true);
      } else {
        setShowPill(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdminRoute]);

  const handleLoginClick = () => {
    if (isAdminRoute) {
      if (isAdminUser) {
        logout();
      } else {
        navigate("/admin/login");
      }
    } else {
      if (isUser) {
        logout();
      } else {
        navigate("/login");
      }
    }
  };


  // ===== Header for admin routes
  if (isAdminRoute) {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#0a0503] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <img
              src="/images/primetimelogo.gif"
              alt="PrimeTime Logo"
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold">Admin Dashboard</span>
              <span className="text-[11px] text-gray-300">
                Global Icon Awards – Internal Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdminUser && user ? (
              <span className="hidden md:inline text-xs text-gray-200">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            ) : null}
            {isAdminUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  /* ========================= MOBILE VIEW (PHONE) & DESKTOP ================================ */
  return (
    <>
      {/* Large screen header (hidden on phone) */}
      <div className="hidden md:block">
        {!showPill && (
          <header className="fixed top-0 w-full z-50 text-white" ref={headerRef}>
            <div className="bg-transparent h-14">
              <div className="max-w-7xl mx-auto px-6 h-full flex items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-24 h-10 flex items-center justify-center">
                    <img
                      src="/images/primetimelogo.gif"
                      alt="PrimeTime Logo"
                      className="absolute top-[-10px] left-[-60px] h-[100px] w-auto max-w-none object-contain z-50 drop-shadow-md"
                    />
                  </div>
                  <div className="flex gap-2 font-semibold whitespace-nowrap">
                    <span>Prime Time Research Media Pvt. Ltd. </span>
                    <span className="opacity-70">Global Icon Awards</span>
                  </div>
                </div>
                {/* RIGHT : LOGIN */}
                <div className="ml-auto flex items-center gap-3">
                  {isUser && user ? (
                    <>
                      <span className="hidden md:inline text-xs text-gray-100">
                        Welcome, <span className="font-semibold">{user.name}</span>
                      </span>
                      {user.role === "user" && (
                        <button
                          onClick={() => navigate("/dashboard")}
                          className="border border-[#d4af37] px-4 py-1 rounded-full text-xs text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
                        >
                          My Nominations
                        </button>
                      )}
                    </>
                  ) : null}
                  <button
                    onClick={handleLoginClick}
                    className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
                  >
                    {isUser ? "Logout" : "Register / Login"}
                  </button>
                </div>
              </div>
            </div>
            <nav className="bg-transparent h-12">
              <div className="max-w-7xl mx-auto px-6 h-full flex justify-center items-center gap-4 text-sm">
                {menuLinks("white", undefined, headerRef, isUser, false, editions, upcomingAwards)}
              </div>
            </nav>
          </header>
        )}

        {/* ================= SCROLL PILL FOR DESKTOP ================= */}
        {showPill && (
          <div className="fixed top-4 w-full z-50 flex justify-center">
            <div className="bg-[#0a0503]/90 backdrop-blur-md text-white border border-[#d4af37]/40 rounded-full shadow-lg px-6 py-1.5 flex items-center gap-6 text-sm">
              <div className="flex items-center font-semibold">
                <img
                  src="/images/primetimelogo.gif"
                  alt="Logo"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div className="flex gap-3">{menuLinks("white", undefined, headerRef, isUser, false, editions, upcomingAwards)}</div>
            </div>
          </div>
        )}
      </div>
      {/* ===================== MOBILE HEADER ====================== */}
      <div className="block md:hidden">
        {/* Phone header with logo, title, my nominations (if user), hamburger, login/logout */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center h-16 sm:h-20 px-4 justify-between ${showPill
            ? "bg-[#0a0503]/95 backdrop-blur-lg border-b border-white/10 shadow-xl"
            : "bg-transparent"
            }`}
          ref={headerRef}
        >
          {/* LOGO + app title (left side) */}
          <div className="flex items-center gap-1.5 overflow-hidden flex-1">
            <img
              src="/images/primetimelogo.gif"
              alt="PrimeTime Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] xs:text-[12px] font-bold text-white truncate leading-tight">
                Prime Time Research Media
              </span>
              <span className="text-[9px] text-[#d4af37] font-black uppercase tracking-tighter truncate">
                Global Icon Awards
              </span>
            </div>
          </div>
          {/* Welcome & logout/login */}
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            {isUser && (
              <button
                onClick={handleLoginClick}
                className="hidden xs:block border border-white text-white px-3 py-1 rounded-full text-[10px] hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            )}
            {!isUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-[10px] hover:bg-white hover:text-black transition"
              >
                {isUser ? "Logout" : "Login"}
              </button>
            )}
            <button
              aria-label="Open Menu"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl text-white text-xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
            >
              <FaBars />
            </button>
          </div>
        </header>
        {/* Slide-in Drawer */}
        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          user={user}
          isAuthenticated={isUser}
          handleLoginClick={handleLoginClick}
          headerRef={headerRef}
          isUser={isUser}
          editions={editions}
          upcomingAwards={upcomingAwards}
          mobileUpcomingOpen={mobileUpcomingOpen}
          setMobileUpcomingOpen={setMobileUpcomingOpen}
          mobileAwardsOpen={mobileAwardsOpen}
          setMobileAwardsOpen={setMobileAwardsOpen}
        />
      </div>
    </>
  );
}

/* ================= MENU ================= */

// onClick will be used to close drawer, headerRef for scroll fix on tab switch.
// Added showDashboard param to control visibility of "My Nominations" link
const menuLinks = (color, onClick, headerRef, isUser, isMobile = false, editions = [], upcomingAwards = [], mobileUpcomingOpen = false, setMobileUpcomingOpen = () => {}, mobileAwardsOpen = false, setMobileAwardsOpen = () => {}) => {
  // Will scroll page to just under header if in mobile and not at top
  const createNavHandler = (routeHandler) => (e) => {
    if (onClick) onClick();
    setTimeout(() => {
      // Gives enough time for route to change before trying to scroll
      if (window.innerWidth < 768 && headerRef && headerRef.current) {
        window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
      }
    }, 0);
    if (routeHandler && typeof routeHandler === 'function') routeHandler(e);
  };

  return (
    <>
      <NavItem to="/" icon={<FaHome />} label="Home" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/categories" icon={<FaListAlt />} label="Category" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/jury" icon={<FaUsers />} label="Guest" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/guidelines" icon={<FaBook />} label="Entry Guidelines" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/judging" icon={<FaGavel />} label="Selection Process" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/terms" icon={<FaFileContract />} label="T&C" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/terms" icon={<FaFileContract />} label="T&C" color={color} onClick={createNavHandler(onClick)} />
      
      {/* Upcoming Awards Dropdown */}
      <div className={`relative ${isMobile ? "w-full" : "group flex items-center h-full cursor-default"}`}>
        <div
          onClick={() => isMobile && setMobileUpcomingOpen(!mobileUpcomingOpen)}
          className={`flex items-center gap-1 transition-all duration-300 py-3 sm:py-4 cursor-pointer sm:cursor-default ${
            color === "white"
              ? "opacity-80 group-hover:opacity-100"
              : "text-gray-700 group-hover:text-black"
          }`}
        >
          <span className="text-[11px]"><FaTrophy /></span>
          <span className="whitespace-nowrap flex-1">Upcoming Awards</span>
          <FaChevronDown className={`text-[10px] ml-1 opacity-70 transition-transform duration-300 ${
            (isMobile ? mobileUpcomingOpen : true) ? "rotate-0 sm:group-hover:rotate-180" : ""
          } ${isMobile && mobileUpcomingOpen ? "rotate-180" : ""}`} />
        </div>

        {/* Dropdown Content */}
        <div className={`
          ${isMobile 
            ? `${mobileUpcomingOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 bg-white/5 rounded-2xl ml-4` 
            : "absolute top-[80%] left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]"
          } flex flex-col py-1 overflow-hidden
        `}>
          {upcomingAwards.length > 0 ? (
            <>
              {!isMobile && (
                <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                  Latest Summits
                </div>
              )}
              {upcomingAwards.map((award) => (
                <NavLink
                  key={award._id}
                  to={`/upcoming-awards/${award.slug}`}
                  onClick={createNavHandler(onClick)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    isMobile 
                    ? "text-gray-300 border-l border-white/10 hover:text-white" 
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  {award.title}
                </NavLink>
              ))}
            </>
          ) : (
            <span className="px-4 py-2 text-sm text-gray-400 italic">No upcoming events</span>
          )}
        </div>
      </div>

      {/* Awards Dropdown (Previous Editions) */}
      <div className={`relative ${isMobile ? "w-full" : "group flex items-center h-full cursor-default"}`}>
        <div
          onClick={() => isMobile && setMobileAwardsOpen(!mobileAwardsOpen)}
          className={`flex items-center gap-1 transition-all duration-300 py-3 sm:py-4 cursor-pointer sm:cursor-default ${
            color === "white"
              ? "opacity-80 group-hover:opacity-100"
              : "text-gray-700 group-hover:text-black"
          }`}
        >
          <span className="text-[11px]"><FaTrophy /></span>
          <span className="flex-1">Previous Edition</span>
          <FaChevronDown className={`text-[10px] ml-1 opacity-70 transition-transform duration-300 ${
            (isMobile ? mobileAwardsOpen : true) ? "rotate-0 sm:group-hover:rotate-180" : ""
          } ${isMobile && mobileAwardsOpen ? "rotate-180" : ""}`} />
        </div>

        {/* Dropdown Content */}
        <div className={`
          ${isMobile 
            ? `${mobileAwardsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 bg-white/5 rounded-2xl ml-4` 
            : "absolute top-[80%] left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]"
          } flex flex-col py-1 overflow-hidden
        `}>
          {editions.length > 0 ? (
            <>
              {!isMobile && (
                <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                  Previous Editions
                </div>
              )}
              {editions.map((e) => (
                <NavLink
                  key={e._id || e.year}
                  to={`/editions/${e.slug || e.year}`}
                  onClick={createNavHandler(onClick)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    isMobile 
                    ? "text-gray-300 border-l border-white/10 hover:text-white" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {e.title} {e.year ? `(${e.year})` : ""}
                </NavLink>
              ))}
            </>
          ) : (
            <span className="px-4 py-2 text-sm text-gray-400 italic">No previous awards</span>
          )}
        </div>
      </div>

      <NavItem to="/faq" icon={<FaQuestionCircle />} label="FAQ" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/nominate" icon={<FaRegEdit />} label="Nominate Now" color={color} onClick={createNavHandler(onClick)} isSpecial={true} />
      {isUser && showDashboard && (
        <NavItem
          to="/dashboard"
          icon={<FaRegClone />}
          label="My Nominations"
          color={color}
          onClick={createNavHandler(onClick)}
        />
      )}
    </>
  );
};

function NavItem({ to, icon, label, color, onClick, isSpecial }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1 transition-all duration-300 ${isSpecial ? "animate-nominate" : ""} ${isActive
          ? `font-semibold border-b-2 ${color === "white" ? "border-white" : "border-black"
          }`
          : color === "white"
            ? "opacity-80 hover:opacity-100"
            : "text-gray-700 hover:text-black"
        }`
      }
    >
      <span className="text-[11px]">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

/* ========== Mobile Menu Drawer =========== */
function MobileMenuDrawer({
  open,
  onClose,
  user,
  isAuthenticated,
  handleLoginClick,
  headerRef,
  isUser,
  editions,
  upcomingAwards,
  mobileUpcomingOpen,
  setMobileUpcomingOpen,
  mobileAwardsOpen,
  setMobileAwardsOpen
}) {
  // Esc key or overlay for closing drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Scroll to top logic for mobile menu tab change
  const handleNavClick = (navHandler) => (e) => {
    if (navHandler) navHandler(e);
    setTimeout(() => {
      if (window.innerWidth < 768 && headerRef && headerRef.current) {
        window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-all duration-200 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        aria-hidden={!open}
        onClick={onClose}
      ></div>
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[60] w-4/5 max-w-xs h-[100dvh] bg-[#0a0503] text-white shadow-lg transform transition-transform duration-250 ${open ? "translate-x-0" : "translate-x-full"
          } flex flex-col overflow-hidden`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        {/* Drawer header with logo */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 h-14 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src="/images/primetimelogo.gif"
              alt="PrimeTime Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-sm text-white">Prime Time Research Media Pvt. Ltd.</span>
          </div>
          <button
            aria-label="Close Menu"
            className="text-2xl text-white"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <nav className="flex-1 overflow-y-auto px-4 py-8 flex flex-col gap-2 scroll-smooth overscroll-contain">
            {/* Give headerRef & isUser to menuLinks for scroll fix and user-related links */}
            {/* Pass true for showDashboard to show My Nominations in mobile drawer */}
            {menuLinks("white", onClose, headerRef, isUser, true, editions, upcomingAwards, mobileUpcomingOpen, setMobileUpcomingOpen, mobileAwardsOpen, setMobileAwardsOpen)}
          </nav>
          <div className="flex-shrink-0 border-t border-white/10 px-4 py-6 flex flex-col gap-2 bg-[#0a0503]">
            {user && (
              <span className="text-xs text-gray-300">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            )}
            <button
              onClick={() => {
                handleLoginClick();
                onClose();
              }}
              className="border border-white px-4 py-1 rounded-full text-xs w-full hover:bg-white hover:text-black transition"
            >
              {isAuthenticated ? "Logout" : "Register / Login"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
