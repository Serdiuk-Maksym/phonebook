import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // Додаткові параметри конфігурації, якщо потрібно
});

export default store;
