import { useState, useEffect } from 'react'
import countryService from '../services/countries'
import weatherService from '../services/weather'

const CountryInfo = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    countryService
      .getCountryInfo(country)
      .then(countryInfo => {
        setCountryInfo(countryInfo)
      })
      .catch(error => {
        console.log("Error fetching country info:", error)
      })
  }, [country]);

  useEffect(() => {
    if (countryInfo) {
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

export default CountryInfo