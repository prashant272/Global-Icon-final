import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Home Section Components
import Hero from "../components/home/Hero.jsx";
import OverviewDates from "../components/home/OverviewDates.jsx";
import WhyEnter from "../components/home/WhyEnter.jsx";
import ResearchMethodology from "../components/home/ResearchMethodology.jsx";
import Guests from "../components/home/Guests.jsx";
import MediaPartners from "../components/home/MediaPartners.jsx";
import SelectionProcess from "../components/home/SelectionProcess.jsx";
import FAQs from "../components/home/FAQs.jsx";
import UpcomingAwards from "../components/home/UpcomingAwards.jsx";
import CTASection from "../components/home/CTASection.jsx";
import Categories from "../components/home/Categories.jsx";
import PreviousAwardees from "../components/home/PreviousAwardees.jsx";
import PrestigiousAward from "../components/home/PrestigiousAward.jsx";
import ReelsSection from "../components/home/ReelsSection.jsx";
import { fetchUpcomingAwards } from "../services/api";
import { getAwardName } from "../utils/brand.js";

// Centralized brand background
const PRIMARY_BG = "bg-[#0a0503]";
const SECTION_BG = "bg-[#070403]";
const HIGHLIGHT_BG = "bg-gradient-to-br from-[#0f0805] via-[#050302] to-[#110906]";

