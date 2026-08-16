import type { Article } from "./types";

/* Everything stated here is already published on ahmedali.online or verifiable
   on the App Store listing. No numbers are claimed that cannot be checked. */

export const maasobAppEn: Article = {
  slug: "restaurant-app-shipped-in-under-a-month",
  lang: "en",
  counterpart: "restaurant-app-shipped-in-under-a-month",
  kind: "case-study",
  client: "Maasob Al-Sultan",
  title: "Shipping a restaurant app to both stores in under a month",
  summary:
    "Maasob Al-Sultan went from nothing to a Flutter app live on the App Store and Google Play in under a month, with five branches connected to it. The schedule held because the scope was cut to what a first version genuinely needs, and because the same person made the product, engineering and launch decisions.",
  description:
    "How the Maasob Al-Sultan app shipped to iOS and Android in under a month with five branches connected — what was cut, what was kept, and why one person owning product, build and launch is what made the deadline survivable.",
  keywords: [
    "restaurant app development Saudi Arabia",
    "Flutter app case study",
    "ship mobile app fast",
    "MVP scope",
    "Maasob Al-Sultan app",
    "mobile app development Jeddah",
  ],
  published: "2026-08-17",
  readingMinutes: 6,
  blocks: [
    {
      kind: "p",
      text: "Most app projects do not fail at the build. They fail in the four months before it, while the scope is argued over — and again in the two months after, while the launch waits on somebody else's queue. Maasob Al-Sultan shipped to both stores in under a month, with five branches connected. Here is what that actually took.",
    },
    {
      kind: "stats",
      items: [
        { value: "< 1 month", label: "from start to live on both stores" },
        { value: "5", label: "branches connected at launch" },
        { value: "iOS + Android", label: "shipped together, not one then the other" },
      ],
    },
    { kind: "h2", id: "brief", text: "The brief" },
    {
      kind: "p",
      text: "A restaurant group with five branches needed its own app — ordering that belonged to the business rather than to an aggregator taking a cut of every order and owning the customer relationship at the end of it. The commercial logic was not in question. The timeline was: there was a season to hit, and an app that arrives after it is an app that arrives next year.",
    },
    { kind: "h2", id: "scope", text: "What got cut" },
    {
      kind: "p",
      text: "A month is not a compressed version of six months. It is a different scope. The decision that made the date was deciding what a first version does not do:",
    },
    {
      kind: "list",
      items: [
        "No loyalty programme in v1. It is the most requested feature in every restaurant brief and the least useful before there are users to be loyal.",
        "No in-app wallet or stored balance — a payments and reconciliation problem wearing a feature's clothes.",
        "No bespoke design system. A clean, conventional ordering flow that customers already know how to use beats an original one they have to learn.",
        "No admin panel built from scratch for things the existing systems already did.",
      ],
    },
    {
      kind: "p",
      text: "What stayed was the spine: browse the menu, choose a branch, order, pay, and have the branch receive it reliably. Everything that was cut can be added to a live app with real users. Nothing that was kept could have been.",
    },
    { kind: "h2", id: "build", text: "The build" },
    {
      kind: "p",
      text: "Flutter, for the reason people usually choose it and rarely say out loud: it is not that one codebase is elegant, it is that one codebase means one queue. Two native builds means two review cycles, two sets of bugs and two release calendars to align — and on a one-month schedule, the alignment is the thing that kills you, not the code.",
    },
    {
      kind: "p",
      text: "Five branches connected means five real kitchens with real staff, which is where a project like this is usually actually decided. An order that arrives correctly in the app and confusingly on the branch side is a failed order, and no amount of polish on the customer screen fixes it.",
    },
    { kind: "h2", id: "why-fast", text: "Why the date held" },
    {
      kind: "p",
      text: "Not heroics, and not a bigger team — the opposite. On a normal build, the product decision, the engineering decision and the launch decision sit with three parties, and every question between them costs a round trip: a day to ask, two days to answer, a week if somebody is travelling. Ten such questions is the month.",
    },
    {
      kind: "quote",
      text: "The scarce resource on a short deadline is not hours. It is decisions that do not have to travel.",
    },
    {
      kind: "p",
      text: "Holding product, build and launch in one place removes that latency entirely. It is not the right shape for every project — at real scale you want specialists, and the coordination cost is worth paying. But for a first version on a deadline, it is the difference between shipping and explaining.",
    },
    { kind: "h2", id: "result", text: "Where it landed" },
    {
      kind: "p",
      text: "Live on the App Store and Google Play, with five branches taking orders through it, inside the month. The app is public and can be checked — which is the only kind of case study worth writing.",
    },
    {
      kind: "note",
      text: "Working to a date that looks impossible? The question is almost never how to build faster. It is which half of the brief is not needed yet.",
    },
  ],
  faq: [
    {
      q: "How long did the Maasob Al-Sultan app take to build?",
      a: "Under one month, from start to live on both the App Store and Google Play, with five branches connected at launch.",
    },
    {
      q: "What was it built with?",
      a: "Flutter, shipping iOS and Android from a single codebase — chosen mainly because one codebase means one release queue, which is what a short deadline can survive.",
    },
    {
      q: "How do you ship a mobile app in a month?",
      a: "By cutting scope rather than compressing schedule. Loyalty, wallets and bespoke design systems come out; browse, choose a branch, order, pay and reliable receipt at the branch stay in. It also helps enormously if product, engineering and launch decisions sit with one person, because most of a short schedule is spent waiting for answers to travel.",
    },
  ],
};
