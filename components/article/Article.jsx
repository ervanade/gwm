"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GwmArticles() {
  const locale = useLocale();
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchArticles = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/article?page=${pageNum}`,
        {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      if (pageNum === 1) {
        setArticles(res.data.data);
      } else {
        setArticles((prev) => [...prev, ...res.data.data]);
      }
      setPagination(res.data);
      setLoading(false);

      // Ambil semua tag unik dari artikel
      const allTags = new Set();
      res.data.data.forEach((item) => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach((tag) => allTags.add(tag.name));
        }
      });
      setTags(Array.from(allTags));
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-12 bg-white text-dark">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">
          {locale === "en" ? "NEWS & PROMO" : "NEWS & PROMO"}
        </h2>
        <p className="text-gray-600">
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
            className="inline-block mr-4 bg-primary text-white px-4 py-2 rounded-full font-sm md:font-base font-semibold"
          >
            All Tags
          </Link>
          {tags.map((tag, index) => (
            <Link
              key={index}
              href={`/${locale}/news/tag/${tag?.slug}`}
              className="inline-block mr-4 border border-black/80 text-black/80 px-4 py-2 rounded-full font-sm md:font-base"
            >
              {locale === "en" ? tag?.tag_name : tag?.tag_name}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col space-y-4 rounded-xl shadow-md p-6 bg-gray-200"
              >
                <div className="h-56 bg-gray-300 rounded-t-lg"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </>
        ) : articles.length > 0 ? (
          articles.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col mt-6 text-dark bg-white shadow-md bg-clip-border rounded-xl"
            >
              <div className="relative h-56 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-lg bg-blue-gray-500 shadow-blue-gray-500/40">
                <Image
                  src={
                    item.cover_large?.startsWith("http")
                      ? item.cover_large
                      : `${process.env.NEXT_PUBLIC_API_KEY}${item.cover_large}`
                  }
                  alt={item.meta_title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {item.tags && item.tags.length > 0 && (
                  <div className="absolute bottom-4 left-2 flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/${locale}/news/tag/${tag?.slug}`}
                        className="bg-primary text-white px-3 py-1 text-[10px] rounded-full"
                      >
                        {locale === "en"
                          ? "#" + tag?.tag_name
                          : "#" + tag?.tag_name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h5 className="block text-lg md:text-xl mb-2 font-semibold leading-snug text-blue-gray-900 line-clamp-3">
                  {locale === "en" ? item.title_en : item.title}
                </h5>
                <p className="line-clamp-3 text-sm md:text-base font-light text-inherit min-h-[76px]">
                  {locale === "en" ? item.excerpt_en : item.excerpt}
                </p>
                {item.tags?.length > 0 && (
                  <div className="text-sm text-dark font-medium mt-2">
                    {item.tags.map((tag, i) => (
                      <span key={i}>
                        <Link
                          href={`/news/tag/${tag.slug}`}
                          className="hover:underline"
                        >
                          {locale === "en"
                            ? "#" + tag?.tag_name
                            : "#" + tag?.tag_name}
                        </Link>
                        {i < item.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                )}
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
      {pagination?.total > articles.length && (
        <div className="flex justify-center items-center mt-12 lg:mt-16">
          <button
            onClick={handleLoadMore}
            className="bg-[#000] text-white py-3 text-xl lg:text-[24px] font-semibold mt-4 px-8"
          >
            {locale === "en" ? "Load More" : "Tampilkan Lebih Banyak"}
          </button>
        </div>
      )}
    </section>
  );
}
