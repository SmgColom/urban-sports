# Urban Sports — Cliente

Frontend del catalogo Urban Sports. Consume una API GraphQL (Apollo Server +
Express + MongoDB) y muestra los productos con busqueda y filtros.

## Stack

- **React 18** + **Vite** — SPA rapida, ideal para desplegar en Vercel.
- **Apollo Client** — consumo de la API GraphQL con cache normalizada.
- **Vitest** + **Testing Library** — pruebas unitarias y de integracion.
- **ESLint** — calidad de codigo.

## Requisitos

- Node.js 18 o superior.
- El backend GraphQL corriendo (por defecto en `http://localhost:4000/graphql`).

## Instalacion

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta la URL del backend:

```
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # build de produccion (carpeta dist/)
npm run preview    # previsualiza el build
npm test           # tests en modo watch
npm run test:run   # tests una sola vez
npm run lint       # linting
```

## Estructura

```
src/
  apollo/       Cliente Apollo (configuracion)
  components/   Componentes de UI
  graphql/      Queries y fragmentos GraphQL
  hooks/        Hooks custom (datos y filtros)
  styles/       Estilos globales y tokens de diseno
  test/         Pruebas
  utils/        Utilidades puras (formato, filtrado)
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel, importa el proyecto y selecciona esta carpeta como raiz.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. En **Settings > Environment Variables**, agrega `VITE_GRAPHQL_URI` con la URL
   publica de tu backend (desplegado en Render, Railway u otro servicio que
   soporte servidores Express de larga ejecucion).

> El backend Express no se despliega en Vercel; va en un servicio aparte y el
> frontend apunta a el mediante la variable de entorno.
