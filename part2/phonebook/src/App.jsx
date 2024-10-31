import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import FilterContact from './components/FilterContact'
import AddContactForm from './components/AddContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialNotes => {
        setContacts(initialNotes)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '')  {
      window.alert(`Please fill in all fields`)
      return
    }

    if (contacts.some(contact => contact.name === newName)) {
      const message = `${newName} is already added to the phonebook, replace the old number with the new one?`
      if (window.confirm(message)) {
        const contact = contacts.find(n => n.name === newName)
        const id = contact.id
        const changedContact = { ...contact, number: newNumber }

        contactService
          .update(id, changedContact)
          .then(returnedContact => {
            setContacts(contacts.map(contact => contact.id === id ? returnedContact : contact))
          })
          .catch(error => {
            alert(
              `The contact '${contact.name}' was already deleted from server`
            )
            setContacts(contacts.filter(n => n.id !== id))
          })
          setNewName('')
          setNewNumber('')
        return
      }
    }
    
    const newContact = {
      name: newName,
      number: newNumber,
    }

    contactService
      .create(newContact)
      .then(returnedContact => {
        setContacts(contacts.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
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

  const handleDeleteContact = (id) => {
    const contact = contacts.find(n => n.id === id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id))
        })
    }
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
      <Contacts contacts={contacts} 
                filterName={filterName} 
                onDeleteContact={handleDeleteContact}/>
    </div>
  )
}

export default App