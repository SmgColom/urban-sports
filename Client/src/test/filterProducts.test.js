import { describe, it, expect } from 'vitest';
import { filterProducts, getCategories } from '@/utils/filterProducts';

const products = [
  { id: '1', name: 'Skate Deck', category: 'Skate', inStock: true },
  { id: '2', name: 'Urban Sneakers', category: 'Calzado', inStock: false },
  { id: '3', name: 'Grip Tape', category: 'Accesorios', inStock: true },
  { id: '4', name: 'Skate Wheels', category: 'Skate', inStock: false },
];

const noFilters = { search: '', category: 'all', inStockOnly: false };

describe('filterProducts', () => {
  it('sin filtros devuelve todos los productos', () => {
    expect(filterProducts(products, noFilters)).toHaveLength(4);
  });

  it('filtra por texto en el nombre (case-insensitive)', () => {
    const result = filterProducts(products, { ...noFilters, search: 'skate' });
    expect(result.map((p) => p.id)).toEqual(['1', '4']);
  });

  it('ignora espacios alrededor del texto de busqueda', () => {
    const result = filterProducts(products, { ...noFilters, search: '  grip  ' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Grip Tape');
  });

  it('filtra por categoria exacta', () => {
    const result = filterProducts(products, { ...noFilters, category: 'Skate' });
    expect(result).toHaveLength(2);
  });

  it('filtra solo disponibles', () => {
    const result = filterProducts(products, { ...noFilters, inStockOnly: true });
    expect(result.map((p) => p.id)).toEqual(['1', '3']);
  });

  it('combina varios criterios a la vez', () => {
    const result = filterProducts(products, {
      search: 'skate',
      category: 'Skate',
      inStockOnly: true,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('devuelve vacio cuando nada coincide', () => {
    const result = filterProducts(products, { ...noFilters, search: 'inexistente' });
    expect(result).toEqual([]);
  });
});

describe('getCategories', () => {
  it('devuelve categorias unicas ordenadas alfabeticamente', () => {
    expect(getCategories(products)).toEqual(['Accesorios', 'Calzado', 'Skate']);
  });

  it('devuelve vacio para lista vacia', () => {
    expect(getCategories([])).toEqual([]);
  });
});
