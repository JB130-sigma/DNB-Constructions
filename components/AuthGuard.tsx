"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated and trying to access an admin route, redirect to login
    if (!currentUser && pathname.startsWith("/admin")) {
      router.replace("/login");
    }
  }, [currentUser, pathname, router]);

  // If not authenticated, we return null to avoid flashing the protected UI
  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-cement-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[13px] font-bold text-cement-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
