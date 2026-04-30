import { useState, useEffect, useCallback, useRef } from "react";
import { IoClose, IoCheckmarkCircle, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { getBaseUrl } from "../services/api";

const API_BASE = `${getBaseUrl()}/api/leads`;

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasClosedManually, setHasClosedManually] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    purpose: "",
    otp: "",
  });

  // Cookie Helpers
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    const hostname = window.location.hostname;
    let domainAttr = "";
    if (hostname !== "localhost" && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      const parts = hostname.split(".");
      if (parts.length >= 2) {
        const rootDomain = parts.slice(-2).join(".");
        domainAttr = `; domain=.${rootDomain}`;
      }
    }

    document.cookie = `${name}=${value || ""}${expires}; path=/${domainAttr}`;
  };

  const otpSentRef = useRef(false);

  // Check verification on mount
  useEffect(() => {
    const verified = getCookie("lead_verified") === "true";
    if (verified) {
      setIsVerified(true);
    }
  }, []);

  const openPopup = useCallback(() => {
    if (!isVerified) {
      setIsOpen(true);
    }
  }, [isVerified]);

  // Trigger 1: 300ms delay on first load
  useEffect(() => {
    if (isVerified || hasClosedManually) return;

    const timer = setTimeout(() => {
      openPopup();
    }, 300);

    return () => clearTimeout(timer);
  }, [isVerified, hasClosedManually, openPopup]);

  const [isSecondTime, setIsSecondTime] = useState(false);

  // Trigger 2: Scroll Trigger (300px) only AFTER it has been closed once
  useEffect(() => {
    if (isVerified || !hasClosedManually || isOpen) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsOpen(true);
        setHasClosedManually(false); 
        setIsSecondTime(true); // Mark as second time
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVerified, hasClosedManually, isOpen]);

  // Automatic OTP trigger when mobile reaches 10 digits
  useEffect(() => {
    const mobileDigits = formData.mobile.replace(/\D/g, "");
    if (mobileDigits.length === 10 && formData.name.length > 2 && !otpSentRef.current) {
      handleSendOTP(mobileDigits);
    }
  }, [formData.mobile, formData.name]);

  const handleSendOTP = async (mobileNumber) => {
    if (loading || otpSentRef.current) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: mobileNumber,
          purpose: formData.purpose === "Others" ? formData.customPurpose : (formData.purpose || "Nomination Inquiry"),
        }),
      });

      if (response.ok) {
        setOtpSent(true);
        otpSentRef.current = true;
        toast.success("OTP sent to your WhatsApp!", { icon: "🚀" });
      } else {
        // If it failed, reset so they can try again
        otpSentRef.current = false;
        const errData = await response.json();
        toast.error(errData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Auto OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (formData.otp.length !== 4) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp: formData.otp,
        }),
      });

      if (response.ok) {
        toast.success("Verification Successful!", { icon: "✅" });
        setIsVerified(true);
        setCookie("lead_verified", "true", 30); // 30 days = 1 month
        setTimeout(() => setIsOpen(false), 2000);
      } else {
        const data = await response.json();
        toast.error(data.message || "Invalid OTP code");
      }
    } catch (error) {
      toast.error("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
    setHasClosedManually(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 md:p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-[360px] md:max-w-md bg-gradient-to-b from-[#1c140d] to-[#0a0806] border border-[#d4af37]/30 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_0_60px_rgba(212,175,55,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Decorative Gold Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>

        {/* Close Button - Only show if it's NOT the second time */}
        {!isSecondTime && (
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-4 right-4 p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-[10001] cursor-pointer"
            aria-label="Close"
          >
            <IoClose size={20} />
          </button>
        )}

        <div className="p-4 md:p-10 pt-8 md:pt-12">
          {isVerified ? (
            <div className="flex flex-col items-center text-center py-6 md:py-10 space-y-3">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center animate-pulse">
                <IoCheckmarkCircle className="text-[#d4af37] w-10 h-10 md:w-12 md:h-12" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">Verified!</h2>
              <p className="text-[#d4af37]/80 text-xs md:text-sm font-medium tracking-wide">Thank you for connecting with us.</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-[#d4af37] to-gray-300 bg-clip-text text-transparent leading-tight">
                  Quick Access
                </h2>
                <p className="text-white/40 text-[10px] md:text-sm font-medium">Verify your mobile to continue</p>
              </div>

              <div className="space-y-3 md:space-y-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-semibold text-sm md:text-base"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Mobile Field */}
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-semibold text-sm md:text-base"
                    placeholder="WhatsApp Number"
                    value={formData.mobile}
                    maxLength={10}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                  />
                </div>

                {/* Purpose Field - Dropdown with "Others" logic */}
                <div>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-semibold text-sm md:text-base appearance-none cursor-pointer"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option value="Nomination Inquiry" className="bg-[#1a110d]">Nomination Inquiry</option>
                    <option value="Sponsorship" className="bg-[#1a110d]">Sponsorship</option>
                    <option value="Attendance" className="bg-[#1a110d]">Attending Event</option>
                    <option value="General" className="bg-[#1a110d]">General Inquiry</option>
                    <option value="Others" className="bg-[#1a110d]">Others</option>
                  </select>
                </div>

                {/* Custom Purpose Input - Only if "Others" is selected */}
                {formData.purpose === "Others" && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-semibold text-sm md:text-base"
                      placeholder="Please specify your purpose"
                      onChange={(e) => setFormData({ ...formData, customPurpose: e.target.value })}
                    />
                  </div>
                )}

                {/* OTP Field - Dynamic Visibility */}
                {otpSent && (
                  <div className="animate-in slide-in-from-top-2 duration-300 pt-1 text-center">
                    <div className="space-y-3">
                      <div className="space-y-0.5">
                        <div className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.2em] opacity-80">Enter 4-Digit OTP</div>
                        <p className="text-[9px] text-white/40 font-medium leading-tight">
                          This code is sent to WhatsApp. <br className="md:hidden" /> 
                          Please check WhatsApp in your phone.
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <input
                          required
                          maxLength={4}
                          type="text"
                          className="w-full max-w-[160px] text-center tracking-[0.4em] text-2xl md:text-3xl font-black bg-[#d4af37]/5 border border-[#d4af37]/40 rounded-xl md:rounded-2xl px-3 py-3 md:py-4 text-[#fae36f] focus:outline-none focus:border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all"
                          placeholder="----"
                          value={formData.otp}
                          autoFocus
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, otp: val });
                            if (val.length === 4) {
                              setTimeout(() => handleVerify(), 300);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {!otpSent ? (
                  <button
                    disabled={loading || formData.mobile.length < 10 || formData.name.length < 3}
                    onClick={() => handleSendOTP(formData.mobile)}
                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#8a6d1a] text-black font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-30 transition-all mt-2 text-xs md:text-base tracking-widest"
                  >
                    {loading ? "PROCESSING..." : "CONTINUE"}
                  </button>
                ) : (
                  <button
                    disabled={loading || formData.otp.length < 4}
                    onClick={handleVerify}
                    className="w-full bg-[#fae36f] text-black font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-30 transition-all text-xs md:text-base tracking-widest"
                  >
                    {loading ? "VERIFYING..." : "VERIFY NOW"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-8 py-5 bg-white/5 border-t border-white/5 flex items-center justify-center gap-2">
          <IoShieldCheckmarkOutline className="text-white/20" />
          <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">
            Official Global Icon Awards Access
          </p>
        </div>
      </div>
    </div>
  );
}
