import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductList from '@/components/ProductList';

const products = [
  { id: '1', name: 'Skate Deck', price: 89990, category: 'Skate', image: null, inStock: true },
  { id: '2', name: 'Urban Sneakers', price: 120000, category: 'Calzado', image: null, inStock: false },
  { id: '3', name: 'Grip Tape', price: 15000, category: 'Accesorios', image: null, inStock: true },
];

describe('ProductList', () => {
  it('renderiza una tarjeta por cada producto', () => {
    render(<ProductList products={products} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(products.length);
  });

  it('expone la lista con un aria-label accesible', () => {
    render(<ProductList products={products} />);
    expect(screen.getByRole('list', { name: /listado de productos/i })).toBeInTheDocument();
  });

  it('muestra los nombres de todos los productos', () => {
    render(<ProductList products={products} />);

    products.forEach((p) => {
      expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument();
    });
  });
});
