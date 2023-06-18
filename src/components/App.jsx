import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './ContactList/Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KEY_STORAGE_CONTACTS = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => getStorageContacts() || []);
  const [filter, setFilter] = useState('');

  function getStorageContacts() {
    return JSON.parse(localStorage.getItem(KEY_STORAGE_CONTACTS));
  }

  useEffect(() => {
    localStorage.setItem(KEY_STORAGE_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = newContact => {
    const { name, number } = newContact;
    if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
      return toast.info(`${name} is already in contacts.`);
    } else if (
      contacts.find(el => el.number.toLowerCase() === number.toLowerCase())
    ) {
      return toast.info(`${number} is already in contacts.`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitForm} contacts={contacts} />
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={changeFilter} />
          <ContactList
            contacts={filteredContacts()}
            removeContact={removeContact}
          />
          <ToastContainer />
        </>
      )}
    </section>
  );
}

