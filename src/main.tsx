import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Styl bazowy musi wejść przed arkuszami komponentów, żeby mogły go nadpisywać.
import './styles/base.css';
import App from './App';
import { LanguageProvider } from './i18n/language';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
