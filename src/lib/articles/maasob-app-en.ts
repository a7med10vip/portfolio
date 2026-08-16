import type { Article } from "./types";

/* Every detail here comes from the published app or its store listing. */

const SCREENS = "/articles/maasob";

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
  title: "Maasob Al-Sultan: a restaurant app built for how the Saudi market actually works",
  summary:
    "An ordering app for a Hijazi breakfast chain in Jeddah: five branches, an AI assistant with a name — Sultan AI — calorie counts on every item, loyalty that pays out at 100 points, and a bill that separates VAT from delivery. Shipped January 2026 and still being updated.",
  description:
    "Case study of the Maasob Al-Sultan app: five branches on one order system, the Sultan AI assistant, calorie counts per item, loyalty points and branch opening-hours handling — built on Flutter, Firebase, Paymob and Gemini.",
  keywords: [
    "restaurant app Saudi Arabia",
    "Flutter app case study",
    "multi branch ordering app",
    "Paymob integration",
    "AI assistant restaurant app",
    "Maasob Al-Sultan app",
    "mobile app development Jeddah",
    "calorie display app Saudi",
  ],
  published: "2026-08-17",
  readingMinutes: 6,
  blocks: [
    {
      kind: "p",
      text: "Maasob Al-Sultan is a restaurant chain in Jeddah serving Hijazi breakfast — maasob with cream, honey, banana or cheese, alongside mutabbaq and other dishes. Like most restaurants in the Gulf, it was selling through the aggregators: a commission on every order, and a customer you stop knowing anything about the moment they leave an app you do not own.",
    },
    {
      kind: "p",
      text: "The chain's own app went live on the App Store and Google Play in January 2026, with all five branches on it from launch, after under a month of work.",
    },
    {
      kind: "stats",
      items: [
        { value: "< 1 month", label: "start of work to live on both stores" },
        { value: "5", label: "branches on one order system" },
        { value: "1.1.6", label: "current version — still shipping updates" },
      ],
    },
    { kind: "h2", id: "screens", text: "What the customer sees" },
    {
      kind: "screens",
      items: [
        {
          src: `${SCREENS}/screen-1.png`,
          caption: "Home: branch picker at the top, menu categories, price and calories on every item.",
        },
        {
          src: `${SCREENS}/screen-2.png`,
          caption: "Item page: price, calorie count, and customer ratings inside the app itself.",
        },
        {
          src: `${SCREENS}/screen-3.png`,
          caption: "Account: addresses, orders, favourites — with the account deletion the stores require.",
        },
        {
          src: `${SCREENS}/screen-4.png`,
          caption: "Cart: loyalty progress, VAT and delivery itemised separately, and a notice when the branch is closed.",
        },
      ],
    },
    { kind: "h2", id: "details", text: "The details that decide it" },
    {
      kind: "p",
      text: "The headline features appear in every pitch deck. What separates an app people use from one they install and forget is the small stuff that deals with how the market really works:",
    },
    {
      kind: "features",
      items: [
        {
          icon: "bot",
          title: "Sultan AI — an assistant with a name",
          text: "It appears in the interface as \"ask the chef\", not an anonymous chat bubble in the corner. Running on Gemini, it answers what used to tie up the branch phone: what is in this dish, where is my order, what suits a group of six.",
        },
        {
          icon: "chart",
          title: "Calories on every item",
          text: "326 for the cheese mutabbaq, 427 for the tuna. Calorie display is a regulatory requirement for food outlets in Saudi Arabia, and building it into the menu structure from the start is far cheaper than retrofitting it across a finished catalogue.",
        },
        {
          icon: "gift",
          title: "Loyalty with a visible line",
          text: "100 points for a free meal, with the counter sitting in the cart the whole time. Clarity matters more than generosity here — the customer knows exactly how far away the reward is.",
        },
        {
          icon: "clock",
          title: "Branch opening hours",
          text: "Outside working hours you can still browse and fill a cart, with a clear notice that it will be fulfilled when the branch opens. The alternative — an app that looks broken for half the day — loses a customer exactly once.",
        },
        {
          icon: "card",
          title: "An honest bill",
          text: "Subtotal, VAT and delivery each on their own line. A number that surprises someone at checkout is among the most common reasons a cart is abandoned.",
        },
        {
          icon: "store",
          title: "Five branches, one flow",
          text: "The customer picks a branch and the order lands on that branch's screen. A correct order in the app that arrives confused in the kitchen is a failed order, however good the interface was.",
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
          note: "Realtime data, so an order appears at the branch the moment it is placed and an item that runs out disappears from the menu while it matters.",
        },
        {
          name: "Paymob",
          logo: "/paymob.png",
          note: "A payment gateway built for this region rather than adapted to it. Local cards and wallets work first time, which is most of the checkout battle.",
        },
        {
          name: "Gemini",
          logo: "https://cdn.simpleicons.org/googlegemini/8E75B2",
          note: "The model behind Sultan AI, answering customers at 1am without a support desk waiting behind the screen.",
        },
      ],
    },
    { kind: "h2", id: "after", text: "After launch" },
    {
      kind: "p",
      text: "Shipping fast counts for nothing if the app stops there. Version one went out in January 2026; the app now sits at 1.1.6 — updates kept coming for months after launch, which is the difference between a product in service and a project that was delivered and closed.",
    },
  ],
  faq: [
    {
      q: "How long did the Maasob Al-Sultan app take?",
      a: "Under a month from the start of work to launch on the App Store and Google Play in January 2026, with all five branches connected from day one.",
    },
    {
      q: "What was it built with?",
      a: "Flutter for iOS and Android from one codebase, Firebase for realtime order data, Paymob for payments, and Gemini behind the Sultan AI assistant.",
    },
    {
      q: "What does the app do?",
      a: "Ordering across five branches on one system, an in-app AI assistant, calorie counts on every item, a 100-point loyalty programme, in-app ratings, a bill that itemises VAT and delivery separately, and per-branch opening hours.",
    },
    {
      q: "Why would a restaurant build its own app instead of using delivery aggregators?",
      a: "The commission on every order, and the fact that the customer relationship and the data stay with the aggregator. Owning the app keeps the margin and the data, which is what makes loyalty or repeat custom possible at all.",
    },
    {
      q: "Does the app show calorie counts?",
      a: "Yes, on every menu item — a regulatory requirement for food outlets in Saudi Arabia, handled inside the menu structure from the beginning.",
    },
  ],
};
