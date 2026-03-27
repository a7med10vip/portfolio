import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "260px", padding: "32px 40px", minHeight: "100vh", maxWidth: "calc(100vw - 260px)" }}>
        {children}
      </main>
    </div>
  );
}
