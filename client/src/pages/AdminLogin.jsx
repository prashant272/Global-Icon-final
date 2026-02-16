import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLogin() {
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await loginAsAdmin(email, password);
      // Navigation will be handled by useEffect to avoid race conditions
    } catch (err) {
      setError(err.message || "Unable to login as admin");
      setSubmitting(false);
    }
  };

  // Watch for successful admin login

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#161e34] via-[#232953] to-[#111827] flex items-center justify-center px-3 py-28 sm:px-6 md:px-10 lg:px-0">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_-10px_#3b82f6c5] border border-blue-400/20 rounded-2xl px-5 py-8 md:py-10 flex flex-col items-center sm:px-7">
        {/* admin icon */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-blue-600 via-blue-400 to-blue-200 p-1 rounded-full shadow-lg border-4 border-[#181f33]/60">
          <div className="bg-[#10182c] rounded-full flex items-center justify-center h-20 w-20">
            <svg
              className="h-14 w-14 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              viewBox="0 0 48 48"
            >
              <circle cx="24" cy="18" r="10" stroke="currentColor" />
              <path
                d="M8 42c0-6.5 7.5-12 16-12s16 5.5 16 12"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="mt-10 text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-[#c7e8ff] via-[#2196f3] to-[#0277bd] bg-clip-text text-transparent drop-shadow-md tracking-tight">
          Admin Dashboard Login
        </h1>
        <p className="mb-6 text-center text-base md:text-lg text-white/70">
          Restricted access. Only authorised award administrators are allowed.
        </p>

        {error && (
          <div className="mb-3 w-full rounded-xl bg-red-500/10 border border-red-400/40 px-3 py-2 text-center text-sm text-red-100 shadow-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 md:space-y-5 flex flex-col"
          autoComplete="off"
        >
          <div>
            <label className="block text-sm md:text-base font-semibold text-white/80 mb-1 ml-2">
              Admin Email
            </label>
            <input
              type="email"
              className="w-full transition-all duration-200 rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-950 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/90 placeholder:font-semibold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter admin email"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-semibold text-white/80 mb-1 ml-2">
              Password
            </label>
            <input
              type="password"
              className="w-full transition-all duration-200 rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-950 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/90 placeholder:font-semibold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Admin password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-100 via-blue-500 to-blue-400 text-blue-900 transition-all duration-200 px-4 py-2 text-base md:text-lg font-bold shadow-lg hover:from-blue-400 hover:to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 tracking-wider"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-blue-800"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="#2196f3"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-200/70">
          Need a new admin account?{" "}
          <Link
            to="/admin/register"
            className="text-blue-300 hover:text-blue-100 font-semibold underline decoration-blue-400/30"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}

