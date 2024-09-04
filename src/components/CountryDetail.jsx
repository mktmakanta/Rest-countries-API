import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import HeadTheme from "./HeadTheme";

const CountryDetail = () => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryTag } = useParams();

  const countryThis = countryData.find((c) => c.cca3 === countryTag);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCountryData(data);
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
  if (error) return <div>Error: {error}</div>;

  if (!countryThis) return <div>Country not found</div>;

  console.log(countryThis);
  return (
    <>
      <div className="dark:bg-slate-900 lg:px-20 ">
        <div className="px-4 py-2 font-bold rounded-md border dark:border-white dark:text-white border-black inline-block m-4">
          <NavLink to="/" className="flex items-center gap-2">
            <FaArrowLeft />
            Back
          </NavLink>
        </div>
        <div className="px-5 py-8 bg-yellow-50/40 dark:bg-slate-900  dark:text-white lg:flex min-h-screen md:px-32 lg:px-0">
          <div className="w-72 mx-auto lg:w-1/2 md:mx-0 shadow-md h-fit">
            <img
              className="w-full h-full"
              src={countryThis.flags.svg}
              alt={countryThis.name.common}
            />
          </div>
          <div className="py-8 text-lg lg:ml-28 ">
            <h1 className="font-bold text-2xl mb-4">
              {countryThis.name.common}
            </h1>
            <div className="details">
              <div className="lg:flex  gap-32 lg:font-light">
                <div className="my-5 lg:space-y-3 ">
                  <div>
                    <span className="font-bold lg:font-semibold">
                      Native Name:{" "}
                    </span>
                    {countryThis.name.nativeName
                      ? Object.values(countryThis.name.nativeName)[0]?.common ||
                        ""
                      : ""}
                  </div>
                  <div>
                    {" "}
                    <span className="font-bold lg:font-semibold">
                      Population:{" "}
                    </span>
                    {countryThis.population.toLocaleString()}
                  </div>
                  <div>
                    {" "}
                    <span className="font-bold lg:font-semibold">Region: </span>
                    {countryThis.region}
                  </div>
                  {countryThis.subregion && (
                    <div>
                      <span className="font-bold lg:font-semibold">
                        {" "}
                        Sub Region:{" "}
                      </span>
                      {countryThis.subregion}
                    </div>
                  )}
                  <div>
                    {" "}
                    <span className="font-bold lg:font-semibold">
                      Capital:{" "}
                    </span>
                    {countryThis.capital}
                  </div>
                </div>

                <div className="my-5 lg:space-y-3 ">
                  <div>
                    {" "}
                    <span className="font-bold lg:font-semibold">
                      Top Level Domain:{" "}
                    </span>
                    {countryThis.tld.join(", ")}
                  </div>
                  <div>
                    {" "}
                    <span className="font-bold lg:font-semibold">
                      Currencies:{" "}
                    </span>
                    {Object.values(countryThis.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold lg:font-semibold ">
                      Languages:{" "}
                    </span>
                    {countryThis.languages ? (
                      <span>
                        {Object.values(countryThis.languages).join(", ")}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>

              <div className="borders">
                <div className="font-bold text-lg mt-8">Border Countries:</div>
                {countryThis.borders && countryThis.borders.length > 0 ? (
                  <div className="flex gap-3 my-4 flex-wrap">
                    {countryThis.borders.map((border, index) => {
                      const borderCountry = countryData.find(
                        (b) => b.cca3 === border
                      );
                      return (
                        <NavLink
                          to={`/countrydetail/${border}`}
                          key={index}
                          className="px-4 py-1  rounded-sm shadow-md font-normal text-base bg-white dark:bg-slate-800/80 dark:text-white"
                        >
                          {borderCountry ? borderCountry.name.common : border}
                        </NavLink>
                      );
                    })}
                  </div>
                ) : (
                  "No border countries"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetail;
