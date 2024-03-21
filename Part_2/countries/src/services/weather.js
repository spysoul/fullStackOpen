import axios from "axios";

// APIKEY
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const getWeather = (capital) => {
  return axios.get(
    `${baseUrl}/${capital}?unitGroup=us&key=${api_key}&contentType=json`
  );
};
