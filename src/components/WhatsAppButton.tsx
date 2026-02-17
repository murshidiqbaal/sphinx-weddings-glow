import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Hide on admin routes
    const isAdminRoute = location.pathname.startsWith("/admin");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isAdminRoute) return null;

    return (
        <a
            href="https://wa.me/919072140083"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 right-8 z-[9999] transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
            aria-label="Chat on WhatsApp"
        >
            <div className="group relative">
                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-forest/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                    <span className="text-forest text-xs font-medium tracking-wide">Plan your dream wedding with us</span>
                </div>

                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full bg-sage/30 animate-ping duration-[3000ms]" />

                {/* Main Button */}
                <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-forest text-white shadow-[0_10px_30px_rgba(45,61,42,0.3)] border border-white/10 overflow-hidden transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />

                    <MessageCircle className="w-6 h-6 md:w-8 md:h-8 relative z-10 transition-transform duration-500 group-hover:rotate-12" />
                </div>
            </div>
        </a>
    );
};

export default WhatsAppButton;
