import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiMail, FiLock, FiArrowRight, FiShield, FiCheckCircle, FiKey } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { googleLoginUrl, forgotPassword, resetPassword } from "../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const { login, verifyOtp, resendOtp, handleAuthSuccess, socialLoginSync } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const processedRef = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);

  // Forgot Password States
  const [forgotStep, setForgotStep] = useState(0); // 0: Login, 1: Email, 2: OTP & New Password
  const [newPassword, setNewPassword] = useState("");
  const [isSocialLoggingIn, setIsSocialLoggingIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userStr = params.get("user");

    if (!token || !userStr || processedRef.current) return;

    processedRef.current = true;
    setIsSocialLoggingIn(true);
    try {
      const decodedUser = decodeURIComponent(userStr);
      const user = JSON.parse(decodedUser);

      // 1. Use the new sync method from AuthContext
      socialLoginSync({ token, user });
      toast.success("Portal Login!");

      // 2. Wait for the sync buffer before navigating
      const timer = setTimeout(() => {
        setIsSocialLoggingIn(false);
        navigate("/nominate", { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Social login auth error:", err);
      toast.error("Unable to complete Google login. Please try again.");
      setIsSocialLoggingIn(false);
    }
  }, [location.search, socialLoginSync, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await login(email, password);
      const from = location.state?.from?.pathname || "/nominate";
      navigate(from, { replace: true });
    } catch (err) {
      if (err.message && err.message.includes("verify")) {
        setShowOtp(true);
        toast.error("Account not verified. Please check OTP.");
      } else {
        setError(err.message || "Unable to login");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await verifyOtp(email, otp);
      toast.success("Login successful!");
      navigate("/nominate");
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    try {
      await resendOtp(email);
      toast.success("OTP resent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await forgotPassword({ email });
      toast.success("OTP sent to your email!");
      setForgotStep(2);
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await resetPassword({ email, otp, newPassword });
      toast.success("Password reset successful! Please login.");
      setForgotStep(0);
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const getHeading = () => {
    if (forgotStep === 1) return { title: "Reset Password", sub: "Enter your registered email" };
    if (forgotStep === 2) return { title: "Secure Account", sub: `Enter code sent to ${email}` };
    if (showOtp) return { title: "Verify Access", sub: `Enter code sent to ${email}` };
    return { title: "Welcome Back", sub: "Global Icon Awards 2026" };
  };

  const heading = getHeading();

  return (
    <section className="min-h-screen w-full bg-[#1a0b0d] flex items-center justify-center relative overflow-hidden px-4 pt-24 pb-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Social Login Loading Overlay */}
      {isSocialLoggingIn && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-6"></div>
          <h2 className="text-[#d4af37] text-2xl font-black uppercase tracking-widest animate-pulse">Authenticating...</h2>
          <p className="text-gray-500 mt-4 font-medium tracking-wide">Syncing your profile with Global Icon Awards</p>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 md:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#d4af37]/10">

          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
              {heading.title.split(' ')[0]} <span className="text-[#d4af37]">{heading.title.split(' ')[1]}</span>
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">{heading.sub}</p>
          </div>

          {error && forgotStep === 0 && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center animate-shake">
              {error}
            </div>
          )}

          {/* FORGOT PASSWORD - STEP 1: EMAIL */}
          {forgotStep === 1 && (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="group">
                <label className="block text-xs font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4af37] transition-colors">
                    <FiMail size={18} />
                  </span>
                  <input
                    type="email"
                    className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-lg font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter registered email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#b8860b] text-black font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? "Processing..." : (<>Send Reset OTP <FiArrowRight size={20} /></>)}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForgotStep(0)}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD - STEP 2: OTP & NEW PASSWORD */}
          {forgotStep === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-2 ml-1">Verification Code</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4af37] transition-colors">
                    <FiShield size={18} />
                  </span>
                  <input
                    type="text"
                    maxLength="6"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/50 text-center tracking-[0.5em] text-2xl"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="000000"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-2 ml-1">New Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4af37] transition-colors">
                    <FiKey size={18} />
                  </span>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/50"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#b8860b] text-black font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? "Resetting..." : (<>Update Password <FiCheckCircle size={20} /></>)}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForgotStep(1)}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}

          {/* VERIFY OTP (Registration fallback) */}
          {showOtp && forgotStep === 0 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="group text-left">
                <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-2 ml-1">Verification Code</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4af37] transition-colors">
                    <FiShield size={18} />
                  </span>
                  <input
                    type="text"
                    maxLength="6"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/50 text-center tracking-[0.5em] text-2xl"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="000000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#b8860b] text-black font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? "Verifying..." : (<>Verify & Login <FiCheckCircle size={20} /></>)}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resending}
                  className="text-[#d4af37] hover:text-[#f2d06b] font-bold transition-colors"
                >
                  {resending ? "Resending..." : "Resend OTP"}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* MAIN LOGIN FORM */}
          {forgotStep === 0 && !showOtp && (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label className="block text-xs font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#d4af37] transition-colors">
                      <FiMail size={20} />
                    </span>
                    <input
                      type="email"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-lg font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@organization.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#d4af37] transition-colors">
                      <FiLock size={20} />
                    </span>
                    <input
                      type="password"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-lg font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="text-xs text-[#d4af37] hover:text-[#f2d06b] transition-colors font-bold uppercase tracking-wider"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#b8860b] text-black font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {submitting ? "Processing..." : (
                    <>
                      Enter Dashboard
                      <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-[#1a0b0d] px-4 text-gray-500 font-bold">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-2xl hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>
            </>
          )}

          <p className="mt-8 text-center text-gray-400 font-medium tracking-wide">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-[#d4af37] font-bold hover:text-[#f2d06b] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#d4af37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
