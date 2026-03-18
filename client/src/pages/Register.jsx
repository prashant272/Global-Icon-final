import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiUser, FiMail, FiLock, FiUserPlus, FiShield, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { googleLoginUrl } from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const { register, verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      console.log("Attempting registration for:", { name, email });
      const response = await register(name, email, password);
      console.log("Registration response:", response);
      toast.success("OTP sent to your email!");
      setShowOtp(true);
    } catch (err) {
      console.error("Registration error details:", err);
      setError(err.message || "Unable to create account");
      toast.error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await verifyOtp(email, otp);
      toast.success("Account verified successfully!");
      const from = location.state?.from?.pathname || "/nominate";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Verification failed");
      toast.error(err.message || "Verification failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    try {
      await resendOtp(email);
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <section className="min-h-screen w-full bg-[#0a0503] flex items-center justify-center relative overflow-hidden px-4 pt-24 pb-12">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 md:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#d4af37]/10">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
              Join Awards
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">Create your account for Global Icon Awards</p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
              {error}
            </div>
          )}

          {showOtp ? (
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
                    className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-center tracking-[0.5em] text-2xl font-bold"
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
                {submitting ? "Verifying..." : (<>Verify Account <FiCheckCircle size={20} /></>)}
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
                  Back to Registration
                </button>
              </div>
            </form>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group text-left">
                  <label className="block text-xs font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Full Name / Org</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#d4af37] transition-colors">
                      <FiUser size={20} />
                    </span>
                    <input
                      type="text"
                      id="register-name"
                      name="name"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-lg font-medium"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="group text-left">
                  <label className="block text-xs font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#d4af37] transition-colors">
                      <FiMail size={20} />
                    </span>
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/15 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] text-lg font-medium"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                      placeholder="name@organization.com"
                    />
                  </div>
                </div>

                <div className="group text-left">
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
                      minLength={6}
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#b8860b] text-black font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {submitting ? "Creating your account..." : (
                    <>
                      Register Now
                      <FiUserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-[#0a0503] px-4 text-gray-500 font-bold">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-2xl hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <FcGoogle size={24} />
                <span>Sign up with Google</span>
              </button>
            </>
          )}

          <p className="mt-8 text-center text-gray-400 font-medium tracking-wide">
            If you are already registered, please login {" "}
            <Link
              to="/login"
              className="text-[#d4af37] font-bold hover:text-[#f2d06b] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#d4af37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}


