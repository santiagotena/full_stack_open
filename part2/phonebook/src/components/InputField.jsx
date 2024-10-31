const InputField = ({ label, inputValue, onInputChange }) => {
  return(
    <div>
      {label} <input 
                value={inputValue}
                onChange={onInputChange}/> 
    </div>
  )
}

export default InputField