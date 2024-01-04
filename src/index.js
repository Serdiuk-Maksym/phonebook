import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { App } from 'components/App';
import customStore from './store/customStore';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={customStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
