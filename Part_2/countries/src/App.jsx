import { useState, useEffect } from "react";
import { getAllCountries } from "./services/countries";
import { Countries } from "./components/Countries.jsx";
import { Country } from "./components/Country.jsx";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState({});

  // Get all countries from APi
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
    // setCountry({});

    if (filteredCountries.length == 1) setCountry(filteredCountries[0]);
  };

  const handleShowClick = (countryName) => {
    let countryToShow = countries.filter((c) => {
      return c.name.common == countryName;
    });

    setCountry(countryToShow[0]);
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
          <Countries
            filteredCountries={filteredCountries}
            handleShowClick={handleShowClick}
          />
        </div>
      ) : filteredCountries.length > 1 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        ""
      )}

      {country && country.name ? <Country country={country} /> : null}
    </>
  );
}

export default App;
