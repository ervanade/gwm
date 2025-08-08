import React from "react";
import { notFound } from "next/navigation";
import ArticlesDetails from "@/components/article/ArticleDetails";
import { getBaseMeta } from "@/lib/seo";
const HTMLDecoderEncoder = require("html-encoder-decoder");

// ✅ Fetch artikel berdasarkan slug
const fetchGwmArticle = async (slug) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/article/slug/${slug}`, {
        next: { revalidate: 3600 },
        method: "GET",
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch article");

    return res.json();
};

// ✅ SEO Metadata Generator
export async function generateMetadata({ params }) {
    const { slug, locale } = await params;
    const article = await fetchGwmArticle(slug);

    if (!article) return notFound();

    const isEnglish = locale === "en";

    return getBaseMeta({
        locale,
        path: `/articles/${article.slug}`,
        title: HTMLDecoderEncoder.decode(
            isEnglish ? article?.meta_title_en + " | GWM Inchcape Indonesia" : article?.meta_title + " | GWM Inchcape Indonesia" || article?.title + " | GWM Inchcape Indonesia"
        ),
        description: HTMLDecoderEncoder.decode(
            isEnglish ? article?.meta_desc_en : article?.meta_desc || ""
        ),
        keywords: HTMLDecoderEncoder.decode(
            isEnglish ? article?.meta_keywords_en : article?.meta_keywords || ""
        ),
        image: article?.cover_large || article?.cover || "/og-default.jpg",
    });
}

// ✅ Page component
const page = async ({ params }) => {
    const { slug } = await params;

    const data = await fetchGwmArticle(slug);

    if (!data) return notFound();

    const article = data;

    return <ArticlesDetails article={article} related={[]} />;
};

export default page;
