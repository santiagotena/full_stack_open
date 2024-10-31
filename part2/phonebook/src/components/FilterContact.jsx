import InputField from "./InputField"

const FilterContact = ({ filterValue, onFilterChange }) => {
  return (
    <form>
      <InputField label={'filter shown with'}
                  inputValue={filterValue}
                  onInputChange={onFilterChange}/>
    </form>
  )
}

export default FilterContact