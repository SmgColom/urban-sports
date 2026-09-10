import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { GET_PRODUCTS } from '@/graphql/products';

/**
 * MockedProvider intercepta las queries y devuelve respuestas simuladas,
 * asi probamos la UI sin backend real.
 */
function renderWithMocks(mocks) {
  return render(
    <MockedProvider
      mocks={mocks}
      // En test forzamos una sola ida a la "red" simulada, en vez del
      // cache-and-network global (que dispararia la query dos veces).
      defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
    >
      <App />
    </MockedProvider>
  );
}

// __typename incluido para que el cache normalice como en produccion.
const productsData = {
  products: [
    { __typename: 'Product', id: '1', name: 'Skate Deck', price: 89.99, category: 'Skate', image: null, inStock: true },
    { __typename: 'Product', id: '2', name: 'Urban Sneakers', price: 120, category: 'Calzado', image: null, inStock: false },
  ],
};

describe('App - estados de la query de productos', () => {
  it('muestra el estado de carga inicialmente', () => {
    const mocks = [{ request: { query: GET_PRODUCTS }, result: { data: productsData } }];
    renderWithMocks(mocks);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it('renderiza la lista de productos cuando la query responde con datos', async () => {
    const mocks = [{ request: { query: GET_PRODUCTS }, result: { data: productsData } }];
    renderWithMocks(mocks);

    // Matcher flexible: el texto se reparte en varios nodos (nombre + precio).
    expect(await screen.findByText(/skate deck/i)).toBeInTheDocument();
    expect(screen.getByText(/urban sneakers/i)).toBeInTheDocument();
  });

  it('muestra el estado vacio cuando no hay productos', async () => {
    const mocks = [{ request: { query: GET_PRODUCTS }, result: { data: { products: [] } } }];
    renderWithMocks(mocks);

    expect(await screen.findByText(/no hay productos disponibles/i)).toBeInTheDocument();
  });

  it('muestra el estado de error y permite reintentar', async () => {
    const mocks = [{ request: { query: GET_PRODUCTS }, error: new Error('fallo de red') }];
    renderWithMocks(mocks);

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /reintentar/i });
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toBeEnabled();
  });
});
