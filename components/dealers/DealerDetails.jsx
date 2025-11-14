"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");

import "./unreset.css";

const DealerDetails = ({ article, related }) => {
  const locale = useSearchParams().get("lang") || "id";

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

          <div className="flex flex-col lg:flex-row w-full mt-5 gap-8">
            <div className="flex-[3_3_0%]">
              {article.image && (
                <div className="aspect-[16/8] lg:aspect-[16/7] w-full overflow-hidden rounded-lg relative">
                  <Image
                    src={article.image}
                    alt={article.alt_text || "Article GWM"}
                    sizes="100vw"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="news-text mt-5 prose max-w-none prose-img:rounded-md prose-headings:scroll-mt-24">
                {content ? (
                  parse(HTMLDecoderEncoder.decode(content))
                ) : (
                  <p className="text-gray-500">Konten tidak tersedia.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetails;
