import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/apollo/client';
import App from '@/App';
import '@/styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ApolloProvider expone el cliente a toda la app via contexto */}
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
