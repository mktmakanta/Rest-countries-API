import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

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
    <div>
      <div className="px-4 py-2 font-bold rounded-md border border-black inline-block m-4">
        <NavLink to="/">Back</NavLink>
      </div>
      <div className="px-5 py-8">
        <div className="w-72">
          <img src={countryThis.flags.svg} alt={countryThis.name.common} />
        </div>
        <div className="py-8">
          <h1 className="font-bold text-2xl mb-4">{countryThis.name.common}</h1>
          <div>
            <div>
              <span className="font-bold">Native Name: </span>
              {countryThis.name.nativeName?.eng?.common}
            </div>
            <div>
              {" "}
              <span className="font-bold">Population: </span>
              {countryThis.population}
            </div>
            <div>
              {" "}
              <span className="font-bold">Region:</span>
              {countryThis.region}
            </div>
            {countryThis.borders && countryThis.borders.length > 0 ? (
              <div className="flex gap-7">
                {countryThis.borders.map((border, index) => (
                  <NavLink to={`/countrydetail/${border}`} key={index}>
                    {border}
                  </NavLink>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
