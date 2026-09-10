import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { GET_PRODUCTS } from '@/graphql/products';

const productsData = {
  products: [
    { __typename: 'Product', id: '1', name: 'Skate Deck', price: 89990, category: 'Skate', image: null, inStock: true },
    { __typename: 'Product', id: '2', name: 'Urban Sneakers', price: 120000, category: 'Calzado', image: null, inStock: false },
    { __typename: 'Product', id: '3', name: 'Skate Wheels', price: 45000, category: 'Skate', image: null, inStock: false },
  ],
};

function renderApp() {
  const mocks = [{ request: { query: GET_PRODUCTS }, result: { data: productsData } }];
  return render(
    <MockedProvider
      mocks={mocks}
      defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
    >
      <App />
    </MockedProvider>
  );
}

describe('App - filtros (integracion)', () => {
  it('filtra por texto de busqueda al escribir', async () => {
    const user = userEvent.setup();
    renderApp();

    // Espera a que carguen los 3 productos.
    expect(await screen.findByRole('heading', { name: 'Skate Deck' })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/buscar/i), 'sneakers');

    expect(screen.getByRole('heading', { name: 'Urban Sneakers' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Skate Deck' })).not.toBeInTheDocument();
  });

  it('filtra por categoria seleccionada', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByRole('heading', { name: 'Skate Deck' });

    await user.selectOptions(screen.getByLabelText(/categoria/i), 'Calzado');

    expect(screen.getByRole('heading', { name: 'Urban Sneakers' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Skate Deck' })).not.toBeInTheDocument();
  });

  it('filtra solo disponibles con el checkbox', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByRole('heading', { name: 'Skate Deck' });

    await user.click(screen.getByLabelText(/solo disponibles/i));

    // Solo Skate Deck esta en stock.
    expect(screen.getByRole('heading', { name: 'Skate Deck' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Urban Sneakers' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Skate Wheels' })).not.toBeInTheDocument();
  });

  it('muestra mensaje cuando ningun producto coincide', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByRole('heading', { name: 'Skate Deck' });

    await user.type(screen.getByLabelText(/buscar/i), 'zzz');

    expect(screen.getByText(/ningun producto coincide/i)).toBeInTheDocument();
  });

  it('el boton limpiar restaura todos los productos', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByRole('heading', { name: 'Skate Deck' });

    await user.type(screen.getByLabelText(/buscar/i), 'sneakers');
    expect(screen.queryByRole('heading', { name: 'Skate Deck' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /limpiar/i }));

    expect(screen.getByRole('heading', { name: 'Skate Deck' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Urban Sneakers' })).toBeInTheDocument();
  });

  it('actualiza el recuento de resultados', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByRole('heading', { name: 'Skate Deck' });

    expect(screen.getByText(/3 resultados/i)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/categoria/i), 'Skate');
    expect(screen.getByText(/2 resultados/i)).toBeInTheDocument();
  });
});
