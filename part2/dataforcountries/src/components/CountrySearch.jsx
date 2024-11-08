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

export default CountrySearch