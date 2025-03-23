import { useState } from 'react';

export const useNuevaBusqueda = () => {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = '074708e3af494bc8960fe054b4557298';

  const realizarBusqueda = async (parametros) => {
    setCargando(true);
    setError(null);

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
    } catch (err) {
      setError(err.message.replace('newsapi.org', '')); 
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  return { resultados, cargando, error, realizarBusqueda};
};