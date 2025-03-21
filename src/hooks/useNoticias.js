// hooks/useNoticias.js (versión simplificada)
import { useState, useEffect, useCallback } from 'react';
import useCategorias from './useCategorias';

const API_KEY = '04fc44b2e4314e96b8397639f509664b';

const useNoticias = () => {
  const { categorias } = useCategorias();
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const obtenerNoticias = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const categoriasSeleccionadas = categorias
        .filter(cat => cat.seleccionada)
        .map(cat => cat.nombre);

      if (categoriasSeleccionadas.length === 0) {
        setNoticias([]);
        setCargando(false);
        return;
      }

      const country = 'us';
      const todasNoticias = [];

      for (const categoria of categoriasSeleccionadas) {
        try {
          const url = `https://newsapi.org/v2/top-headlines?category=${categoria}&country=${country}&apiKey=${API_KEY}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.articles) {
            todasNoticias.push(...data.articles.map(articulo => {
              if (Array.isArray(articulo)) {
                const [url, datos] = articulo;
                return { ...datos, url, categoria };
              }
              return { ...articulo, categoria };
            }));
          }
        } catch (err) {
          console.error(`Error en categoría ${categoria}:`, err);
        }
      }


      // Eliminar duplicados y ordenar
      const noticiasUnicas = [...new Map(todasNoticias.map(item => [item.url, item]))].values();
      const noticiasOrdenadas = Array.from(noticiasUnicas).sort((a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setNoticias(noticiasOrdenadas);
      setUltimaActualizacion(new Date());

    } catch (error) {
      console.error('Error al obtener noticias:', error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, [categorias]);

  useEffect(() => {
    obtenerNoticias();
  }, [obtenerNoticias]);

  return {
    noticias,
    cargando,
    error,
    ultimaActualizacion,
    recargar: obtenerNoticias
  };
};

export default useNoticias;