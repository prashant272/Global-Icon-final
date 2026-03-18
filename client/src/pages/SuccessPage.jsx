import { FiCheckCircle, FiPhoneCall, FiMail } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {
    const location = useLocation();
    const autoCreated = location.state?.autoCreated;

    return (
        <div className="min-h-screen bg-[#0a0503] flex items-center justify-center p-4 pt-24 sm:pt-32 overflow-hidden relative">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[80px]"></div>
            </div>

            <div className="max-w-xl w-full bg-black/40 border border-[#d4af37]/20 rounded-2xl sm:rounded-3xl p-6 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative z-10 transition-all hover:border-[#d4af37]/40 ring-1 ring-white/5">
                <div className="flex justify-center mb-6">
                    <FiCheckCircle className="text-[#d4af37] w-20 h-20 animate-bounce" />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37] mb-4">
                    Submission Successful!
                </h1>

                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                    Your nomination has been successfully received. Our team will connect with you
                    after reviewing the profile.
                </p>

                {autoCreated && (
                    <div className="mb-8 p-6 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-left">
                        <h3 className="text-[#d4af37] font-bold flex items-center gap-2 mb-2">
                            <FiMail className="text-xl" /> Account Created!
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            We have automatically created an account for you. Your login credentials have been sent to your email address. You can use these to track your nomination status.
                        </p>
                    </div>
                )}

                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                    <h2 className="text-[#d4af37] font-semibold mb-4 text-xl flex items-center justify-center gap-2">
                        <FiPhoneCall /> Any Queries? Feel free to contact us
                    </h2>

                    <div className="space-y-4 text-left inline-block">
                        <div className="flex items-center gap-3">
                            <span className="text-[#d4af37]">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9810 88 2769</p>
                                <p className="text-xs text-gray-400">Nominations</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[#d4af37]">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9971 00 2984</p>
                                <p className="text-xs text-gray-400">Sponsorship</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[#d4af37]">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9810 91 0686</p>
                                <p className="text-xs text-gray-400">Helpline</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    to="/"
                    className="group relative inline-flex items-center justify-center px-12 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:scale-95"
                >
                    <span className="relative z-10">Back to Home</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
                </Link>
            </div>
        </div>
    );
}
