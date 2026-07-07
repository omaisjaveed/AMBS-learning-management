import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AccessKitProvider } from '@access-kit/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessKitProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AccessKitProvider>
  </StrictMode>,
);
