"use client";

import { getNews } from "@/api/newsApi";
import { NewsType } from "@/types/NewsType";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNews();
        setNews(response.articles);
        console.log(response.articles);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12">
      <div className="grid grid-cols-3 gap-16 p-12 bg-white">
        {news.map((article, index) => (
          <Link key={index} href={article.url}>
            <div className="">
              {article.urlToImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="rounded-t-lg w-full"
                  src={article.urlToImage}
                  alt={article.title}
                  width={200}
                  height={100}
                />
              ) : (
                <div className="rounded-t-lg w-full h-100 bg-gray-200" />
              )}
              <h2>{article.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
