export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body style={{ margin: 0, background: "#F8FAFB" }}>{children}</body>
    </html>
  );
}
