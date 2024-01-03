const BASE_URL = 'https://6592e81dbb1297071990358f.mockapi.io';

export const fetchContacts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addNewContact = async contact => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContactById = async contactId => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
