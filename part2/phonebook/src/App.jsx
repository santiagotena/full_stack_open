import { useState } from 'react'

const Contact = ({contact}) => {
  return(
    <div>{contact.name} {contact.number}</div>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 0, name: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '')  {
      window.alert(`There is a blank field`)
      return
    }

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name === newName)  {
        window.alert(`${newName} is already added to phonebook`)
        return
      }
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {contacts.map(contact =>
        <Contact key={contact.id} contact={contact} />
      )}
    </div>
  )
}

export default App