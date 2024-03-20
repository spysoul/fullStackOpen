import { CountryLanguages } from "./CountryLanguages";

export const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area:{country.area} </p>
      <br />
      <CountryLanguages languages={country.languages} />
      <img
        style={{ maxWidth: 200, border: "solid" }}
        src={country.flags.svg}
        alt="country flag"
      />
    </div>
  );
};
