import { useProducts } from '@/hooks/useProducts';
import { useProductFilters } from '@/hooks/useProductFilters';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import ProductFilters from '@/components/ProductFilters';
import ProductList from '@/components/ProductList';

/**
 * Componente raiz.
 * Bloque 5: layout final con skip-link, header, main y footer.
 *
 * Estructura de accesibilidad:
 * - Skip-link como primer elemento enfocable: permite saltar la
 *   navegacion e ir directo al contenido (util con teclado/lector).
 * - <main id="main"> es el destino del skip-link.
 */
export default function App() {
  const { products, loading, error, refetch } = useProducts();
  const {
    filters,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
    setInStockOnly,
    resetFilters,
  } = useProductFilters(products);

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (products.length === 0) return <EmptyState />;

    return (
      <>
        <ProductFilters
          filters={filters}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onInStockChange={setInStockOnly}
          onReset={resetFilters}
          resultCount={filteredProducts.length}
        />
        {filteredProducts.length === 0 ? (
          <EmptyState message="Ningun producto coincide con los filtros." />
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </>
    );
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Header />
      <main id="main" className="app" tabIndex={-1}>
        {renderContent()}
      </main>
      <Footer />
    </>
  );
}
