import React from 'react';
import PropTypes from 'prop-types';
import { Contact } from 'components/Contact/Contact';

export function ContactList({ contacts, filter, onDeleteItem }) {
  const calculateFilteredContacts = (contacts, filter) => {
    const normalizedFilter = filter ? filter.toLowerCase() : ''; // Перевірка на пусте значення або undefined
    return contacts.filter(
      contact =>
        typeof contact.name === 'string' &&
        contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts =
    contacts && filter ? calculateFilteredContacts(contacts, filter) : [];

  return visibleContacts.map(contact => (
    <Contact
      key={contact.id}
      contact={contact}
      onDeleteItem={() => onDeleteItem(contact.id)}
    />
  ));
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired),
  filter: PropTypes.string,
  onDeleteItem: PropTypes.func,
};

export default ContactList;
