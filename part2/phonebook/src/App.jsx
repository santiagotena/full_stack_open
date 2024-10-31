import { useState, useEffect } from 'react'
import axios from 'axios'

const InputField = ({ label, inputValue, onInputChange }) => {
  return(
    <div>
      {label} <input 
                value={inputValue}
                onChange={onInputChange}/> 
    </div>
  )
}

const FilterContact = ({ filterValue, onFilterChange }) => {
  return (
    <form>
      <InputField label={'filter shown with'}
                  inputValue={filterValue}
                  onInputChange={onFilterChange}/>
    </form>
  )
}

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

const Contacts = ({ contacts, filterName }) => {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return(
    <>
      {filteredContacts.map(contact => (
        <div key={contact.id}>{contact.name} {contact.number}</div>
      ))}
    </>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '')  {
      window.alert(`Please fill in all fields`)
      return
    }

    if (contacts.some(contact => contact.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    const newContact = {
      id: String(contacts.length + 1),
      name: newName,
      number: newNumber,
    }
    setContacts(contacts.concat(newContact))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContact filterValue={filterName} onFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <AddContactForm onSubmit={addContact}
                      nameValue={newName}
                      onNameChange={handleNameChange}
                      numberValue={newNumber}
                      onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Contacts contacts={contacts} filterName={filterName}/>
    </div>
  )
}

export default App