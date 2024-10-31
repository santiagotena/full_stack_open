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

export default Contacts