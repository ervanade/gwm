"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

export default function GwmArticlesByTag({ slugTag }) {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  // page dari URL
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/article/tag/${slugTag}?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
    }
  );

  const articles = useMemo(() => data?.data || [], [data]);
  const pagination = data;
  const totalPages = pagination?.last_page || 1;

  // tags dari artikel page ini
  const tags = useMemo(() => {
    const map = new Map();
    articles.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (tag.slug && !map.has(tag.slug)) {
          map.set(tag.slug, tag);
        }
      });
    });
    return Array.from(map.values());
  }, [articles]);

  const changePage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;

    router.push(
      `/${locale}/news/tag/${slugTag}?page=${pageNum}`,
      { scroll: true }
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 bg-white text-dark">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-1">
          NEWS & PROMO
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {locale === "en"
            ? "Find the latest news and promotions from GWM Indonesia"
            : "Temukan berita dan promo terbaru dari GWM Indonesia"}
        </p>
      </div>

      {/* TAG FILTER */}
      {tags.length > 0 && (
        <div className="mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link
            href={`/${locale}/news`}
            className="inline-block mr-2 md:mr-4 px-4 py-2 rounded-full text-sm md:text-base border border-black/80"
          >
            All Tags
          </Link>

          {tags.map((tag) => {
            const isActive = tag.slug === slugTag;
            return (
              <Link
                key={tag.slug}
                href={`/${locale}/news/tag/${tag.slug}`}
                className={`inline-block mr-2 md:mr-4 px-4 py-2 rounded-full text-sm md:text-base ${
                  isActive
                    ? "bg-primary text-white"
                    : "border border-black/80 text-black/80"
                }`}
              >
                {locale === "en"
                  ? tag.tag_name_en || tag.tag_name
                  : tag.tag_name}
              </Link>
            );
          })}
        </div>
      )}

      {/* ARTICLE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col space-y-4 rounded-xl shadow-md p-6 bg-gray-200"
            >
              <div className="h-56 bg-gray-300 rounded-t-lg" />
              <div className="h-6 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-5/6 bg-gray-300 rounded" />
            </div>
          ))
        ) : articles.length > 0 ? (
          articles.map((item) => (
            <div
              key={item.slug}
              className="relative flex flex-col mt-6 bg-white shadow-md rounded-xl"
            >
              <div className="relative h-56 -mt-6 overflow-hidden rounded-t-lg">
                <Image
                  src={
                    item.cover_large?.startsWith("http")
                      ? item.cover_large
                      : `${process.env.NEXT_PUBLIC_API_KEY}${item.cover_large}`
                  }
                  alt={item.meta_title || item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <Link href={`/${locale}/news/${item.slug}`}>
                  <h5 className="text-lg md:text-xl mb-2 font-semibold line-clamp-3 hover:underline">
                    {locale === "en" ? item.title_en : item.title}
                  </h5>
                </Link>
                <p className="line-clamp-3 text-sm md:text-base font-light min-h-[76px]">
                  {locale === "en" ? item.excerpt_en : item.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/${locale}/news/${item.slug}`}
                  className="inline-block text-sm py-3 px-6 rounded-md bg-primary text-white"
                >
                  {locale === "en" ? "Read More" : "Selengkapnya"}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            {locale === "en"
              ? "No articles available."
              : "Belum ada artikel."}
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => changePage(p)}
                className={`px-4 py-2 border rounded cursor-pointer ${
                  p === page
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
