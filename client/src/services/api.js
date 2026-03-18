
const DEFAULT_BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5000";

export function getBaseUrl() {
  const fromEnv =
    typeof import.meta !== "undefined"
      ? import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_URL
      : undefined;

  const raw = (fromEnv || DEFAULT_BASE_URL).replace(/\/$/, "");
  const normalized = raw.endsWith("/api") ? raw.slice(0, -4) : raw;
  return normalized;
}

async function request(path, { method = "GET", token, body } = {}) {
  const url = `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

/* ---------------- Auth ---------------- */
export function registerUser(payload) {
  return request("/api/auth/register", { method: "POST", body: payload });
}

export function verifyOTP(payload) {
  return request("/api/auth/verify-otp", { method: "POST", body: payload });
}

export function resendOTP(payload) {
  return request("/api/auth/resend-otp", { method: "POST", body: payload });
}

export const googleLoginUrl = `${getBaseUrl()}/api/auth/google`;

export function loginUser(payload) {
  return request("/api/auth/login", { method: "POST", body: payload });
}

export function forgotPassword(payload) {
  return request("/api/auth/forgot-password", { method: "POST", body: payload });
}

export function resetPassword(payload) {
  return request("/api/auth/reset-password", { method: "POST", body: payload });
}

export function adminLogin(payload) {
  return request("/api/admin/login", { method: "POST", body: payload });
}

/* ---------------- Nominations (user) ---------------- */
export function createNomination(payload, token) {
  return request("/api/nominations", { method: "POST", body: payload, token });
}

export function fetchMyNominations(token) {
  return request("/api/nominations/my", { method: "GET", token });
}

export function fetchNominationById(id, token) {
  return request(`/api/nominations/${id}`, { method: "GET", token });
}

export function updateUserNomination(id, payload, token) {
  return request(`/api/nominations/${id}`, { method: "PUT", body: payload, token });
}

/* ---------------- Nominations (admin) ---------------- */
export function fetchAdminNominations(token) {
  return request("/api/admin/nominations", { method: "GET", token });
}

export function updateNominationStatus(id, status, token) {
  return request(`/api/admin/nominations/${id}/status`, {
    method: "PATCH",
    body: { status },
    token,
  });
}

export function updateNomination(id, payload, token) {
  return request(`/api/admin/nominations/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteNomination(id, token) {
  return request(`/api/admin/nominations/${id}`, { method: "DELETE", token });
}

/* ---------------- Previous Editions ---------------- */
export function fetchPreviousEditions() {
  return request("/api/previous-editions", { method: "GET" });
}

export function fetchEditionByYear(year) {
  return request(`/api/previous-editions/${year}`, { method: "GET" });
}

export function createPreviousEdition(payload, token) {
  return request("/api/previous-editions", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updatePreviousEdition(id, payload, token) {
  return request(`/api/previous-editions/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deletePreviousEdition(id, token) {
  return request(`/api/previous-editions/${id}`, { method: "DELETE", token });
}

/* ---------------- Upcoming Awards ---------------- */
export function fetchUpcomingAwards() {
  return request("/api/upcoming-awards", { method: "GET" });
}

export function fetchUpcomingAwardBySlug(slug) {
  return request(`/api/upcoming-awards/${slug}`, { method: "GET" });
}

export function createUpcomingAward(payload, token) {
  return request("/api/upcoming-awards", { method: "POST", body: payload, token });
}

export function updateUpcomingAward(id, payload, token) {
  return request(`/api/upcoming-awards/${id}`, { method: "PUT", body: payload, token });
}

export function deleteUpcomingAward(id, token) {
  return request(`/api/upcoming-awards/${id}`, { method: "DELETE", token });
}
