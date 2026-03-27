import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ margin: 0, background: "#0A0A0A", color: "#fff" }}>{children}</body>
    </html>
  );
}
