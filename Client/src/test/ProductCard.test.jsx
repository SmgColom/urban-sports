import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/ProductCard';

const baseProduct = {
  id: '1',
  name: 'Skate Deck',
  price: 89990,
  category: 'Skate',
  image: 'https://example.com/deck.jpg',
  inStock: true,
};

describe('ProductCard', () => {
  it('muestra nombre, categoria y precio formateado', () => {
    render(<ProductCard product={baseProduct} />);

    expect(screen.getByRole('heading', { name: /skate deck/i })).toBeInTheDocument();
    // La categoria "Skate" exacta (evita chocar con el titulo "Skate Deck").
    expect(screen.getByText('Skate')).toBeInTheDocument();
    // Precio formateado en COP (contiene separador de miles).
    expect(screen.getByText(/89\.990/)).toBeInTheDocument();
  });

  it('renderiza la imagen con alt igual al nombre del producto', () => {
    render(<ProductCard product={baseProduct} />);

    const img = screen.getByRole('img', { name: /skate deck/i });
    expect(img).toHaveAttribute('src', baseProduct.image);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('muestra un placeholder cuando no hay imagen', () => {
    render(<ProductCard product={{ ...baseProduct, image: null }} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/sin imagen/i)).toBeInTheDocument();
  });

  it('indica "Disponible" cuando hay stock', () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText(/disponible/i)).toBeInTheDocument();
  });

  it('indica "Agotado" cuando no hay stock', () => {
    render(<ProductCard product={{ ...baseProduct, inStock: false }} />);
    // Aparece el texto de stock y el badge, ambos "Agotado".
    expect(screen.getAllByText(/agotado/i).length).toBeGreaterThan(0);
  });
});
