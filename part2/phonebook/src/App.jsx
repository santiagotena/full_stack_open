import { useState, useEffect } from 'react'
import axios from 'axios'

import FilterContact from './components/FilterContact'
import AddContactForm from './components/AddContactForm'
import Contacts from './components/Contacts'

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