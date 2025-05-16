import { useState } from 'react';
import { REACT_APP_API_KEY_NEWSAPI } from '@env';

export const useNuevaBusqueda = () => {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const ITEMS_POR_PAGINA = 10;
  const API_KEY = REACT_APP_API_KEY_NEWSAPI;

  // Calcular resultados paginados
  const resultadosPaginados = resultados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    setPaginaActual(nuevaPagina);
  };

  const realizarBusqueda = async (parametros) => {
    setCargando(true);
    setError(null);
    setPaginaActual(1); // Resetear página al buscar

    try {
      const url = new URL('https://newsapi.org/v2/everything');

      // Validación básica
      if (!parametros.q) {
        throw new Error('Debes ingresar un término de búsqueda o al menos un filtro');
      }

      // Mapeo de parámetros
      const paramsMap = {
        q: parametros.q,
        from: parametros.from,
        to: parametros.to,
        language: parametros.language,
      };

      // Agregar solo parámetros válidos
      Object.entries(paramsMap).forEach(([key, value]) => {
        if (value && value !== '') {
          url.searchParams.append(key, value);
        }
      });

      url.searchParams.append('apiKey', API_KEY);

      const response = await fetch(url.toString());
      console.log(response)

      // Manejar errores HTTP
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();

      // Validar resultados
      if (!data.articles?.length) {
        throw new Error('No se encontraron artículos con estos filtros');
      }

      setResultados(data.articles);
      setTotalPaginas(Math.ceil(data.articles.length / ITEMS_POR_PAGINA));
    } catch (err) {
      setError(err.message.replace('newsapi.org', ''));
      setResultados([]);
      setTotalPaginas(1);
    } finally {
      setCargando(false);
    }
  };

  return {
    resultados: resultadosPaginados,
    cargando,
    error,
    realizarBusqueda,
    paginaActual,
    totalPaginas,
    cambiarPagina,
    totalResultados: resultados.length,
    ITEMS_POR_PAGINA
  };
};