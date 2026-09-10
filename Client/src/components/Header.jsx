/**
 * Cabecera del sitio.
 * <header> con rol de banner implicito; contiene el titulo principal (h1).
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <h1 className="site-header__title">Urban Sports</h1>
        <p className="site-header__tagline">
          Catalogo de productos deportivos urbanos
        </p>
      </div>
    </header>
  );
}
