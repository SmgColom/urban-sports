import PropTypes from 'prop-types';

/**
 * Estado vacio: se muestra cuando la query responde OK pero sin resultados.
 * Distinto de loading y de error; comunica claramente que no hay datos.
 */
export default function EmptyState({ message = 'No hay productos disponibles.' }) {
  return (
    <div className="state state--empty">
      <p>{message}</p>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
};
