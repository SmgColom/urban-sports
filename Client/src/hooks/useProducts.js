import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/graphql/products';

/**
 * Hook custom para obtener los productos.
 *
 * Encapsula el detalle de Apollo para que los componentes no dependan
 * directamente de useQuery ni de la forma de la respuesta. Si mañana
 * cambia la query o el transporte, solo se toca este archivo.
 *
 * @returns {{
 *   products: Array,
 *   loading: boolean,
 *   error: import('@apollo/client').ApolloError | undefined,
 *   refetch: () => void
 * }}
 */
export function useProducts() {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);

  return {
    // Fallback a array vacio: los componentes siempre reciben un array.
    products: data?.products ?? [],
    loading,
    error,
    refetch,
  };
}
