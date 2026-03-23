import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAwardName } from "../utils/brand";

/**
 * DynamicSEO component to update document title and meta tags based on the current domain and route.
 */
const DynamicSEO = () => {
  const location = useLocation();
  const awardName = getAwardName();

  useEffect(() => {
    // 1. Determine the path-specific title
    let pageTitle = "";
    const path = location.pathname;

    if (path === "/") {
      pageTitle = "Home";
    } else if (path.startsWith("/categories")) {
      pageTitle = "Award Categories";
    } else if (path.startsWith("/nominate")) {
      pageTitle = "Nomination Form";
    } else if (path.startsWith("/jury")) {
      pageTitle = "Jury Members";
    } else if (path.startsWith("/guidelines")) {
      pageTitle = "Entry Guidelines";
    } else if (path.startsWith("/judging")) {
      pageTitle = "Judging Process";
    } else if (path.startsWith("/contact")) {
      pageTitle = "Contact Us";
    } else if (path.startsWith("/media")) {
      pageTitle = "Media & Gallery";
    } else if (path.startsWith("/faq")) {
      pageTitle = "Frequently Asked Questions";
    } else if (path.startsWith("/editions")) {
      pageTitle = "Previous Edition";
    } else if (path.startsWith("/upcoming-awards")) {
      pageTitle = "Award Details";
    } else if (path.startsWith("/login")) {
      pageTitle = "Login";
    } else if (path.startsWith("/register")) {
      pageTitle = "Register";
    } else if (path.startsWith("/dashboard")) {
      pageTitle = "User Dashboard";
    } else if (path.startsWith("/success")) {
      pageTitle = "Success";
    } else {
      pageTitle = "Celebrating Excellence";
    }

    // 2. Set the document title
    const fullTitle = `${pageTitle} | ${awardName} - Prime Time Research Media`;
    document.title = fullTitle;

    // 3. Construct Exhaustive Keywords (Better for SEO/Ranking)
    const baseKeywords = [
      awardName,
      awardName.toLowerCase(),
      "Prime Time Research Media",
      "Excellence Awards 2026",
      "Leadership Awards",
      "Business Awards India",
      "Educational Excellence Awards",
      "Healthcare Excellence Awards",
      "Top Real Estate Awards",
      "Global Business Summit",
      "Indian Icon Awards",
      "International Achievement Awards",
      "Corporate Leadership Excellence",
      "Best Schools Awards",
      "Top Hospital Awards",
      "Entrepreneurship Awards",
      window.location.hostname,
      window.location.hostname.replace("www.", ""),
      "Prime Time Awards",
      "Nominate Now for Awards",
      // Location Based
      "Awards in Delhi",
      "Awards in Mumbai",
      "Awards in Dubai",
      "Awards in London",
      "Awards in Washington DC",
      "International Business Awards",
      "Global Leadership Summit",
      // Specific requests
      "Invest India Summit 2026",
      "USA Business and Leadership Summit",
      "UK Business Awards",
      "India Excellence Awards",
      "Global Education Excellence Awards",
      "Global Icon Excellence Awards"
    ];

    // Add domain-specific keywords
    if (awardName.includes("Education")) {
      baseKeywords.push("Best College Awards", "Education Summit 2026", "Academic Excellence", "Teaching Awards", "Top University Awards India", "Education Innovation Awards");
    } else if (awardName.includes("Icon")) {
      baseKeywords.push("Global Icon Awards", "Indian Icon Awards", "Celebrity Awards", "Lifestyle Awards", "Fashion Awards", "Entertainment Excellence");
    } else if (awardName.includes("Invest") || awardName.includes("Business") || awardName.includes("Leadership")) {
      baseKeywords.push("Investment Summit", "Business Leadership", "Startup Awards", "MSME Awards", "Corporate Strategy Awards", "B2B Awards India");
    } else if (awardName.includes("India Excellence")) {
      baseKeywords.push("India Excellence Awards 2026", "National Business Awards", "Indian Leadership Awards");
    }

    // 4. Update meta tags
    updateMetaTag("description", `Join ${awardName} by Prime Time Research Media. Celebrating absolute excellence in Healthcare, Education, Business, Real Estate, and more. ${pageTitle} for the 2026 edition.`);
    updateMetaTag("keywords", baseKeywords.join(", "));
    
    // Open Graph & Twitter
    updateMetaProperty("og:title", fullTitle);
    updateMetaProperty("og:description", `Nominate now for ${awardName}. Recognizing global leaders and elite organizations.`);
    updateMetaProperty("og:url", window.location.href);
    updateMetaProperty("og:site_name", awardName);

    // 5. Inject JSON-LD Schema
    updateJSONLD({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": awardName,
      "alternateName": [awardName, "Prime Time Research Media Awards"],
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "description": `Recognizing excellence and innovation through the prestigious ${awardName} by Prime Time Research Media.`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9810882769",
        "contactType": "Nominations"
      },
      "sameAs": [
        "https://www.facebook.com/PrimeTimeResearchMedia",
        "https://www.linkedin.com/company/prime-time-research-media-pvt-ltd"
      ]
    });

  }, [location, awardName]);

  return null; // This component doesn't render anything
};

/**
 * Helper to update/inject JSON-LD script
 */
function updateJSONLD(data) {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Helper to update a meta tag by name
 */
function updateMetaTag(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * Helper to update a meta tag by property (for Open Graph)
 */
function updateMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default DynamicSEO;
