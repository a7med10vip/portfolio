import "@/app/globals.css";
import { Inter } from "next/font/google";
import RootChrome from "@/components/RootChrome";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body style={{ margin: 0, background: "#F8FAFB", color: "#0F1729" }}>{children}<RootChrome /></body>
    </html>
  );
}
