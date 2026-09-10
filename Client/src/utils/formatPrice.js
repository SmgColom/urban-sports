/**
 * Formatea un numero como precio en pesos colombianos.
 * Usa Intl.NumberFormat (nativo, sin librerias) para respetar
 * separadores de miles y simbolo de moneda segun la localizacion.
 *
 * @param {number} value - Monto a formatear.
 * @returns {string} Precio formateado, ej. "$ 89.990".
 */
export function formatPrice(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}
