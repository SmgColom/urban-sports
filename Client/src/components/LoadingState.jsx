import PropTypes from 'prop-types';

/**
 * Indicador de carga accesible.
 * role="status" + aria-live avisan a lectores de pantalla sin ser intrusivos.
 */
export default function LoadingState({ message = 'Cargando productos...' }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

LoadingState.propTypes = {
  message: PropTypes.string,
};
