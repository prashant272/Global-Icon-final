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
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [showPill, setShowPill] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
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
      <header className="fixed top-0 w-full z-50 bg-[#020617] text-white border-b border-white/10">
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
                      className="absolute top-[-10px] left-[-30px] h-[100px] w-auto max-w-none object-contain z-50 drop-shadow-md"
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
              <div className="max-w-7xl mx-auto px-6 h-full flex justify-center items-center gap-6 text-sm">
                {menuLinks("white", undefined, headerRef, isUser, false)}
              </div>
            </nav>
          </header>
        )}

        {/* ================= SCROLL PILL FOR DESKTOP ================= */}
        {showPill && (
          <div className="fixed top-4 w-full z-50 flex justify-center">
            <div className="bg-white text-black rounded-full shadow-lg px-6 py-3 flex items-center gap-8 text-sm">
              <div className="flex items-center gap-3 font-semibold">
                <img
                  src="/images/primetimelogo.gif"
                  alt="Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="flex gap-5">{menuLinks("black", undefined, headerRef, isUser, false)}</div>
            </div>
          </div>
        )}
      </div>
      {/* ===================== MOBILE HEADER ====================== */}
      <div className="block md:hidden">
        {/* Phone header with logo, title, my nominations (if user), hamburger, login/logout */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center h-16 sm:h-20 px-4 justify-between ${showPill
            ? "bg-[#210a0e]/95 backdrop-blur-lg border-b border-white/10 shadow-xl"
            : "bg-transparent"
            }`}
          ref={headerRef}
        >
          {/* LOGO + app title (left side) */}
          <div className="flex items-center gap-2">
            <img
              src="/images/primetimelogo.gif"
              alt="PrimeTime Logo"
              className="h-9 w-auto object-contain"
              style={{ maxWidth: 40 }}
            />
            <span className="text-[13px] font-semibold whitespace-nowrap text-white">Prime Time Research Media Pvt. Ltd.</span>
          </div>
          {/* Welcome & logout/login */}
          <div className="flex items-center gap-1">
            {isUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            )}
            {!isUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Register / Login
              </button>
            )}
            <button
              aria-label="Open Menu"
              onClick={() => setMobileMenuOpen(true)}
              className="ml-2 text-white text-xl flex items-center justify-center"
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
        />
      </div>
    </>
  );
}

/* ================= MENU ================= */

// onClick will be used to close drawer, headerRef for scroll fix on tab switch.
// Added showDashboard param to control visibility of "My Nominations" link
const menuLinks = (color, onClick, headerRef, isUser, showDashboard = true) => {
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
      <NavItem to="/contact" icon={<FaEnvelope />} label="Contact Us" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/media" icon={<FaTrophy />} label="Media" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/previous-editions" icon={<FaHistory />} label="Previous Editions" color={color} onClick={createNavHandler(onClick)} />
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
  isUser
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
        className={`fixed top-0 right-0 z-[60] w-4/5 max-w-xs h-full bg-[#17171c] text-white shadow-lg transform transition-transform duration-250 ${open ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        {/* Drawer header with logo */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
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
        <div className="flex-1 flex flex-col justify-between">
          <nav className="flex flex-col gap-3 mt-6 px-4">
            {/* Give headerRef & isUser to menuLinks for scroll fix and user-related links */}
            {/* Pass true for showDashboard to show My Nominations in mobile drawer */}
            {menuLinks("white", onClose, headerRef, isUser, true)}
          </nav>
          <div className="mt-6 border-t border-white/10 px-4 py-4 flex flex-col gap-2">
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
