const Contacts = ({ contacts, filterName, onDeleteContact }) => {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return(
    <>
      {filteredContacts.map(contact => (
				<div key={contact.id}>
					{contact.name} {contact.number} {" "}
					<button onClick={() => onDeleteContact(contact.id)}>delete</button>
				</div>
      ))}
    </>
  )
}

export default Contacts