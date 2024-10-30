import { useState } from 'react'

const InputField = ({inputName, value, onChange}) => {
  return(
    <div>
      {inputName} <input 
                value={value}
                onChange={onChange}/> 
    </div>
  )
}

const FilterContact = ({value, onChange}) => {
  return (
    <form>
      <InputField inputName={'filter shown with'}
                  value={value}
                  onChange={onChange}/>
    </form>
  )
}

const AddContactForm = ({onSubmit, 
                        nameValue, 
                        nameOnChange, 
                        numberValue, 
                        numberOnChange}) => {
  return(
    <form onSubmit={onSubmit} >
      <InputField inputName={'name'}
                  value={nameValue}
                  onChange={nameOnChange}/>
      <InputField inputName={'number'}
                  value={numberValue}
                  onChange={numberOnChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

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

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
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
      <FilterContact value={searchName} onChange={handleSearchName}/>
      <h3>add a new</h3>
      <AddContactForm onSubmit={addContact}
                      nameValue={newName}
                      nameOnChange={handleNewName}
                      numberValue={newNumber}
                      numberOnChange={handleNewNumber} />
      <h3>Numbers</h3>
      <Contacts contacts={contacts} searchName={searchName}/>
    </div>
  )
}

export default App