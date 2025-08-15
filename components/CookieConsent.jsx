"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
  };

  // Tambahkan fungsi untuk menolak, cukup menyembunyikan notifikasi tanpa set cookie
  const declineCookies = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Konten teks notifikasi */}
        <p className="text-sm">
          {locale === "en"
            ? `We use cookies to improve your experience on this website. By continuing, you agree to our terms and conditions.`
            : `Kami menggunakan cookies untuk meningkatkan pengalaman Anda di website ini. Dengan melanjutkan, Anda setuju dengan`}{" "}
          <Link
            href="/privacy-policy"
            className="underline text-primary hover:text-primary/80 transition-colors"
          >
            {locale === "en" ? `Privacy Policy` : `Kebijakan Privasi`}
          </Link>
          .
        </p>

        {/* Tombol-tombol aksi */}
        <div className="flex gap-4 flex-shrink-0">
          <button
            onClick={declineCookies}
            className="border border-white hover:bg-white text-white hover:text-gray-900 px-4 py-2 rounded text-sm transition-colors"
          >
            {locale === "en" ? `Decline` : `Tolak`}
          </button>
          <button
            onClick={acceptCookies}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            {locale === "en" ? `Accept` : `Terima`}
          </button>
        </div>
      </div>
    </div>
  );
}