import axios from "axios";

// APIKEY
// const api_key = "9WQCPNN5TRJT9U6A6NR8TMFT8";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;
// variable api_key ahora tiene el valor configurado

// https://www.visualcrossing.com/weather/weather-data-services/Madrid?v=api
//Madrid?unitGroup=us&include=current&key=9WQCPNN5TRJT9U6A6NR8TMFT8&contentType=json
const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const getWeather = (capital) => {
  return axios.get(
    `${baseUrl}/${capital}?unitGroup=us&key=${api_key}&contentType=json`
  );
};
