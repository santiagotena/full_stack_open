import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import FilterContact from './components/FilterContact'
import AddContactForm from './components/AddContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialNotes => {
        setContacts(initialNotes)
      })
  }, [])

  const resetInputFields = () => {
    setNewName('')
    setNewNumber('')
  }

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
            setNotificationMessage(
              `Updated ${contact.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)
          })
          .catch(error => {
            setContacts(contacts.filter(n => n.id !== id))
            setErrorMessage(
              `The contact '${contact.name}' has already been deleted from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          })
      }
      resetInputFields()
      return
    }
    
    const newContact = {
      name: newName,
      number: newNumber,
    }

    contactService
      .create(newContact)
      .then(returnedContact => {
        setContacts(contacts.concat(returnedContact))
        setNotificationMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)
      })

    resetInputFields()
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
          setNotificationMessage(
            `Deleted ${contact.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
        .catch(error => {
          setContacts(contacts.filter(n => n.id !== id))
          setErrorMessage(
            `The contact '${contact.name}' has already been deleted from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          return
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
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