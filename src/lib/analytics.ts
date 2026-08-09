function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("_sid");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("_sid", id);
  }
  return id;
}

function getDevice(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getLang(): string {
  if (typeof window === "undefined") return "en";
  return window.location.pathname.startsWith("/ar") ? "ar" : "en";
}

export async function trackPageView() {
  try {
    await fetch("/api/track/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        device: getDevice(),
        lang: getLang(),
        sessionId: getSessionId(),
      }),
    });
  } catch {}
}

export async function trackCVDownload() {
  try {
    await fetch("/api/track/cv-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        device: getDevice(),
        lang: getLang(),
        sessionId: getSessionId(),
      }),
    });
  } catch {}
}

export async function trackEvent(eventName: string, eventData: Record<string, unknown> = {}) {
  try {
    await fetch("/api/track/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventData,
        sessionId: getSessionId(),
        path: window.location.pathname,
      }),
    });
  } catch {}
}

export function getSessionIdSync(): string {
  return getSessionId();
}