export default function Home() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const sectionRefs = useRef([]);
  const [dynamicUpcomingAwards, setDynamicUpcomingAwards] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  useEffect(() => {
    fetchUpcomingAwards()
      .then((data) => {
        // Map backend awards to match the static prop structure
        const mapped = data.map((award) => ({
          ...award,
          banner: award.cardImage || (award.banners && award.banners.length > 0 ? award.banners[0] : "/images/hero-default.jpg")
        }));
        setDynamicUpcomingAwards(mapped);
      })
      .catch((err) => console.error("Error fetching upcoming awards:", err));
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "!z-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleNominateClick = (awardName) => {
    if (typeof awardName === "string") {
      navigate(`/nominate?award=${encodeURIComponent(awardName)}`);
    } else {
      navigate("/nominate");
    }
  };

  // Event Data
  const events = [
    {
      title: "Business and Leadership Summit 2026– USA Edition",
      desc: "A premier summit recognising visionary business leaders and entrepreneurs.",
      date: "30 June 2026",
      place: "USA",
      time: "TBA",
      link: "https://business-leadership.primetimemedia.in//upcoming-awards/usa-business-leadership-summit/"
    },
    // {
    //   title: "Business and Leadership Summit 2026– Dubai Edition",
    //   desc: "Recognising excellence and innovation in global leadership.",
    //   date: "Announcement coming soon (rescheduled due to ongoing international situation)",
    //   place: "Dubai",
    //   time: "TBA",
    // },
    {
      title: "Invest India Summit 2026 – UK Edition",
      desc: "Fostering investment and celebrating leadership across industries.",
      date: "7 May 2026",
      place: "UK",
      time: "TBA",
      link: "https://investment-india.primetimemedia.in/upcoming-awards/invest-india-summit-2026---uk-edition/"
    },
    // {
    //   title: "Global Icon Awards – New Delhi Edition 2026",
    //   desc: "Recognising excellence and innovation in global leadership.",
    //   date: "26 April 2026",
    //   place: "New Delhi",
    //   time: "TBA",
    // },
    {
      title: "India Excellence Awards & Conference 2026",
      desc: "Recognising excellence, innovation, and outstanding achievements in business, leadership, and professional sectors.",
      date: "22 May 2026",
      place: "Hyderabad",
      time: "TBA",
      link: "https://business-leadership.primetimemedia.in/upcoming-awards/india-excellence-awards-2026/"
    },
  ];

  // Guest Data
  const guests = [
    { name: "Shri Virender Sehwag", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Shri Sunil Gavaskar", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Shri Ashwini Kumar Choubey", designation: "Guest of Honour & Former Union Minister" },
    { name: "Dr. Yoganand Shashtri", designation: "Former Reader, Shaheed Bhagat Singh College, Delhi" },
    { name: "Shri G. V. L. Narsimha Rao", designation: "National Spokesperson, BJP" },
    { name: "Mr. Brad Hogg", designation: "Former Australian Cricketer" },
    { name: "Dr. Najma A. Heptulla", designation: "Former Governor, Manipur" },
    { name: "Shri Anand Kumar", designation: "Founder & Director, Super 30" },
    { name: "Rita Bahuguna Joshi", designation: "Former Union Minister" },
    { name: "Shri Shyam Jaju", designation: "Ex National Vice President (BJP)" },
    { name: "Ms. Lara Dutta", designation: "Indian Actress & Model" },
    { name: "Shri Anil K. Shastri", designation: "Son of Lal Bahadur Shastri; Former Ministry of Finance, Govt. of India." },
    { name: "Shri Sandeep Patil", designation: "Former Indian Cricketer & Chief of the BCCI Selection Committee" },
    { name: "Brett Lee", designation: "Australian Cricketer" },
     { name: "Shri Amar Singh", designation: "Hon’ble Member of Parliament" },
    { name: "Ms. Arti Mehra", designation: "CEO, NABH; Former Mayor, Municipal Corporation of Delhi" },
  ];

  // Previous Media Partners
  const mediaPartners = [
    { name: "India Today", tagline: "India's Leading News & Media Network", logo: "../india-today.png" },
    { name: "CNN ", tagline: "Global & National News Network", logo: "../cnn.jpg" },
    { name: "News18 India", tagline: "Trusted Hindi News Network", logo: "../news.png" },
    { name: "Bharat 24", tagline: "Hindi News & Current Affairs Channel", logo: "../bharat.jpg" },
    { name: "Doordarshan's", tagline: "India's Public Service News Channel", logo: "../ddd.png" },
    { name: "News 1 India", tagline: "National Hindi News Channel", logo: "../new1.png" },
    { name: "News 10 India", tagline: "National News & Current Affairs Network", logo: "../news10.jpg" },
    { name: "Delhi Aaj Tak", tagline: "Regional Hindi News Network", logo: "../delhiaajtk.jpg" },
    { name: "Prime Time", tagline: "National News & Media Network", logo: "../prime.png" },
    { logo: "../The-SME-Times.png" },
    { name: "Xoom Studio", tagline: "Media Production & Event Coverage Partner", logo: "../xoom.jpg" },
    { logo: "../remont.jpg" },
  ];



  const nomineeCategories = [
    { title: "Healthcare & Lifesciences", desc: "Honouring excellence in medical care, pharmaceuticals, biotechnology, and healthcare innovation.", icon: "🏥", color: "from-[#ffecd2] to-[#fcb69f]" },
    { title: "Education & Learning", desc: "Recognising academic excellence, innovative teaching, and leadership in educational institutions globally.", icon: "🎓", color: "from-[#ffeec3] to-[#d4af37]" },
    { title: "Real Estate & Infrastructure", desc: "Celebrating landmark developments, architectural brilliance, and infrastructure transformation.", icon: "🏗️", color: "from-[#ffd966] to-[#b6932f]" },
    { title: "Hospitality & Tourism", desc: "Celebrating excellence in hotels, resorts, travel agencies, and global tourism platforms.", icon: "🏨", color: "from-[#fff5d2] to-[#a28533]" },
    { title: "Manufacturing & Industrial", desc: "Honouring manufacturing giants and MSMEs for operational excellence and industrial growth.", icon: "🏭", color: "from-[#ffeec3] to-[#d4af37]" },
    { title: "Beauty & Wellness", desc: "Recognising top brands in cosmetics, salon chains, fitness centers, and holistic well-being.", icon: "✨", color: "from-[#ffecd2] to-[#fcb69f]" },
    { title: "Technology & Digital Transformation", desc: "Celebrating AI, Cloud, Cybersecurity, FinTech, and innovative tech startups driving global change.", icon: "💻", color: "from-[#ffeec3] to-[#d4af37]" },
    { title: "Finance & Banking", desc: "Honouring leadership in banking, investment, insurance, and the rapidly growing FinTech sector.", icon: "💰", color: "from-[#ffd966] to-[#b6932f]" },
    { title: "Sustainability & Environment", desc: "Recognising corporate CSR, renewable energy initiatives, and commitment to environmental conservation.", icon: "🌱", color: "from-[#fff5d2] to-[#a28533]" },
    { title: "Public & Government Sector", desc: "Honouring excellence in public administration, e-governance, and smart city initiatives.", icon: "🏛️", color: "from-[#ffeec3] to-[#d4af37]" },
    { title: "Media, Culture & Sports", desc: "Celebrating outstanding achievements in journalism, cinema, arts, advertising, and sports.", icon: "🎬", color: "from-[#ffecd2] to-[#fcb69f]" },
  ];

  const homeFaqs = [
    {
      q: `What is ${getAwardName()} 2026?`,
      a: `${getAwardName()} 2026 is an international recognition platform that honours excellence, innovation, and quality across 11 key sectors including Healthcare, Education, Real Estate, Technology, Finance, and more.`,
    },
    {
      q: "Who can apply for nomination?",
      a: "Healthcare institutions, educators, real estate developers, tech innovators, finance professionals, and visionaries from across all 11 award sectors are invited to nominate themselves.",
    },
    {
      q: "What is the nomination process and deadline?",
      a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and documents. The current extended deadline mentioned on this page is 15 April 2026; for any change, updated dates will always be shown on the website.",
    },
    {
      q: "How are the winners selected?",
      a: "Winners are selected through a structured evaluation process that includes research-based assessment, academic quality, innovation, student impact, and ethical practices, as explained in the Research Methodology and Selection Process sections.",
    },
    {
      q: "What are the benefits of participating?",
      a: "Participants receive global recognition and credibility, enhanced brand visibility and media exposure, greater trust among students and partners, networking with education leaders, and marketing assets such as certificates and winner logos.",
    },
    {
      q: "Is self-nomination allowed?",
      a: "Yes, eligible organisations and individuals can nominate themselves directly for relevant categories.",
    },
  ];

  const getGridCols = (len) => {
    if (len >= 4) return "grid-cols-1 sm:grid-cols-2";
    if (len === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (len === 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1";
  };

  return (
    <div className={`w-full text-[#f5f3f0] ${PRIMARY_BG}`}>
      {/* SEO H1 - Hidden */}
      <h1 className="sr-only">
        {getAwardName()} by Prime Time Research Media Pvt. Ltd.
      </h1>

      <Hero
        videoRef={videoRef}
        events={events}
        handleNominateClick={handleNominateClick}
      />

      <PreviousAwardees />

      <OverviewDates
        handleNominateClick={handleNominateClick}
        SECTION_BG={SECTION_BG}
      />

      <WhyEnter
        sectionRefs={sectionRefs}
        getGridCols={getGridCols}
        HIGHLIGHT_BG={HIGHLIGHT_BG}
      />

      <PrestigiousAward SECTION_BG={SECTION_BG} />

      <ReelsSection SECTION_BG={SECTION_BG} />

      <ResearchMethodology
        SECTION_BG={SECTION_BG}
      />

      <Guests
        guests={guests}
        sectionRefs={sectionRefs}
        HIGHLIGHT_BG={HIGHLIGHT_BG}
      />

      <MediaPartners
        mediaPartners={mediaPartners}
        SECTION_BG={SECTION_BG}
      />

      <SelectionProcess
        SECTION_BG={SECTION_BG}
      />

      <FAQs
        homeFaqs={homeFaqs}
        HIGHLIGHT_BG={HIGHLIGHT_BG}
      />

      <UpcomingAwards
        upcomingAwards={dynamicUpcomingAwards}
        HIGHLIGHT_BG={HIGHLIGHT_BG}
      />

      <CTASection
        handleNominateClick={handleNominateClick}
        sectionRefs={sectionRefs}
        PRIMARY_BG={PRIMARY_BG}
      />

      <Categories
        nomineeCategories={nomineeCategories}
        HIGHLIGHT_BG={HIGHLIGHT_BG}
      />
    </div>
  );
}
