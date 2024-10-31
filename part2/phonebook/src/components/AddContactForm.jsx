import InputField from "./InputField"

const AddContactForm = ({ onSubmit, 
                          nameValue, 
                          onNameChange, 
                          numberValue, 
                          onNumberChange }) => {
  return(
    <form onSubmit={onSubmit} >
      <InputField label={'name:'}
                  inputValue={nameValue}
                  onInputChange={onNameChange}/>
      <InputField label={'number:'}
                  inputValue={numberValue}
                  onInputChange={onNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddContactForm