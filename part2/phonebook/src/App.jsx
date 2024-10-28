import { useState } from 'react'

const Contacts = ({ contacts, searchName }) => {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchName.toLowerCase())
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
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '')  {
      window.alert(`There is a blank field`)
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

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact} >
        <div>
          filter shown with <input 
                  value={searchName}
                  onChange={handleSearchName}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addContact} >
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNewName}/>
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      </div>
      <Contacts contacts={contacts} searchName={searchName}/>
    </div>
  )
}

export default App