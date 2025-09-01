// lib/seo.ts
export function getBaseMeta({
  locale,
  path = "",
  title,
  description,
  keywords = [],
}) {
  const baseUrl = "https://gwminchcape.co.id";
  const url = `${baseUrl}/${locale}${path}`.replace(/\/$/, "");
  const otherLocale = locale === "en" ? "en" : "id";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        "id-ID": `${baseUrl}/id${path}`.replace(/\/$/, ""),
        "en-US": `${baseUrl}/en${path}`.replace(/\/$/, ""),
        "x-default": baseUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: "GWM Inchcape Indonesia",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
