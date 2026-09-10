import PropTypes from 'prop-types';

/**
 * Barra de filtros del catalogo.
 *
 * Buenas practicas de accesibilidad:
 * - Cada control tiene un <label> asociado por htmlFor/id.
 * - <input type="search"> semantico para el buscador.
 * - El bloque es un <search> landmark (rol de busqueda).
 */
export default function ProductFilters({
  filters,
  categories,
  onSearchChange,
  onCategoryChange,
  onInStockChange,
  onReset,
  resultCount,
}) {
  return (
    <div className="filters" role="search">
      <div className="filters__field">
        <label htmlFor="filter-search">Buscar</label>
        <input
          id="filter-search"
          type="search"
          placeholder="Nombre del producto..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters__field">
        <label htmlFor="filter-category">Categoria</label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__field filters__field--checkbox">
        <input
          id="filter-stock"
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked)}
        />
        <label htmlFor="filter-stock">Solo disponibles</label>
      </div>

      <button type="button" className="btn btn--ghost" onClick={onReset}>
        Limpiar
      </button>

      {/* Recuento de resultados, anunciado a lectores de pantalla. */}
      <p className="filters__count" role="status" aria-live="polite">
        {resultCount} resultado{resultCount === 1 ? '' : 's'}
      </p>
    </div>
  );
}

ProductFilters.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onInStockChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
};
