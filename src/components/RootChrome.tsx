import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import PageTracker from "@/components/tracking/PageTracker";

/* Site-wide analytics that used to live in `app/layout.tsx`. That file had to
   go: Next treats the top-most layout as *the* root layout and demands <html>
   and <body> there, but this app deliberately runs multiple root layouts (one
   per locale and per standalone landing page) so each can set its own lang,
   dir, fonts and head. Removing `app/layout.tsx` makes every layout below it a
   root layout — and this component is how they share the chrome. */
export default function RootChrome() {
  return (
    <>
      <PageTracker />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
