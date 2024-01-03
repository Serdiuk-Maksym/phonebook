import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import {
  setFilter,
  fetchContacts,
  addNewContact,
  deleteContactById,
} from '../store/contactSlice';
import { AppSection, TitleOne } from './APP.styled';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts()); // Fetch contacts from backend on initial load
  }, [dispatch]);

  const inputChangeValue = value => {
    dispatch(setFilter(value));
  };

  const formSubmitSearchHandler = data => {
    const searchResult = contacts.find(contact => contact.name === data.name);
    if (!searchResult) {
      dispatch(addNewContact(data)); // Add new contact via async action
    } else {
      alert(`${data.name} is already in contacts`);
    }
  };

  const deleteItem = contactId => {
    dispatch(deleteContactById(contactId)); // Delete contact via async action
  };

  return (
    <AppSection>
      <TitleOne>PhoneBook</TitleOne>
      <ContactForm onSubmitHandler={formSubmitSearchHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={inputChangeValue} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteItem={deleteItem}
      />
    </AppSection>
  );
};
