import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { FAVICON_URL } from './components/ui/Logos';

// Replace favicon URL in index.html
document.querySelector('link[rel="icon"]')?.setAttribute('href', FAVICON_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
);
