import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

export const getAllCountries = () => {
  return axios.get(baseUrl);
};
