import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const today = new Date();

const getToday = () => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

const getTwoDaysBefore = () => {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 2);

  const yearYesterday = yesterday.getFullYear();
  const monthYesterday = yesterday.getMonth() + 1;
  const dayYesterday = yesterday.getDate();

  return `${yearYesterday}-${monthYesterday
    .toString()
    .padStart(2, "0")}-${dayYesterday.toString().padStart(2, "0")}`;
};

export const getNews = async () => {
  try {
    const response = await axios.get(
      //can't use apikey from .env
      `https://newsapi.org/v2/everything?q=pets AND dogs&q=pets AND cats&from=${getTwoDaysBefore()}&to=${getToday()}&pageSize=15&apiKey=${apiKey}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
