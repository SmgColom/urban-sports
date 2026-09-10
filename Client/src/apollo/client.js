import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

/**
 * URI del endpoint GraphQL.
 * Se lee de las variables de entorno de Vite (prefijo VITE_).
 * Si no existe, cae a localhost como valor seguro en desarrollo.
 */
const uri = import.meta.env.VITE_GRAPHQL_URI ?? 'http://localhost:4000/graphql';

/**
 * Instancia unica de Apollo Client para toda la app.
 * - HttpLink: capa de transporte HTTP hacia el servidor GraphQL.
 * - InMemoryCache: cache normalizada en memoria (mejora rendimiento
 *   y evita peticiones repetidas).
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // Muestra datos en cache y refresca en segundo plano.
      fetchPolicy: 'cache-and-network',
    },
  },
});
