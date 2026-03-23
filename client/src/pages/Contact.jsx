import { useEffect } from "react";
import { getAwardName } from "../utils/brand";
import { Mail, Phone, Globe, MapPin, Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/primetimeresearch", color: "from-blue-600 to-blue-500", bgColor: "bg-blue-600" },
  { icon: Instagram, href: "https://www.instagram.com/primetimeresearchmedia/", color: "from-pink-600 to-purple-600", bgColor: "bg-gradient-to-br from-pink-600 to-purple-600" },
  { icon: Youtube, href: "https://www.youtube.com/@primetimermedia", color: "from-red-600 to-red-500", bgColor: "bg-red-600" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/primetimeresearch-media/", color: "from-blue-700 to-blue-600", bgColor: "bg-blue-700" },
  { icon: MessageCircle, href: "https://wa.me/919810882769", color: "from-green-600 to-green-500", bgColor: "bg-green-600" },
];

export default function Contact() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("updateSEO", {
      detail: {
        title: "Contact & Support",
        description: `Get in touch with the team at ${getAwardName()} for nominations, partnerships, and sponsorships. We are here to help you achieve excellence.`,
        keywords: ["Contact Us", "Sponsorship Inquiries", "Nomination Help", "Prime Time Research Media"],
      }
    }));
  }, []);

  const phones = [
    {
      tel: "+911169268754",
      label: "Board Lines",
      display: "+91 11 69268754"
    },
    {
      tel: "+911135773024",
      label: "Board Lines",
      display: "+91-11-35773024"
    },
    {
      tel: "+919810910686",
      label: "Helpline",
      display: "+91 9810 91 0686"
    },
    {
      tel: "+919971002984",
      label: "For Sponsorship",
      display: "+91 9971 00 2984"
    },
    {
      tel: "+919810882769",
      label: "For Nominations",
      display: "+91 9810 88 2769"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden py-12 md:py-20 bg-[#0a0503] text-white selection:bg-[#ffeec350]">
      {/* Decorative mesh gradients */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] sm:bg-[size:56px_56px]" />
      </div>

      <div className="relative z-10 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto px-2 xs:px-3 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Responsive card container */}
        <div className="mx-auto w-full max-w-full sm:max-w-3xl md:max-w-4xl p-4 xs:p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-[#ffd966]/20 bg-white/[0.04] shadow-xl backdrop-blur-2xl flex flex-col gap-6 sm:gap-8 md:gap-10 relative overflow-hidden">
          {/* Title and subtitle */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-6 w-1 rounded-xl bg-gradient-to-b from-[#d4af37] to-[#c62828] sm:h-7" />
              <h1 className="text-2xl xs:text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent drop-shadow">
                Contact Us
              </h1>
              <span className="h-6 w-1 rounded-xl bg-gradient-to-b from-[#d4af37] to-[#c62828] sm:h-7" />
            </div>
            <p className="max-w-full xs:max-w-lg md:max-w-xl text-[#ffeec3]/80 text-sm xs:text-base sm:text-lg mt-2 sm:mt-3 leading-relaxed font-medium">
              We’d love to connect with you! Reach out for inquiries about nominations, partnerships, media, or anything else.
            </p>
          </div>

          {/* Gold gradient line below header title */}
          <div className="h-1 mt-4 sm:mt-6 mb-0 bg-gradient-to-r from-[#d4af37] via-[#ffd966] to-[#c62828]" />

          {/* Contact Info Grid */}
          <div className="w-full grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
            <div className="space-y-4 xs:space-y-5">
              <a
                href="mailto:info@globaliconawards.in"
                className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-[#ffd966]/15 bg-[#251114]/80 hover:shadow-lg hover:bg-[#3b191a] transition-all duration-300 group"
              >
                <div className="rounded-lg bg-gradient-to-br from-[#d4af37] via-[#ffd966] to-[#b2994c] p-2 shadow group-hover:scale-110 transition">
                  <Mail className="w-6 h-6 text-[#4b1e1e]" />
                </div>
                <div>
                  <div className="text-xs text-[#ffeec3]/70 font-semibold">Email</div>
                  <div className="font-bold text-[#ffeec3] tracking-wide text-[1.02rem] xs:text-[1.08rem]">info@globaliconawards.in</div>
                </div>
              </a>

              {/* Phone Numbers */}
              <div className="flex flex-col gap-2 xs:gap-3">
                {/* All numbers rendered responsively */}
                {phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.tel}`}
                    className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-[#ffd966]/15 bg-[#251114]/80 hover:shadow-lg hover:bg-[#3b191a] transition-all duration-300 group"
                  >
                    <div className="rounded-lg bg-gradient-to-br from-[#ffd966] to-[#d4af37] p-2 shadow group-hover:scale-110 transition">
                      <Phone className="w-6 h-6 text-[#c62828]" />
                    </div>
                    <div>
                      {/* If 2 board lines in a row, only show label for first for small screens, but show with sr-only for a11y */}
                      <div className={`text-xs text-[#ffeec3]/70 font-semibold${(phone.label === "Board Lines" && idx === 1) ? " sr-only" : ""}`}>{phone.label}</div>
                      <div className="font-bold text-[#ffeec3] tracking-wide text-[1.02rem] xs:text-[1.08rem]">
                        {phone.display}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="https://maps.app.goo.gl/A9eWn25eF8uXr3pF9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-[#ffd966]/15 bg-[#251114]/80 hover:shadow-lg hover:bg-[#3b191a] transition-all duration-300 group"
              >
                <div className="rounded-lg bg-gradient-to-br from-[#d4af37]/90 to-[#c62828]/90 p-2 shadow group-hover:scale-110 transition">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#ffeec3]/70 font-semibold">Location</div>
                  <div className="font-bold text-[#ffeec3] tracking-wide text-[1.02rem] xs:text-[1.08rem]">Delhi, India</div>
                </div>
              </a>
              <a
                href="https://www.globaliconawards.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-[#ffd966]/15 bg-[#251114]/80 hover:shadow-lg hover:bg-[#3b191a] transition-all duration-300 group"
              >
                <div className="rounded-lg bg-gradient-to-br from-[#c62828] to-[#ffd966] p-2 shadow group-hover:scale-110 transition">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#ffeec3]/70 font-semibold">Website</div>
                  <div className="font-bold text-[#ffeec3] tracking-wide text-[1.02rem] xs:text-[1.08rem]">www.globaliconawards.in</div>
                </div>
              </a>
            </div>
            {/* Social & Info */}
            <div className="flex flex-col h-full items-center justify-center gap-6 sm:gap-7 mt-6 md:mt-0">
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2b1517]/80 via-[#d4af37]/10 to-[#2b1517]/90 border border-[#ffd966]/15 shadow-lg p-4 sm:p-6 w-full text-center group transition">
                <h3 className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-[#ffecd1] via-[#ffd966] to-[#d4af37] bg-clip-text text-transparent mb-1">Follow Us</h3>
                <p className="text-[#ffeec3]/80 text-xs sm:text-sm mb-2 sm:mb-3 font-medium">
                  Stay updated with the latest news, photos and announcements.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-2">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 group ${social.bgColor}`}
                        aria-label="Social media link"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="hidden sm:block mt-2 sm:mt-4">
                <div className="w-40 sm:w-48 h-1 rounded-full bg-gradient-to-r from-[#ffeec3]/40 via-[#d4af37]/40 to-[#ffd966]/40 mx-auto" />
              </div>
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#ffeec3]/60 text-center">
                <span className="font-bold text-[#fffbe7]">Office Hours:</span> 10:00 AM – 6:00 PM (Mon - Fri) <br />
                <span className="font-bold text-[#ffd966]">Response time:</span> Within 1 business day
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="relative z-10 h-1 bg-gradient-to-r from-[#c62828] via-[#ffd966] to-[#d4af37]" />
    </section>
  );
}
