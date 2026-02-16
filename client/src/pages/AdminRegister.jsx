import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminRegister() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSubmitting(true);
            // Pass secretCode to register function
            await register(name, email, password, secretCode);

            // Redirect to /admin after successful registration
            navigate("/admin", { replace: true });
        } catch (err) {
            setError(err.message || "Unable to create admin account");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen w-full bg-gradient-to-br from-[#161e34] via-[#232953] to-[#111827] flex items-center justify-center px-3 py-28 sm:px-6 md:px-10 lg:px-0">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_-10px_#3b82f6c5] border border-blue-400/20 rounded-2xl px-5 py-8 md:py-10 flex flex-col items-center sm:px-7">

                <h1 className="mt-4 text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-[#c7e8ff] via-[#2196f3] to-[#0277bd] bg-clip-text text-transparent drop-shadow-md tracking-tight">
                    New Admin Registration
                </h1>
                <p className="mb-6 text-center text-base md:text-lg text-white/70">
                    Create a new proper admin account.
                </p>

                {error && (
                    <div className="mb-3 w-full rounded-xl bg-red-500/10 border border-red-400/40 px-3 py-2 text-center text-sm text-red-100 shadow-sm">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-4 flex flex-col"
                    autoComplete="off"
                >
                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1 ml-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-100 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Admin Name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1 ml-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-100 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1 ml-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-100 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Min 6 chars"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1 ml-2">
                            Secret Code
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl bg-white/10 border border-blue-400/40 px-3 py-2 text-blue-100 text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-blue-400/50"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            required
                            placeholder="Secret Code"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-4 w-full rounded-full bg-gradient-to-r from-blue-100 via-blue-500 to-blue-400 text-blue-900 transition-all duration-200 px-4 py-2 text-base font-bold shadow-lg hover:from-blue-400 hover:to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 tracking-wider"
                    >
                        {submitting ? "Creating..." : "Create Admin Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-blue-200/70">
                    Already an admin?{" "}
                    <Link
                        to="/admin/login"
                        className="text-blue-300 hover:text-blue-100 font-semibold underline decoration-blue-400/30"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </section>
    );
}
