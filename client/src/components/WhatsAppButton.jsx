import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
    const location = useLocation();
    const [customMessage, setCustomMessage] = useState(null);

    useEffect(() => {
        const handleUpdate = (e) => {
            setCustomMessage(e.detail);
        };
        window.addEventListener("updateWhatsAppMessage", handleUpdate);
        return () => window.removeEventListener("updateWhatsAppMessage", handleUpdate);
    }, []);
    
    const getDynamicMessage = () => {
        if (customMessage) return customMessage;

        const hostname = window.location.hostname;
        const path = location.pathname;

        // 1. Check Subdomain (e.g., healthcare.globaliconawards.in)
        const parts = hostname.split('.');
        if (parts.length > 2) {
            const subdomain = parts[0];
            // Ignore www and common local development hosts
            if (subdomain !== 'www' && subdomain !== 'localhost' && !subdomain.includes('127-0-0-1')) {
                const displayName = subdomain
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                return `Hello, I'm interested in the ${displayName}.`;
            }
        }

        // 2. Check Path (Upcoming Awards or Editions)
        if (path.includes("/upcoming-awards/") || path.includes("/editions/")) {
            const slug = path.split("/").filter(Boolean).pop();
            const displayName = slug
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            return `Hello, I'm interested in the ${displayName}.`;
        }
        return "Hello, I'm interested in the Global Icon Awards.";
    };

    const whatsappNumber = "+91 9810 91 0686";
    const encodedMessage = encodeURIComponent(getDynamicMessage());
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
        >
            {/* Pulse Rings */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="absolute inline-flex h-14 w-14 rounded-full bg-green-500 opacity-40 animate-pulse"></span>

            {/* Button Body */}
            <div className="relative bg-[#25D366] text-white p-3 rounded-full shadow-[0_10px_25px_-5px_#25d366aa] hover:shadow-[0_15px_35px_-5px_#25d366cc] transform hover:scale-110 transition-all duration-300 border-2 border-white/20">
                <FaWhatsapp className="w-8 h-8" />
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1.5 bg-white text-[#25D366] text-sm font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border-b-4 border-[#25D366]">
                Contact Us
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
        </a>
    );
}
