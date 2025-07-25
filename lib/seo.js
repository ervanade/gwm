// lib/seo.ts
export function getBaseMeta({
    locale,
    path = "",
    title,
    description,
    keywords = [],
  }) {
    const baseUrl = "https://gwminchcape.co.id";
    const url = `${baseUrl}/${locale}${path}`;
    const otherLocale = locale === "id" ? "en" : "id";
  
    return {
      title,
      description,
      keywords,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: url,
        languages: {
          [locale]: url,
          [otherLocale]: `${baseUrl}/${otherLocale}${path}`,
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
  