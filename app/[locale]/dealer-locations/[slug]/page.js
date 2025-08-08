import React from "react";
import { notFound } from "next/navigation";
import ArticlesDetails from "@/components/article/ArticleDetails";
import { getBaseMeta } from "@/lib/seo";
import DealerDetails from "@/components/dealers/DealerDetails";
const HTMLDecoderEncoder = require("html-encoder-decoder");

// ✅ Fetch artikel berdasarkan slug
const fetchGwmDealer = async (slug) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/dealer/slug/${slug}`, {
        next: { revalidate: 3600 },
        method: "GET",
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch dealer");

    return res.json();
};

// ✅ SEO Metadata Generator
export async function generateMetadata({ params }) {
    const { slug, locale } = await params;
    const { data } = await fetchGwmDealer(slug);
    const dealer = data

    if (!dealer) return notFound();

    const isEnglish = locale === "en";

    return getBaseMeta({
        locale,
        path: `/dealer-locations/${dealer.slug}`,
        title: HTMLDecoderEncoder.decode(
            isEnglish ? "Visit " + dealer?.meta_title : "Kunjungi " + dealer?.meta_title || dealer?.title
        ),
        description: HTMLDecoderEncoder.decode(
            isEnglish ? "Find information about " + dealer?.meta_description : "Temukan informasi tentang " + dealer?.meta_description || ""
        ),
        keywords: HTMLDecoderEncoder.decode(
            isEnglish ? dealer?.meta_keywords : dealer?.meta_keywords || ""
        ),
        image: dealer?.cover_large || dealer?.cover || "/og-default.jpg",
    });
}

// ✅ Page component
const page = async ({ params }) => {
    const { slug } = await params;

    const { data } = await fetchGwmDealer(slug);

    if (!data) return notFound();

    const dealer = data;

    return <DealerDetails article={dealer} related={[]} />;
};

export default page;
