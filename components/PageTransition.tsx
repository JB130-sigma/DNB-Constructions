"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import CementTruckLoader from "./CementTruckLoader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isNavigating, stopNavigation } = useStore();

  useEffect(() => {
    // Whenever the route completes loading (pathname or params change), we stop the loader.
    // We add a tiny delay so the drive-forward animation can finish naturally if it's fast.
    const t = setTimeout(() => {
      stopNavigation();
    }, 300);
    return () => clearTimeout(t);
  }, [pathname, searchParams, stopNavigation]);

  return (
    <>
      <CementTruckLoader visible={isNavigating} message="Loading module..." />
      {children}
    </>
  );
}
