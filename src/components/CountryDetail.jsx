import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

const CountryDetail = () => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id: countryTag } = useParams();

  const countryThis = countryData.find((c) => c.index === countryTag);

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
  if (error) return <div>Error: {error.message}</div>;

  console.log(countryThis);
  console.log(countryData);

  return (
    <div>
      <NavLink to="/">Back</NavLink>
      <div>
        <div className="w-72">
          <img src={countryThis.flags.svg} alt="" />
        </div>
        <div>
          <h1>{countryThis.name.common}</h1>
          <div>
            <div>
              <div>Native Name: {countryThis.name.nativeName.eng.common}</div>
              <div>Population: {countryThis.population}</div>
              <div>Region: {countryThis.region}</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryDetail;
