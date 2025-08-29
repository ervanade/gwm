"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");

import "./unreset.css";
import { useLocale } from "next-intl";
function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
  return css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
    // Tambahkan prefix hanya pada selector, bukan pada @keyframes dll
    if (selector.startsWith("@")) return match;
    const scopedSelectors = selector
      .split(",")
      .map((sel) => `${scopeClass} ${sel.trim()}`)
      .join(", ");
    return `${p1} ${scopedSelectors} {`;
  });
}
const ArticlesDetails = ({ article, related }) => {
  const locale = useLocale() || "id";

  const title = locale === "en" ? article?.title_en : article?.title;
  const content = locale === "en" ? article?.content_en : article?.content;
  const excerpt = locale === "en" ? article?.excerpt_en : article?.excerpt;

  return (
    <div className="w-full bg-gray-50 py-12 px-6 lg:px-12 text-textDark">
      <div className="max-w-[1200px] mx-auto w-full overflow-hidden">
        <div className="news-content">
          <h1 className="text-2xl xl:text-[32px] leading-tight font-bold mb-4 text-center">
            {title}
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 text-sm mb-4 text-gray-700">
            {article.tags?.length > 0 && (
              <div className="text-center text-primary font-medium text-sm">
                {article.tags.map((tag, i) => (
                  <span key={i}>
                    <Link
                      className="px-4 py-1.5 bg-primary text-white font-semibold rounded-full text-sm"
                      href={`/${locale}/news/tag/${tag.slug}`}
                    >
                      #{tag.tag_name}
                    </Link>
                    {/* {i < article.tags.length - 1 && ", "} */}
                  </span>
                ))}
              </div>
            )}
            {article.published_at && (
              <p>{format(parseISO(article.published_at), "yyyy MMM dd")}</p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row w-full mt-5 gap-8">
            <div className="flex-[3_3_0%]">
              {article.cover_url && (
                <div className="aspect-[16/8] lg:aspect-[16/6] w-full overflow-hidden rounded-lg relative">
                  <Image
                    src={article.cover_url || article.image}
                    alt={article.alt_text || "Article GWM"}
                    sizes="100vw"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="news-text mt-5 prose max-w-none prose-img:rounded-md prose-headings:scroll-mt-24">
                <div className="grapejs-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                {/* {content ? (
                  parse(HTMLDecoderEncoder.decode(content))
                ) : (
                  <p className="text-gray-500">Konten tidak tersedia.</p>
                )} */}
              </div>
            </div>

            {related?.length > 0 && (
              <div className="flex-1">
                <h2 className="font-bold text-2xl mb-5">Artikel Terkait</h2>
                {related.map((item, idx) => (
                  <Link
                    href={`/news/${item.slug}?lang=${locale}`}
                    key={idx}
                    className="block mb-4 group"
                  >
                    <div className="flex gap-4 h-[100px] sm:h-[150px] lg:h-[100px] items-center group-hover:cursor-pointer">
                      <div className="flex-[1.35_1.35_0%]">
                        <p className="text-[#6E6E6E] text-sm mb-1">
                          {item.published_at &&
                            format(parseISO(item.published_at), "yyyy MMM dd")}
                        </p>
                        <h3 className="font-bold text-sm line-clamp-3 group-hover:underline">
                          {locale === "en" ? item.title_en : item.title}
                        </h3>
                      </div>
                      <div className="h-full w-[30%] overflow-hidden rounded-lg">
                        <Image
                          src={item.cover}
                          alt={item.alt_text || "GWM Article"}
                          width={100}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
