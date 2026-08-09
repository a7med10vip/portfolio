import { IBM_Plex_Sans_Arabic, Poppins } from "next/font/google";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "نظام التصميم — منصة خطابة السعودية الأولى | Ahmed Ali",
  description:
    "النظام التصميمي الكامل لمنصة خطابة السعودية الأولى — الألوان، الخطوط، المكونات، والإرشادات البصرية.",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${ibmPlex.variable} ${poppins.variable}`}
      style={{ fontFamily: "var(--font-ibm-plex-arabic), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
