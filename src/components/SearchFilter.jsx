import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import HeadTheme from "./HeadTheme";
// import { FaMagnifyingGlass } from "react-icons/fa";

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
      <HeadTheme />
      <div className="bg-yellow-50/40">
        <div className=" flex flex-col gap-10 p-4">
          <div>
            <input
              className="p-3 bg-white placeholder:text-black w-full shadow-md rounded-md focus:outline-gray-300"
              type="text"
              value={countryName}
              placeholder="Search for a country..."
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 w-1/2">
            <select
              placeholder="filter"
              id="regionFilter"
              value={regional}
              onChange={(e) => {
                setRegional(e.target.value);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>

        <div className="countries ">
          {filteredCountries.map((country, index) => (
            <div className="  w-72 mx-auto bg-white m-6 rounded-lg shadow-lg">
              <NavLink to={`/countrydetail/${country.cca3}`} key={index}>
                <div className="rounded-t-lg ">
                  <img
                    src={country.flags.svg}
                    alt="country flags"
                    className=" w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="p-5 py-8 text-lg">
                  <h1 className="my-4 text-2xl font-bold">
                    {" "}
                    {country.name.common}
                  </h1>
                  <h3>
                    <span className="font-bold">Population: </span>
                    {country.population}
                  </h3>
                  <h3>
                    <span className="font-bold">Region: </span>
                    {country.region}
                  </h3>
                  <h3>
                    {" "}
                    <span className="font-bold">Capital: </span>
                    {country.capital}
                  </h3>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
