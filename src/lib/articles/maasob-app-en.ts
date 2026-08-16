import type { Article } from "./types";

/* Every claim here is either published on ahmedali.online or checkable on the
   store listings linked below. */

export const maasobAppEn: Article = {
  slug: "restaurant-app-shipped-in-under-a-month",
  lang: "en",
  counterpart: "restaurant-app-shipped-in-under-a-month",
  kind: "case-study",
  client: "Maasob Al-Sultan",
  clientNote: "Restaurant chain · Jeddah, Saudi Arabia",
  cover: "/projects/maasob.webp",
  logo: "/ext/masoub.png",
  links: {
    appStore:
      "https://apps.apple.com/ca/app/%D9%85%D8%B9%D8%B5%D9%88%D8%A8-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86/id6757263587",
    playStore: "https://play.google.com/store/apps/details?id=com.masoubalsultan.app",
  },
  title: "Maasob Al-Sultan: a five-branch restaurant app, on both stores in under a month",
  summary:
    "A Jeddah restaurant chain got its own ordering app — five branches, AI support chat, a loyalty programme, live payments and management dashboards — designed, built and published to the App Store and Google Play in under one month, on Flutter, Firebase, Paymob and Gemini.",
  description:
    "How Maasob Al-Sultan's Flutter app shipped to iOS and Android in under a month: five branches on one order system, an AI support chatbot on Gemini, a loyalty programme, Paymob payments and real-time dashboards for management.",
  keywords: [
    "restaurant app Saudi Arabia",
    "Flutter app case study",
    "multi branch ordering app",
    "Paymob integration",
    "Gemini AI chatbot app",
    "Maasob Al-Sultan app",
    "mobile app development Jeddah",
    "food delivery app development",
  ],
  published: "2026-08-17",
  readingMinutes: 7,
  blocks: [
    {
      kind: "p",
      text: "Maasob Al-Sultan is a restaurant chain in Jeddah with five branches. Like most restaurant groups in the Gulf, it was selling through the aggregators — which means paying a commission on every order, and never learning who the customer is. The brief was to own the channel: their app, their customers, their data.",
    },
    {
      kind: "p",
      text: "It went live on the App Store and Google Play in under a month, with all five branches on it from day one.",
    },
    {
      kind: "stats",
      items: [
        { value: "< 1 month", label: "brief to both stores, live" },
        { value: "5", label: "branches on one order system" },
        { value: "iOS + Android", label: "one Flutter codebase" },
      ],
    },
    { kind: "h2", id: "built", text: "What is actually in it" },
    {
      kind: "p",
      text: "This is the part most \"we shipped fast\" stories quietly skip. It was not a menu in a WebView.",
    },
    {
      kind: "features",
      items: [
        {
          icon: "store",
          title: "Five branches, one order flow",
          text: "The customer picks a branch and orders; the order lands at that branch's screen. Getting this wrong is how restaurant apps die — a correct order in the app and a confusing one in the kitchen is a failed order.",
        },
        {
          icon: "bot",
          title: "AI support chat",
          text: "A chatbot on Gemini answers the questions that otherwise ring a phone at the branch: where is my order, what is in this dish, do you deliver to me.",
        },
        {
          icon: "gift",
          title: "Loyalty programme",
          text: "Points and rewards built in, so repeat custom belongs to the restaurant rather than to whichever aggregator ran the deepest discount that week.",
        },
        {
          icon: "card",
          title: "Payments, properly integrated",
          text: "Paymob, so cards and local payment methods work the way a Saudi customer expects, and the money reconciles against the order rather than beside it.",
        },
        {
          icon: "chart",
          title: "Live dashboards for management",
          text: "Real-time performance by branch. The owner opens a screen and sees what is happening now, not a report about last month.",
        },
      ],
    },
    { kind: "h2", id: "stack", text: "The stack, and why each piece" },
    {
      kind: "stack",
      items: [
        {
          name: "Flutter",
          logo: "https://cdn.simpleicons.org/flutter/02569B",
          note: "One codebase, and more to the point one release queue. Two native builds means two review cycles to align, and on a one-month schedule the aligning is what kills you — not the code.",
        },
        {
          name: "Firebase",
          logo: "https://cdn.simpleicons.org/firebase/FFCA28",
          note: "Realtime database. Orders have to appear at a branch the moment they are placed; polling an API on a timer is how you get a cold kitchen and an angry customer.",
        },
        {
          name: "Paymob",
          logo: "/paymob.png",
          note: "Payments built for this region rather than retro-fitted to it. Local cards and wallets work on the first try, which is most of the checkout battle.",
        },
        {
          name: "Gemini",
          logo: "https://cdn.simpleicons.org/googlegemini/8E75B2",
          note: "Support that answers instantly at 1am without a support team behind it — the sort of thing that used to be out of reach for a five-branch business.",
        },
      ],
    },
    { kind: "h2", id: "month", text: "How a month was enough" },
    {
      kind: "p",
      text: "Not by working faster. On a normal build, the product decision, the engineering decision and the launch decision sit with three different parties, and every question between them costs a round trip — a day to ask, two to answer, a week if somebody is travelling. Ten of those questions is the month, spent entirely on waiting.",
    },
    {
      kind: "quote",
      text: "The scarce resource on a short deadline is not hours. It is decisions that do not have to travel.",
    },
    {
      kind: "p",
      text: "Here, design, build and launch sat in one place, so the queue disappeared. The store submissions were prepared alongside the build rather than after it — screenshots, listings, privacy declarations and the review itself are a week of calendar time that most projects discover at the end, when the code is done and the launch is not.",
    },
    { kind: "h2", id: "live", text: "It is public — go and check" },
    {
      kind: "p",
      text: "The app is on both stores under the restaurant's own name, with the five branches taking orders through it. That is the only kind of case study worth reading: one you can open and verify in about thirty seconds.",
    },
    {
      kind: "note",
      text: "Running a chain that is paying commission on every order? The build is rarely the hard part. The hard part is deciding to own the customer relationship, and then having someone hold product, engineering and launch tightly enough to actually get there.",
    },
  ],
  faq: [
    {
      q: "How long did the Maasob Al-Sultan app take?",
      a: "Under one month, from brief to live on both the App Store and Google Play, with all five branches connected at launch.",
    },
    {
      q: "What was the app built with?",
      a: "Flutter for iOS and Android from one codebase, Firebase for realtime order data, Paymob for payments, and Gemini behind the AI support chat.",
    },
    {
      q: "What features does it have?",
      a: "Multi-branch ordering across five locations, an AI support chatbot, a customer loyalty programme, integrated payment gateways, and real-time performance dashboards for management.",
    },
    {
      q: "Why would a restaurant build its own app instead of using delivery aggregators?",
      a: "Commission on every order, and no relationship with the customer afterwards. An owned app keeps the margin and the data, which is what makes loyalty and repeat custom possible at all.",
    },
    {
      q: "How do you ship a mobile app in a month?",
      a: "Keep product, engineering and launch decisions in one place so nothing waits on a round trip, prepare the store submissions in parallel with the build rather than after it, and choose a stack whose parts already solve the regional problems — payments especially.",
    },
  ],
};
