import PropTypes from 'prop-types';
import ProductCard from '@/components/ProductCard';

/**
 * Lista de productos en grid responsivo.
 *
 * Buenas practicas:
 * - <ul>/<li> para una lista real (lectores de pantalla la anuncian
 *   como "lista de N elementos").
 * - key estable por id.
 * - Delega el render de cada item en ProductCard (responsabilidad unica).
 */
export default function ProductList({ products }) {
  return (
    <ul className="product-grid" aria-label="Listado de productos">
      {products.map((product) => (
        <li key={product.id} className="product-grid__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
