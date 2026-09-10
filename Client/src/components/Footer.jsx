/**
 * Pie de pagina. El anio se calcula en tiempo de render, sin hardcodear.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>&copy; {year} Urban Sports. Todos los derechos reservados.</p>
    </footer>
  );
}
