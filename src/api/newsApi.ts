import axios from "axios";
const apiKey = process.env.NEWS_APIKEY;

export const getNews = async () => {
  try {
    const response = await axios.get(
      //can't use apikey from .env
      `https://newsapi.org/v2/everything?q=pet AND dogs&q=pet AND cats&pageSize=6&apiKey=beb5b2cc41034b718e22d2c71b8a7ad2`
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
