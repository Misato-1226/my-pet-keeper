"use client";

import { getNews } from "@/api/newsApi";
import { NewsType } from "@/types/NewsType";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //dummy api news for production environment.
  const dummyNews = [
    {
      url: "https://9to5mac.com/2024/08/26/lyft-pet-rides-will-prevent-repeat-of-tux-the-missing-cat-drama/",
      urlToImage:
        "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2024/08/Lyft-Pet-Rides.webp?resize=1200%2C628&quality=82&strip=all&ssl=1",
      title: "Lyft Pet Rides will prevent repeat of Tux the Missing Cat drama",
    },
    {
      url: "https://www.diyphotography.net/heres-what-it-looks-like-to-hire-a-dog-as-your-wedding-videographer/",
      urlToImage:
        "https://www.diyphotography.net/wp-content/uploads/2024/08/happy-dog-under-the-wedding-dress-2023-11-27-04-56-27-utc-scaled.jpg",
      title:
        "Here’s what it looks like to hire a dog as your wedding videographer",
    },
    {
      url: "https://www.mindbodygreen.com/articles/how-to-increase-your-pets-longevity-from-veterinarian-health",
      urlToImage:
        "https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_2000,h_1200,g_auto,fl_lossy,f_jpg/org/f90bpx31skue8fst2.jpg",
      title: "I'm A Veterinarian: These 6 Tips Can Help Your Pets Live Longer",
    },
    {
      url: "https://www.boredpanda.com/broke-up-with-bf-for-breeding/",
      urlToImage:
        "https://www.boredpanda.com/blog/wp-content/uploads/2024/08/broke-up-with-bf-for-breeding-fb.png",
      title:
        "Man Goes Behind Girlfriend’s Back And Secretly Gets Her Dog Pregnant So He Can Sell The Puppies",
    },
    {
      url: "http://twistedsifter.com/2024/08/her-neighbors-dog-wouldnt-stop-barking-so-she-refused-to-let-the-owner-sleep-until-she-did-something-about-it/",
      urlToImage:
        "https://twistedsifter.com/wp-content/uploads/2024/08/redditbarking.jpg",
      title:
        "Her Neighbor’s Dog Wouldn’t Stop Barking, So She Refused To Let The Owner Sleep Until She Did Something About It",
    },
    {
      url: "https://trendingger.com/2024/08/26/lily-allen-gets-a-mechanical-companion-from-peta-as-passport-chewing-dog-drama-heats-up/",
      urlToImage:
        "https://i0.wp.com/trendingger.com/wp-content/uploads/2024/08/lilyallen_peta.png?fit=1800%2C1000&ssl=1",
      title:
        "Lily Allen Gets Mechanical Companion From PETA After Passport Chewing Dog Drama",
    },
    {
      url: "https://www.themarthablog.com/2024/08/my-kittens-cinco-and-mayo.html",
      urlToImage: "",
      title: "My Kittens, Cinco and Mayo",
    },
    {
      url: "https://timesofindia.indiatimes.com/astrology/zodiacs-astrology/zodiac-signs-and-their-ideal-pets/articleshow/112806465.cms",
      urlToImage:
        "https://static.toiimg.com/thumb/msid-112806465,width-1070,height-580,imgsize-29652,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      title: "Zodiac Signs and their ideal pets",
    },
    {
      url: "https://meh.com/deals/12-pack-high-hopes-mity-meaty-turkey-bacon-bites",
      urlToImage:
        "http://d2b8wt72ktn9a2.cloudfront.net/mediocre/image/upload/c_pad,f_auto,h_600,q_auto,w_600/mxnxu2txj5feltow6rrr.png",
      title:
        "12-Pack: High Hopes Mity Meaty Turkey & Bacon Bites 12 for $19.99",
    },
    {
      url: "https://www.cbc.ca/news/canada/toronto/chinchillas-pandemic-pets-rescues-shelters-surrenders-1.7301952",
      urlToImage:
        "https://i.cbc.ca/1.7301961.1724437175!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/sean-adams-and-his-chinchilla.jpg",
      title:
        "'We just can't keep up': Rescue group say more chinchillas being surrendered than adopted",
    },
    {
      url: "https://lithub.com/beyond-saviors-and-suffering-on-the-complex-dynamics-of-animal-rescue/",
      urlToImage:
        "https://s26162.pcdn.co/wp-content/uploads/2024/08/dog-black-and-white.jpg",
      title:
        "Beyond Saviors and Suffering: On the Complex Dynamics of Animal Rescue",
    },
    {
      url: "https://www.globenewswire.com/news-release/2024/08/26/2935483/0/en/The-Vegan-Trend-and-Innovation-in-Product-Offerings-in-the-Plant-Based-Pet-Food-Market-will-Strengthen-the-Sales-Future-Market-Insights-Inc.html",
      urlToImage:
        "https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa",
      title:
        "The Vegan Trend and Innovation in Product Offerings in the Plant-Based Pet Food Market will Strengthen the Sales: Future Market Insights, Inc.",
    },
    {
      url: "https://www.etfdailynews.com/2024/08/26/chewy-nysechwy-shares-gap-up-to-26-33/",
      urlToImage:
        "https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/chewy-inc-logo-1200x675.png?v=20240306131142&w=240&h=240&zc=2",
      title: "Chewy (NYSE:CHWY) Shares Gap Up to $26.33",
    },
    {
      url: "https://www.etfdailynews.com/2024/08/26/chewy-nysechwy-earns-overweight-rating-from-analysts-at-piper-sandler/",
      urlToImage:
        "https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/chewy-inc-logo.png?v=20240306131142&w=240&h=240&zc=2",
      title:
        "Chewy (NYSE:CHWY) Earns Overweight Rating from Analysts at Piper Sandler",
    },
    {
      url: "https://www.etfdailynews.com/2024/08/26/chewy-nysechwy-coverage-initiated-at-piper-sandler/",
      urlToImga:
        "https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/chewy-inc-logo-1200x675.png?v=20240306131142&w=240&h=240&zc=2",
      title: "Chewy (NYSE:CHWY) Coverage Initiated at Piper Sandler",
    },
  ];

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
          dummyNews.map((article, index) => (
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
