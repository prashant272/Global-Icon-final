import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, initialised, isAuthenticating } = useAuth();
  const location = useLocation();

  if (!initialised || isAuthenticating) {
    return (
      <div className="fixed inset-0 bg-[#1a0b0d] z-[999] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-6"></div>
        <h2 className="text-[#d4af37] text-xl font-bold uppercase tracking-widest animate-pulse">Syncing Session...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If this route is meant for admins, send to admin login page instead of user login.
    // User requested to send guests to /register for nomination flow instead of /login
    const loginPath = allowedRoles?.includes("admin") ? "/admin/login" : "/register";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect users with wrong role to home
    return <Navigate to="/" replace />;
  }

  return children;
}



