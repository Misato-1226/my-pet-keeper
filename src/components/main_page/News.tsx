import Image from "next/image";
import Link from "next/link";

const fakeNews = [
  {
    title: "fakeNews1",
    image_path: "/http....",
    link: "/http//...",
  },
  {
    title: "fakeNews2",
    image_path: "/http....",
    link: "http//...",
  },
  {
    title: "fakeNews3",
    image_path: "/http....",
    link: "http//...",
  },
  {
    title: "fakeNews4",
    image_path: "/http....",
    link: "http//...",
  },
];

export default function News() {
  return (
    <div className="grid grid-cols-4 gap-6 p-3">
      {fakeNews.map((news, index) => (
        <Link key={index} href={news.link}>
          <div>
            <Image
              className="rounded-t-lg w-full"
              src={news.image_path}
              width={200}
              height={100}
              alt="recipe image"
            />
          </div>
          <h2>{news.title}</h2>
        </Link>
      ))}
    </div>
  );
}

{
  /* <div className='grid grid-cols-4 gap-6 p-3'>
{recipe?.Recipes.map((recipeItem) => (
<RecipeItem key={recipeItem.id} recipeItem={recipeItem} />
))}
</div> */
}
