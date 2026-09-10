import PropTypes from 'prop-types';
import { formatPrice } from '@/utils/formatPrice';

/**
 * Tarjeta de un producto.
 *
 * Buenas practicas aplicadas:
 * - <article> semantico: cada tarjeta es contenido autonomo.
 * - Imagen con alt descriptivo y loading="lazy" (rendimiento).
 * - Fallback cuando no hay imagen, sin romper el layout.
 * - Estado de stock comunicado con texto, no solo con color (accesibilidad).
 */
export default function ProductCard({ product }) {
  const { name, price, category, image, inStock } = product;

  return (
    <article className="card">
      <div className="card__media">
        {image ? (
          <img
            className="card__img"
            src={image}
            alt={name}
            loading="lazy"
            width="300"
            height="300"
          />
        ) : (
          <div className="card__img card__img--placeholder" aria-hidden="true">
            <span>Sin imagen</span>
          </div>
        )}
        {!inStock && <span className="card__badge">Agotado</span>}
      </div>

      <div className="card__body">
        <p className="card__category">{category}</p>
        <h3 className="card__title">{name}</h3>
        <p className="card__price">{formatPrice(price)}</p>
        <p
          className={`card__stock ${inStock ? 'is-available' : 'is-out'}`}
        >
          {inStock ? 'Disponible' : 'Agotado'}
        </p>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
};
