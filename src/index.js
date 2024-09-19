import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create a root and render the App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);  // Use createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
