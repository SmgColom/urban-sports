import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { GET_PRODUCTS } from '@/graphql/products';

function renderApp() {
  const mocks = [
    { request: { query: GET_PRODUCTS }, result: { data: { products: [] } } },
  ];
  return render(
    <MockedProvider
      mocks={mocks}
      defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
    >
      <App />
    </MockedProvider>
  );
}

describe('App - layout y accesibilidad', () => {
  it('incluye un skip-link que apunta al contenido principal', () => {
    renderApp();
    const skip = screen.getByRole('link', { name: /saltar al contenido/i });
    expect(skip).toHaveAttribute('href', '#main');
  });

  it('tiene un unico encabezado principal (h1)', () => {
    renderApp();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/urban sports/i);
  });

  it('expone un landmark main', () => {
    renderApp();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('expone un landmark contentinfo (footer)', () => {
    renderApp();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
