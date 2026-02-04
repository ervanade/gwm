"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import Models from "@/components/models/Models";

const HeroSkeleton = () => (
  <div className="w-full h-[600px] bg-gray-200 animate-pulse flex items-center justify-center">
    <div className="text-gray-400 text-lg font-medium">Loading...</div>
  </div>
);

// Spinner loading kecil
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
  </div>
);

// Import komponen dynamic client-only
// const Hero = dynamic(() => import("@/components/hero/Hero"), {
//     ssr: false,
//     loading: () => <HeroSkeleton />,
//   });
//   const Models = dynamic(() => import("@/components/models/Models"), {
//     ssr: false,
//     loading: () => <Spinner />,
//   });
const OverviewProduct = dynamic(
  () => import("@/components/overviewProduct/OverviewProduct"),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);
const AfterSales = dynamic(() => import("@/components/afterSales/AfterSales"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function HomepageClient({ data }) {
  const productHighlight =
    data?.locale === "en"
      ? data?.pages?.["product-highlight-en"] || {}
      : data?.pages?.["product-highlight"] || {};

  const dataAfterSales =
    data?.locale === "en"
      ? data?.pages?.["gwm-after-sales-en"]
      : data?.pages?.["gwm-after-sales"] || {};

  const dataWhy =
    data?.locale === "en"
      ? data?.pages?.["why-gwm-inchcape-en"]
      : data?.pages?.["why-gwm-inchcape"] || {};

  return (
    <>
      <Hero dataHero={data?.banners || null} />
      {/* <Models dataModels={data?.products || []} dataCategories={data?.categories || []} /> */}
      <OverviewProduct
        overviewHtml={productHighlight}
        dataModels={data?.products_overview || []}
        dataAfterSales={dataAfterSales}
      />
      <AfterSales dataWhy={dataWhy} />
    </>
  );
}
