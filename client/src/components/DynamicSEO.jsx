import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAwardName } from "../utils/brand";

/**
 * DynamicSEO component to update document title and meta tags based on the current domain and route.
 */
const DynamicSEO = () => {
  const location = useLocation();
  const awardName = getAwardName();

  const [customSEO, setCustomSEO] = useState(null);

  useEffect(() => {
    const handleSEOUpdate = (e) => {
      setCustomSEO(e.detail);
    };
    window.addEventListener("updateSEO", handleSEOUpdate);
    return () => {
      window.removeEventListener("updateSEO", handleSEOUpdate);
      setCustomSEO(null); // Reset on unmount/route change
    };
  }, [location.pathname]);

  useEffect(() => {
    let pageTitle = "";
    let pageDesc = "";
    let pageKeywords = [];
    const path = location.pathname;

    // 1. Determine the path-specific title and description
    if (customSEO) {
      pageTitle = customSEO.title || "";
      pageDesc = customSEO.description || "";
      pageKeywords = customSEO.keywords || [];
    } else {
      if (path === "/") {
        pageTitle = "Home";
        pageDesc = `🏆 Official Website: Nominate now for ${awardName} 2026. Join India's most prestigious platform recognizing global leaders and elite organizations in Education, Healthcare, and Business.`;
      } else if (path.startsWith("/categories")) {
        pageTitle = "Award Categories";
        pageDesc = `Explore 50+ prestigious award categories for ${awardName}. From Educational Excellence and Healthcare Innovation to Corporate Leadership and Entrepreneurship.`;
      } else if (path.startsWith("/nominate")) {
        pageTitle = "Nominate Now";
        pageDesc = `Apply for the ${awardName} 2026. Submit your nomination today to secure your place among the industry legends and visionaries.`;
      } else if (path.startsWith("/jury")) {
        pageTitle = "Board of Experts & Jury";
        pageDesc = `Meet the eminent board of experts and distinguished jury members presiding over the selection for ${awardName}.`;
      } else if (path.startsWith("/guidelines")) {
        pageTitle = "Official Guidelines";
        pageDesc = `Detailed eligibility criteria and entry guidelines for the ${awardName}. Ensure your nomination meets the highest standards of excellence.`;
      } else if (path.startsWith("/judging")) {
        pageTitle = "Strict Selection Process";
        pageDesc = `Discover our rigorous 4-step evaluation architecture: Nomination, Audit, Review, and Jury Finalization. Pure transparency in every award.`;
      } else if (path.startsWith("/contact")) {
        pageTitle = "Contact & Sponsorship";
        pageDesc = `Connect with the Prime Time Research Media team for institutional nominations, corporate sponsorships, and partnership opportunities.`;
      } else if (path.startsWith("/media")) {
        pageTitle = "Hall of Fame & Gallery";
        pageDesc = `Watch highlights, news coverage, and victory moments from the ${awardName} ceremonies and global summits.`;
      } else if (path.startsWith("/faq")) {
        pageTitle = "FAQs & Support";
        pageDesc = `Get instant answers to questions about the nomination process, selection timelines, and category eligibility for ${awardName}.`;
      } else if (path.startsWith("/editions")) {
        pageTitle = "Previous Edition";
        pageDesc = `Archive of previous editions of ${awardName}. Celebrating past winners and institutional excellence.`;
      } else if (path.startsWith("/upcoming-awards")) {
        pageTitle = "Upcoming Awards";
        pageDesc = `Details of upcoming summits and ceremonies for ${awardName}. Stay updated with the latest event schedule.`;
      } else {
        pageTitle = "Excellence Awards";
        pageDesc = `Celebrating absolute excellence with ${awardName} – India's most prestigious recognition platform.`;
      }
    }

    // 2. Set the document title
    const fullTitle = pageTitle 
      ? `${pageTitle} | ${awardName}` 
      : `${awardName} - Prime Time Research Media`;
    document.title = fullTitle;

    // 3. Construct Keywords
    const baseKeywords = [
      awardName,
      "Prime Time Research Media",
      "Excellence Awards 2026",
      "Leadership Awards",
      "Business Awards India",
      "Global Business Summit",
      "Indian Icon Awards",
      ...pageKeywords
    ];

    // 4. Update meta tags
    updateMetaTag("description", pageDesc || `Join ${awardName} by Prime Time Research Media. Celebrating excellence in Healthcare, Education, and Business.`);
    updateMetaTag("keywords", [...new Set(baseKeywords)].join(", "));
    
    // Open Graph & Twitter
    updateMetaProperty("og:title", fullTitle);
    updateMetaProperty("og:description", pageDesc);
    updateMetaProperty("og:url", window.location.href);
    updateMetaProperty("og:site_name", awardName);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", pageDesc);

    // 5. Inject JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": customSEO?.schemaType || "Organization",
      "name": awardName,
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "description": pageDesc,
    };

    if (customSEO?.schemaData) {
      Object.assign(schema, customSEO.schemaData);
    }

    updateJSONLD(schema);

  }, [location, awardName, customSEO]);

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
