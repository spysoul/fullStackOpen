import { useState, useEffect } from "react";
import { getAllCountries } from "./services/countries";

const CountryData = ({ country }) => {
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

const CountryLanguages = ({ languages }) => {
  return (
    <>
      <p>
        <strong>Languages:{languages.eng}</strong>
      </p>
      <ul>
        {Object.keys(languages).map((key, index) => {
          return <li key={index}>{languages[key]}</li>;
        })}
      </ul>
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState({});

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountryChange = (e) => {
    setSearchedCountry(e.target.value);
    let filteredCountries = countries.filter((c) => {
      return c.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredCountries(filteredCountries);
    setCountry({});

    if (filteredCountries.length == 1) setCountry(filteredCountries[0]);
  };

  return (
    <>
      <div>
        Find countries:{" "}
        <input value={searchedCountry} onChange={handleCountryChange} />
      </div>

      {filteredCountries &&
      filteredCountries.length > 1 &&
      filteredCountries.length <= 10 ? (
        <div>
          <p>
            <strong>Coincidences:</strong>
          </p>
          {filteredCountries.map((c) => {
            return <p key={c.cca2}>{c.name.common}</p>;
          })}
        </div>
      ) : filteredCountries.length > 1 ? (
        <p>Too many matches, specify another filter</p>
      ) : country && country.name ? (
        <CountryData country={country} />
      ) : null}
    </>
  );
}

export default App;
