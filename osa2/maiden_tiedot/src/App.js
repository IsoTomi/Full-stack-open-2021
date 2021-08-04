import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Filter-component
const Filter = ({filter, filterHandler}) => {
  return (
    <div>
      Find countries: <input value={filter} onChange={filterHandler} />
    </div> 
  );
}

// CountryDetails-component
const CountryDetails = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY;

  // Hooks
  const [ weather, setWeather ] = useState([]);
  const [ ready, setReady ] = useState(false);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data);
        setReady(true);
      })
  }, []);

  return (
    <div>
      <h1>{country.name}</h1>
      <img src = {country.flag} alt="Country flag" width="150"/>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <h2>Spoken languages</h2>
      {country.languages.map(language => <li>{language.name}</li>)}
      <h2>Weather in {country.capital}</h2>
      {
        // Has the page been loaded?
        ready === true ?
          // Yes
          <div>  
          <p><strong>Temperature:</strong> {weather.current.temperature} Celcius</p>
          <img src={weather.current.weather_icons[0]} alt={weather.current.weather_icons.weather_descriptions} />
          <p><strong>Wind:</strong> {weather.current.wind_speed} mph. <strong>Direction:</strong> {weather.current.wind_dir}</p>
          </div>
        :
          // No
          ""
      }
    </div>
  );
}

// App-component
const App = () => {
  // Hooks
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  // Event handlers
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  // Other
  const regex = new RegExp(filter, 'i');
  const filteredCountries = countries.filter(country => country.name.match(regex));

  return (
    <div>
      <Filter filter={filter} filterHandler={handleFilterChange} />
      <ul style={{listStyleType: "none", padding: "0px"}}>
        {
          // Is there more than 10 results?
          filteredCountries.length > 10 ?
          // Yes
          <p>Too many matches, specify another filter</p> :
          // No
            // Is there more than one result?
            filteredCountries.length !== 1 ?
              // Yes
              filteredCountries.map(country =>
                <li>{country.name} <button onClick={() => setFilter(country.name) }>Show</button></li>) :
              // No
              <CountryDetails country={filteredCountries[0]} />
        }
      </ul>
    </div>
  );
}
  
export default App