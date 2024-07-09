const API_KEY = process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY;
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const getWeatherData = async (location: string) => {
  const response = await fetch(`${BASE_URL}${location}?unitGroup=metric&iconSet=icons1&key=${API_KEY}&contentType=json`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};
