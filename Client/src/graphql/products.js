import { gql } from '@apollo/client';

/**
 * Fragmento reutilizable con los campos de un producto.
 * Centralizar los campos evita repetirlos en cada query y
 * mantiene la consistencia si el modelo cambia.
 */
export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    name
    price
    category
    image
    inStock
  }
`;

/**
 * Query para obtener el listado completo de productos.
 * Ajusta el nombre "products" al que expongas en tu schema (Query).
 */
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;
