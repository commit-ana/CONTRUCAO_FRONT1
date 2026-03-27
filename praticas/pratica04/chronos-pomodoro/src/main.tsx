import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import { App } from './App';
import './styles/globals.css'

console.log('Olá mundo!')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);