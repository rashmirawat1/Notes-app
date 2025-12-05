// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Optional: basic global styles reset (you can skip or customize)
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);