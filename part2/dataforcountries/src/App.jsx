import { useState, useEffect } from 'react'
import countryService from './services/countries'
import axios from 'axios'

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

const CountryInfo = ({country}) => {
  const [countryInfo, setCountryInfo] = useState(null)

  countryService
      .getCountryInfo(country.toLowerCase())
      .then(countryInfo => {
        setCountryInfo(countryInfo);
      })
      .catch(error => {
        console.log("Error fetching country info:", error);
      })

  if (!countryInfo) {
    return null
  }

  return(
    <>
      <h2>{countryInfo.name.common}</h2>
      <div>capital {countryInfo.capital} </div>
      <div>area {countryInfo.area} </div>
      <h3>languages:</h3>
      <ul>
        {Object.entries(countryInfo.languages).map(([key, language], index) => (
          <li key={`${index}${key}`}>{language}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.svg} alt="flag" width="300" height="200" />

    </>
  )
}

const CountryList = ({countries, filterName}) => {
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
				<div key={index}> {country} </div>
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

  return (
    <div>
      <CountrySearch searchValue={filterName} onSearchChange={handleSearchName}/>
      <CountryList countries={countryList} filterName={filterName}/>
    </div>
  )
}

export default App
