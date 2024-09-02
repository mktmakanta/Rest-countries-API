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
      <NavLink to="/">Back</NavLink>
      <div>
        <div className="w-72">
          <img src={countryThis.flags.svg} alt={countryThis.name.common} />
        </div>
        <div>
          <h1>{countryThis.name.common}</h1>
          <div>
            <div>Native Name: {countryThis.name.nativeName?.eng?.common}</div>
            <div>Population: {countryThis.population}</div>
            <div>Region: {countryThis.region}</div>
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
