/**
 * Utility to get dynamic award name and metadata based on the hostname.
 * This is the server-side version of the brand utility.
 */
export const getAwardDetails = (hostname) => {
  let awardName = "Global Icon Awards";
  const parts = hostname ? hostname.split(".") : [];

  // 1. Domain Detection Logic
  if (parts.length >= 3) {
    const subdomain = parts[0].toLowerCase();
    
    if (subdomain !== "www" && subdomain !== "localhost" && !subdomain.includes("127-0-0-1")) {
      // Handle special mappings
      if (subdomain === "invest-india" || subdomain === "investment-india") {
        awardName = "Invest India Summit";
      } else if (subdomain === "india-excellence") {
        awardName = "India Excellence Awards";
      } else if (subdomain === "business-leadership") {
        awardName = "Business & Leadership Summit";
      } else if (subdomain === "global-education" || subdomain === "education") {
        awardName = "Global Education Excellence Awards";
      } else {
        // Generic parsing
        const displayName = subdomain
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        if (subdomain.includes("excellence") || subdomain.includes("awards") || subdomain.includes("icon")) {
          awardName = displayName + " Awards";
        } else {
          awardName = displayName + " Summit";
        }
      }
    }
  }

  // 2. Fallbacks/Hardcoded Domains
  if (hostname) {
    if (hostname.includes("globaleducationawards.in")) awardName = "Global Education Excellence Awards";
    else if (hostname.includes("indiaexcellenceawards.in")) awardName = "India Excellence Awards";
    else if (hostname.includes("business-leadership.primetimemedia.in")) awardName = "Business & Leadership Summit";
  }

  // 3. Exhaustive Keywords
  const baseKeywords = [
    awardName,
    "Prime Time Research Media",
    "Excellence Awards 2026",
    "Leadership Awards",
    "Business Awards India",
    "Global Business Summit",
    "Indian Icon Awards",
    "International Achievement Awards",
    "Corporate Leadership Excellence",
    "Invest India Summit 2026",
    "USA Business Awards",
    "UK Awards",
    "Dubai Excellence Awards",
    "Delhi Business Awards",
    "Mumbai Excellence summit",
    "Washington DC Leadership Summit",
    "London Business Summit"
  ];

  // 4. Verification IDs (Placeholder - You can add yours here)
  const verificationIds = {
    "india-excellence.primetimemedia.in": "",
    "invest-india.primetimemedia.in": "",
    "global-icon.primetimemedia.in": "",
    "www.globaliconawards.in": ""
  };

  const verificationTag = verificationIds[hostname] 
    ? `<meta name="google-site-verification" content="${verificationIds[hostname]}" />`
    : "";

  return {
    awardName,
    title: `${awardName} | Official Website | 2026`,
    description: `🏆 Official Website: Nominate now for ${awardName} 2026. Join the most prestigious platform recognizing global leaders and elite organizations in Education, Healthcare, and Business. Register for upcoming summits in Delhi, Mumbai, Dubai, UK, and USA.`,
    keywords: baseKeywords.join(", "),
    url: hostname ? `https://${hostname}` : "https://www.globaliconawards.in",
    canonical: hostname ? `https://${hostname}/` : "https://www.globaliconawards.in/",
    verificationTag
  };
};

/**
 * Replaces SEO tags in index.html content
 */
export const injectSEO = (html, details) => {
  let modifiedHtml = html;

  // Replace Title tags and placeholders
  modifiedHtml = modifiedHtml.replace(/<!--\s*SEO_TITLE\s*-->/g, details.title);
  modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/i, `<title>${details.title}</title>`);

  // Replace Description tags and placeholders
  modifiedHtml = modifiedHtml.replace(/<!--\s*SEO_DESCRIPTION\s*-->/g, details.description);
  
  // Replace Keywords tags and placeholders
  modifiedHtml = modifiedHtml.replace(/<!--\s*SEO_KEYWORDS\s*-->/g, details.keywords);

  // Replace URL tags and placeholders
  modifiedHtml = modifiedHtml.replace(/<!--\s*SEO_URL\s*-->/g, details.url);

  // Replace Google Verification placeholder
  modifiedHtml = modifiedHtml.replace(/<!--\s*GOOGLE_VERIFICATION\s*-->/g, details.verificationTag || "");

  // Fallback regex replacements for existing meta tags (in case placeholders aren't used or found)
  if (!modifiedHtml.includes(details.title)) {
    modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${details.title}" />`);
  }
  
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${details.description}" />`);
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${details.keywords}" />`);
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${details.description}" />`);
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${details.url}" />`);
  modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${details.canonical}" />`);

  return modifiedHtml;
};
