import { useState } from 'react'

const Contact = ({name}) => {
  return(
    <div>{name}</div>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (newName === '')  {
      window.alert(`There is a blank field`)
      setNewName('')
      return
    }

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name === newName)  {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        return
      }
    }

    const newContact = {
      id: String(contacts.length + 1),
      name: newName,
    }

    setContacts(contacts.concat(newContact))
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      </div>
      {contacts.map(contact =>
        <Contact key={contact.id} name={contact.name} />
      )}
    </div>
  )
}

export default App