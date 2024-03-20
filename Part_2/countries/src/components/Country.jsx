import { CountryLanguages } from "./CountryLanguages";
import { Weather } from "./Weather";

export const Country = ({ country }) => {
  return (
    <>
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
      <div>
        <Weather capital={country.capital} />
      </div>
    </>
  );
};
