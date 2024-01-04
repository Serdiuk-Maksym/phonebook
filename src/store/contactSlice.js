import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Api from '../services/api';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const fetchedContacts = await Api.fetchContacts();
      return fetchedContacts;
    } catch (error) {
      throw Error('Error fetching contacts:', error.message);
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async contactData => {
    try {
      const newContact = await Api.addNewContact(contactData);
      return newContact;
    } catch (error) {
      throw Error('Error adding contact:', error.message);
    }
  }
);

export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async contactId => {
    try {
      await Api.deleteContactById(contactId);
      return contactId;
    } catch (error) {
      throw Error('Error deleting contact:', error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    setContactsLoading(state, action) {
      state.contacts.isLoading = action.payload;
    },
    setContactsError(state, action) {
      state.contacts.error = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    addContact(state, action) {
      state.contacts.items.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.contacts.items.unshift(action.payload);
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const {
  setContacts,
  setContactsLoading,
  setContactsError,
  setFilter,
  addContact,
  deleteContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
