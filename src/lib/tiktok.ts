const PIXEL_ID = "D73LEAJC77UD6SV8MMG0";
const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;

type TikTokEvent = {
  event: string;
  event_id?: string;
  timestamp?: string;
  context?: {
    user_agent?: string;
    ip?: string;
    page?: { url?: string; referrer?: string };
  };
  properties?: Record<string, unknown>;
};

export async function sendTikTokEvent(event: TikTokEvent) {
  if (!ACCESS_TOKEN) return;

  try {
    await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": ACCESS_TOKEN,
      },
      body: JSON.stringify({
        pixel_code: PIXEL_ID,
        partner_name: "AhmedAli",
        test_event_code: undefined,
        data: [
          {
            event: event.event,
            event_id: event.event_id || crypto.randomUUID(),
            event_time: Math.floor(Date.now() / 1000),
            context: event.context || {},
            properties: event.properties || {},
          },
        ],
      }),
    });
  } catch {}
}
