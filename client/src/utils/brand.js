/**
 * Utility to get the dynamic award name based on the current hostname/subdomain.
 */
export const getAwardName = () => {
  if (typeof window === 'undefined') return "Global Icon Awards";
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // 1. Check Subdomain (e.g., investment_india.primetimemedia.in)
  // If we have at least 3 parts (subdomain.domain.tld)
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Ignore www and common local development hosts
    if (subdomain !== 'www' && subdomain !== 'localhost' && !subdomain.includes('127-0-0-1')) {
      // Break subdomain on hyphens (-) or underscores (_)
      return subdomain
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Awards";
    }
  }

  // 2. Fallbacks for Static Domains
  if (hostname.includes("indiaexcellenceawards.in")) return "India Excellence Awards";
  if (hostname.includes("educationexcellenceawards.com")) return "Education Excellence Awards";
  if (hostname.includes("dentalexcellenceawards.com")) return "Dental Excellence Awards";
  if (hostname.includes("healthcareexcellenceawards.com")) return "Healthcare Excellence Awards";
  
  return "Global Icon Awards";
};
