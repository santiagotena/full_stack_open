import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const CountrySearch = ({searchValue, onSearchChange}) => {
  return(
    <form>
      <div>
        find countries <input 
                        value={searchValue}
                        onChange={onSearchChange}/>
      </div>
    </form>
  )
}

const CountryInfo = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    countryService
      .getCountryInfo(country)
      .then(countryInfo => {
        setCountryInfo(countryInfo);
      })
      .catch(error => {
        console.log("Error fetching country info:", error)
      });
  }, [country]);

  useEffect(() => {
    if (countryInfo?.capital?.[0]) {
      weatherService
        .getCoordinates(countryInfo.capital[0])
        .then(capitalCoordinates => {
          return weatherService.getWeather(capitalCoordinates[0].lat, capitalCoordinates[0].lon)
        })
        .then(capitalWeather => {
          const icon = capitalWeather.weather[0].icon
          const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
          setIconUrl(url)
          setCapitalWeather(capitalWeather)
        })
        .catch(error => {
          console.log("Error fetching weather info:", error)
        })
    }
  }, [countryInfo])

  if (!countryInfo || !capitalWeather || !iconUrl) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h2>{countryInfo.name.common}</h2>
      <div>capital {countryInfo.capital} </div>
      <div>area {countryInfo.area} </div>
      <h4>languages:</h4>
      <ul>
        {Object.entries(countryInfo.languages).map(([key, language], index) => (
          <li key={`${index}${key}`}>{language}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.svg} alt="flag" width="300" height="200" />
      <h3>Weather in {countryInfo.capital}</h3>
      <div>temperature {capitalWeather.main.temp} Celsius</div>
      <img src={iconUrl} alt="weather-icon" width="100" height="100" />
      <div>wind {capitalWeather.wind.speed} m/s</div>
    </>
  )
}

const CountryList = ({countries, filterName, onShowCountry}) => {
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(filterName.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }

  if (filteredCountries.length === 1) {
    return(
      <CountryInfo country={filteredCountries[0]} />
    )
  }

  return(
    <>
      {filteredCountries.map((country, index) => (
				<div key={index}>
          {country} 
          <button onClick={() => onShowCountry(country)}>show</button> 
        </div>
      ))}
    </>
  )
}

function App() {
  const [countryList, setCountryList] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        const nameList = countries.map(country => country.name.common)
        setCountryList(nameList)
      })
  }, [])

  if (!countryList) { 
    return null 
  }

  const handleSearchName = (event) => {
    setFilterName(event.target.value)
  }

  const handleShowCountry = (country) => {
    const name = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
    setFilterName(name)
  }

  return (
    <div>
      <CountrySearch  searchValue={filterName} 
                      onSearchChange={handleSearchName}/>
      <CountryList  countries={countryList}  
                    filterName={filterName}
                    onShowCountry={handleShowCountry}/>
    </div>
  )
}

export default App
