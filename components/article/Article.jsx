"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

export default function GwmArticles() {
  const locale = useLocale();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/article?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 10000
    }
  );

  const articles = useMemo(() => data?.data || [], [data]);
  const pagination = data;

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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };


  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 bg-white text-dark">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-1">
          {locale === "en" ? "NEWS & PROMO" : "NEWS & PROMO"}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {locale === "en"
            ? "Find the latest news and promotions from GWM Indonesia"
            : "Temukan berita dan promo terbaru dari GWM Indonesia"}
        </p>
      </div>

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link
            href={`/${locale}/news`}
            className="inline-block mr-2 md:mr-4 bg-primary text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold"
          >
            All Tags
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag?.slug}
              href={`/${locale}/news/tag/${tag?.slug}`}
              className="inline-block mr-2 md:mr-4 border border-black/80 text-black/80 px-4 py-2 rounded-full text-sm md:text-base"
            >
              {locale === "en" ? tag?.tag_name || tag?.tag_name : tag?.tag_name}
            </Link>
          ))}
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col space-y-4 rounded-xl shadow-md p-6 bg-gray-200"
            >
              <div className="h-56 bg-gray-300 rounded-t-lg"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : articles.length > 0 ? (
          articles.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col mt-6 text-dark bg-white shadow-md bg-clip-border rounded-xl"
            >
              <div className="relative h-56 -mt-6 overflow-hidden text-white shadow-lg rounded-t-lg">
                <Image
                  src={
                    item.cover_large?.startsWith("http")
                      ? item.cover_large
                      : `${process.env.NEXT_PUBLIC_API_KEY}${item.cover_large}`
                  }
                  alt={item.meta_title || item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {item.tags?.length > 0 && (
                  <div className="absolute bottom-4 left-2 flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/${locale}/news/tag/${tag?.slug}`}
                        className="bg-primary text-white px-3 py-1 text-[10px] rounded-full"
                      >
                        #{tag?.tag_name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6">
                <Link
                  href={`/${locale}/news/${item.slug}`}
                  className="hover:underline"
                >
                  <h5 className="block text-lg md:text-xl mb-2 font-semibold line-clamp-3 hover:underline">
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
                  className="text-sm py-3 px-6 rounded-md bg-primary text-white shadow-md hover:shadow-lg transition"
                >
                  {locale === "en" ? "Read More" : "Selengkapnya"}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            {locale === "en"
              ? "No articles available at the moment."
              : "Belum ada artikel saat ini."}
          </p>
        )}
      </div>

      {/* Load More */}
      {pagination?.current_page < pagination?.last_page && (
        <div className="flex justify-center items-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-white py-3 text-base lg:text-xl font-semibold mt-4 px-6 rounded cursor-pointer"
          >
            {locale === "en" ? "Load More" : "Tampilkan Lebih Banyak"}
          </button>
        </div>
      )}
    </section>
  );
}
