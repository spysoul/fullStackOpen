import { useEffect, useState } from "react";
import { getWeather } from "../services/weather";

export const Weather = ({ capital }) => {
  const [countryData, setCountryData] = useState(null);
  useEffect(() => {
    // Get weather from api
    getWeather(capital)
      .then((response) => {
        console.log(response.data);
        setCountryData(response.data);
      })
      .catch((error) => alert(error.message));
  }, [capital]);

  return (
    <>
      {countryData !== null ? (
        <div>
          <h2>Weather in {capital}</h2>
          <p>
            Temperature:{" "}
            {(((countryData.currentConditions.temp - 32) * 5) / 9).toFixed(2)}{" "}
            °C{" "}
          </p>
          <p>Wind: {countryData.currentConditions.windspeed} m/s</p>
        </div>
      ) : null}
    </>
  );
};
