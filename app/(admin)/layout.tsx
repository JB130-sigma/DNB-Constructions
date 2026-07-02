import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-cement-50 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 md:ml-0">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto p-3 md:p-6 pt-4">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
