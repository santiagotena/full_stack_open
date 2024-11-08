import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountrySearch from './components/CountrySearch'
import CountryList from './components/CountryList'

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