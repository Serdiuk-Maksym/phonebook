import { createSlice } from '@reduxjs/toolkit';
import * as Api from '../services/api';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    addContact(state, action) {
      state.contacts.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { setContacts, setFilter, addContact, deleteContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;

export const fetchContacts = () => async dispatch => {
  try {
    const fetchedContacts = await Api.fetchContacts();
    dispatch(setContacts(fetchedContacts));
  } catch (error) {
    // Handle error fetching contacts
    console.error('Error fetching contacts:', error.message);
  }
};

export const addNewContact = contactData => async dispatch => {
  try {
    const newContact = await Api.addNewContact(contactData);
    dispatch(addContact(newContact));
  } catch (error) {
    // Handle error adding contact
    console.error('Error adding contact:', error.message);
  }
};

export const deleteContactById = contactId => async dispatch => {
  try {
    await Api.deleteContactById(contactId);
    dispatch(deleteContact(contactId));
  } catch (error) {
    // Handle error deleting contact
    console.error('Error deleting contact:', error.message);
  }
};
