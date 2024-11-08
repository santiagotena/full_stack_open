import CountryInfo from "./CountryInfo"

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
          {country}{" "}
          <button onClick={() => onShowCountry(country)}>show</button> 
        </div>
      ))}
    </>
  )
}

export default CountryList