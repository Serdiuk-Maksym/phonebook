import { combineReducers } from 'redux';
import contactsReducer from './contactSlice'; // Ваш contactsSlice

const rootReducer = combineReducers({
  contacts: contactsReducer,
  // Інші редуктори...
});

export default rootReducer;
