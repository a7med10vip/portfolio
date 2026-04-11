export const metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: "#F8FAFC" }}>
        {children}
      </body>
    </html>
  );
}
