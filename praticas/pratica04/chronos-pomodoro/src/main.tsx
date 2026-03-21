import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import { App } from './App';

console.log('Olá mundo!')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);