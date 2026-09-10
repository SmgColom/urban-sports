import PropTypes from 'prop-types';

/**
 * Estado de error accesible con boton de reintento opcional.
 * role="alert" hace que el lector de pantalla lo anuncie de inmediato.
 */
export default function ErrorState({
  message = 'No se pudieron cargar los productos.',
  onRetry,
}) {
  return (
    <div className="state state--error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
