import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SudokuProvider } from './context/SudokuContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SudokuProvider>
        <App />
      </SudokuProvider>
    </React.StrictMode>
);