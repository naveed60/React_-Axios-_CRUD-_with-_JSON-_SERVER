import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const editContactHandler = (id) => {
    const selected = contacts.find((contact) => contact.id === id);
    setSelectedContact(selected);
  };

  const updateContactHandler = (id, updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...updatedContact } : contact
    );

    setContacts(updatedContacts);
    setSelectedContact(null);
  };

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact
        addContactHandler={addContactHandler}
        editContactHandler={updateContactHandler}
        contactToEdit={selectedContact}
      />
      <ContactList
        contacts={contacts}
        getContactId={removeContactHandler}
        editContactHandler={editContactHandler}
      />
    </div>
  );
}

export default App;
