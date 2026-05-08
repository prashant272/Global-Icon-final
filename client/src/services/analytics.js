import { getBaseUrl } from "./api";

const ANALYTICS_URL = `${getBaseUrl()}/api/analytics/track`;

// Helper to get or create a persistent visitorId
export const getVisitorId = () => {
  let vid = localStorage.getItem("visitor_id");
  if (!vid) {
    vid = `v-${Math.random().toString(36).substring(2, 15)}-${Date.now().toString(36)}`;
    localStorage.setItem("visitor_id", vid);
  }
  return vid;
};

/**
 * Track a user action
 * @param {string} action - Action name (e.g., 'page_view', 'popup_open')
 * @param {object} metadata - Optional additional data
 */
export const trackAction = async (action, metadata = {}) => {
  try {
    const visitorId = getVisitorId();
    const path = window.location.pathname;

    // Use sendBeacon for more reliable tracking on page unload if needed,
    // but for most actions, a standard fetch is fine.
    await fetch(ANALYTICS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        action,
        path,
        metadata
      }),
    });
  } catch (error) {
    // Fail silently to not disrupt user experience
    console.warn("Analytics tracking failed", error);
  }
};

/**
 * Global page view tracker hook
 */
export const trackPageView = () => {
  trackAction("page_view");
};
