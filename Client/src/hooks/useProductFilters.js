import { useMemo, useState } from 'react';
import { filterProducts, getCategories } from '@/utils/filterProducts';

const INITIAL_FILTERS = {
  search: '',
  category: 'all',
  inStockOnly: false,
};

/**
 * Gestiona el estado de los filtros y deriva el listado filtrado.
 *
 * Buenas practicas:
 * - useMemo evita recalcular el filtrado en cada render; solo se
 *   recomputa si cambian los productos o los filtros.
 * - El filtrado es en cliente sobre datos ya cargados: no dispara
 *   nuevas peticiones al backend por cada tecla.
 * - Expone un setter por campo y un reset, con API clara.
 *
 * @param {Array} products - Listado completo (de useProducts).
 */
export function useProductFilters(products) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const categories = useMemo(() => getCategories(products), [products]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const setSearch = (search) => setFilters((f) => ({ ...f, search }));
  const setCategory = (category) => setFilters((f) => ({ ...f, category }));
  const setInStockOnly = (inStockOnly) =>
    setFilters((f) => ({ ...f, inStockOnly }));
  const resetFilters = () => setFilters(INITIAL_FILTERS);

  return {
    filters,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
    setInStockOnly,
    resetFilters,
  };
}
