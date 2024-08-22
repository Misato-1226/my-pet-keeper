"use client";

import { getNews } from "@/api/newsApi";
import { NewsType } from "@/types/NewsType";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNews();
        setNews(response.articles);
        console.log(response.articles);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12 lg:px-36 mb-40">
      <h2 className="text-2xl font-bold mb-6">News</h2>
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-16 p-3 sm:p-12 border-gray-400 border-2 bg-white ">
        {loading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            Failed to load news. Please try again later.
          </div>
        ) : (
          news.map((article, index) => (
            <Link key={index} href={article.url}>
              <div className="cursor-pointer flex flex-col items-center">
                {article.urlToImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="hover:opacity-65 w-52 h-24"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                ) : (
                  <div className="rounded-t-lg w-52 h-24 bg-gray-200" />
                )}
                <h2 className="sm:text-sm">{article.title}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
