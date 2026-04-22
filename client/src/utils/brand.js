/**
 * Utility to get the dynamic award name based on the current hostname/subdomain.
 */
export const getAwardName = () => {
  if (typeof window === 'undefined') return "Global Icon Awards";
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // 1. Domain Detection Logic
  if (parts.length >= 3) {
    const subdomain = parts[0].toLowerCase();
    
    // Ignore www and common local development hosts
    if (subdomain !== 'www' && subdomain !== 'localhost' && !subdomain.includes('127-0-0-1')) {
      // Handle special mappings
      if (subdomain === "invest-india" || subdomain === "investment-india") {
        return "Invest India Summit";
      } else if (subdomain === "india-excellence") {
        return "India Excellence Awards";
      } else if (subdomain === "business-leadership") {
        return "Business & Leadership Summit";
      } else if (subdomain === "global-education" || subdomain === "education") {
        return "Global Education Excellence Awards";
      } else {
        // Generic parsing
        const displayName = subdomain
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        if (subdomain.includes("excellence") || subdomain.includes("awards") || subdomain.includes("icon")) {
          return displayName + " Awards";
        } else {
          return displayName + " Summit";
        }
      }
    }
  }

  // 2. Fallbacks/Hardcoded Domains
  if (hostname.includes("globaleducationawards.in")) return "Global Education Excellence Awards";
  if (hostname.includes("indiaexcellenceawards.in")) return "India Excellence Awards";
  if (hostname.includes("business-leadership.primetimemedia.in")) return "Business & Leadership Summit";
  if (hostname.includes("educationexcellenceawards.com")) return "Education Excellence Awards";
  if (hostname.includes("dentalexcellenceawards.com")) return "Dental Excellence Awards";
  if (hostname.includes("healthcareexcellenceawards.com")) return "Healthcare Excellence Awards";
  
  return "Global Icon Awards";
};
