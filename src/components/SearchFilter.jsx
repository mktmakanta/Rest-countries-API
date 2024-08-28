import React, { useEffect } from "react";
import { useState } from "react";

export default function SearchFilter() {
  const [countryName, setCountryName] = useState("");
  const [regional, setRegional] = useState("All");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   fetching data
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(" https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("fail to fetch data");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const filteredCountries = result.filter((item) => {
    const matchesCountry = item.name.common
      .toLowerCase()
      .includes(countryName.toLowerCase());

    const matchesRegion =
      regional === "All" ||
      item.region.toLowerCase() === regional.toLowerCase();

    return matchesCountry && matchesRegion;
  });

  return (
    <>
      <div>
        <input
          type="text"
          value={countryName}
          placeholder="what is your country name ?"
          onChange={handleChange}
        />

        <select
          value={regional}
          onChange={(e) => {
            setRegional(e.target.value);
          }}
          id=""
        >
          <option value="All">All</option>
          <option value="asia">Asia</option>
          <option value="africa">Africa</option>
        </select>

        <div className="countries">
          {filteredCountries.map((country, index) => (
            <div key={index} className="m-6">
              <img
                src={country.flags.svg}
                alt="country flags"
                className=" w-48"
              />
              <h1> {country.name.common}</h1>
              <h3>Population: {country.population}</h3>
              <h3>Region: {country.region}</h3>
              <h3>Capital: {country.capital}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
