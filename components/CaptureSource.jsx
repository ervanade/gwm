"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CaptureSource() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const raw = params.toString(); // ambil mentahan
    
    if (raw) {
      Cookies.set("raw_source", raw, { expires: 7 });
      router.replace(window.location.pathname);
    }
  }, []);

  return null;
}
