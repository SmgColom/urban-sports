/**
 * Filtra un listado de productos segun los criterios dados.
 * Funcion pura: mismas entradas -> misma salida, sin efectos secundarios.
 * Al no depender de React se puede testear de forma aislada.
 *
 * @param {Array} products - Listado completo de productos.
 * @param {object} filters
 * @param {string} filters.search   - Texto a buscar en el nombre.
 * @param {string} filters.category - Categoria exacta, o 'all' para todas.
 * @param {boolean} filters.inStockOnly - Si true, solo productos disponibles.
 * @returns {Array} Productos que cumplen todos los criterios.
 */
export function filterProducts(products, { search, category, inStockOnly }) {
  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    // Coincidencia por nombre (case-insensitive). Vacio = no filtra.
    const matchesSearch =
      normalizedSearch === '' ||
      product.name.toLowerCase().includes(normalizedSearch);

    // Categoria: 'all' no filtra; si no, comparacion exacta.
    const matchesCategory = category === 'all' || product.category === category;

    // Stock: si inStockOnly, exige inStock true.
    const matchesStock = !inStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });
}

/**
 * Extrae las categorias unicas de un listado, ordenadas alfabeticamente.
 * Sirve para poblar el selector de categorias sin duplicados.
 *
 * @param {Array} products
 * @returns {string[]}
 */
export function getCategories(products) {
  const unique = new Set(products.map((p) => p.category).filter(Boolean));
  return [...unique].sort((a, b) => a.localeCompare(b));
}
