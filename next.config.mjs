import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
  cacheMaxMemorySize: 104857600, // 100 MB dalam byte
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, immutable", // Long caching for static assets
          }
        ],
      },
    ];
  },
  reactStrictMode: true,  // Enables strict mode for better debugging
  // swcMinify: true,  // Faster JavaScript minification
  compress: true,   // Enables compression (gzip and brotli),
  trailingSlash: false,
  async redirects() {
    return [
      // Root diarahkan ke /id
      {
        source: "/",
        destination: "https://gwminchcape.co.id/id",
        permanent: true,
      },
      {
        source: "/id/",
        destination: "https://gwminchcape.co.id/id",
        permanent: true,
      },

      // Contact Us
      {
        source: "/contact-us",
        destination: "https://gwminchcape.co.id/id/contact-us",
        permanent: true,
      },

      // After Sales
      {
        source: "/after-sales",
        destination: "https://gwminchcape.co.id/id/after-sales",
        permanent: true,
      },
      {
        source: "/en/after-sales/",
        destination: "https://gwminchcape.co.id/en/after-sales",
        permanent: true,
      },

      // Dealer Locations
      {
        source: "/dealer-locations",
        destination: "https://gwminchcape.co.id/id/dealer-locations",
        permanent: true,
      },
      {
        source: "/dealer-locations/:path*",
        destination: "https://gwminchcape.co.id/id/dealer-locations/:path*",
        permanent: true,
      },

      // ERA
      {
        source: "/era",
        destination: "https://gwminchcape.co.id/id/era",
        permanent: true,
      },

      // Models
      {
        source: "/models/:path*",
        destination: "https://gwminchcape.co.id/id/models/:path*",
        permanent: true,
      },

      // News
      {
        source: "/news",
        destination: "https://gwminchcape.co.id/id/news",
        permanent: true,
      },
      {
        source: "/news/:path*",
        destination: "https://gwminchcape.co.id/id/news/:path*",
        permanent: true,
      },

      // Privacy Policy
      {
        source: "/privacy-policy",
        destination: "https://gwminchcape.co.id/id/privacy-policy",
        permanent: true,
      },

      // Test Drive
      {
        source: "/test-drive",
        destination: "https://gwminchcape.co.id/id/test-drive",
        permanent: true,
      },

      // Hilangkan trailing slash
      {
        source: "/:path*/",
        destination: "https://gwminchcape.co.id/:path*",
        permanent: true,
      },
    ];
  },

  // optimizeFonts: true,  // Optimizes font loading for better performance
};

export default withNextIntl(nextConfig);