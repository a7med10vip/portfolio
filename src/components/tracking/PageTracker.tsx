"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function PageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname?.startsWith("/dashboard") && !pathname?.startsWith("/login")) {
      trackPageView();
    }
  }, [pathname]);
  return null;
}
