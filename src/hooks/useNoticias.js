// hooks/useNoticias.js (versión simplificada)
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCategorias } from '../context/CategoriasContext';
import { REACT_APP_API_KEY_NEWSAPI } from '@env';

const API_KEY = REACT_APP_API_KEY_NEWSAPI;

const useNoticias = () => {
  const { categorias, categoriasActualizadas } = useCategorias();
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const prevCategoriasRef = useRef(null);

  // Verificar si las categorías seleccionadas han cambiado
  const hanCambiadoCategorias = useCallback(() => {
    if (!prevCategoriasRef.current) return true;

    const categoriasAnteriores = prevCategoriasRef.current.filter(cat => cat.seleccionada);
    const categoriasActuales = categorias.filter(cat => cat.seleccionada);

    if (categoriasAnteriores.length !== categoriasActuales.length) return true;

    return categoriasActuales.some(catActual =>
      !categoriasAnteriores.some(catAnterior =>
        catAnterior.id === catActual.id
      )
    );
  }, [categorias]);

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
      const erroresPorCategoria = [];

      for (const categoria of categoriasSeleccionadas) {
        try {
          const url = `https://newsapi.org/v2/top-headlines?category=${categoria}&country=${country}&apiKey=${API_KEY}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Error en la solicitud para ${categoria}: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.status === 'error') {
            throw new Error(`Error de la API para ${categoria}: ${data.message}`);
          }

          if (data.articles) {
            todasNoticias.push(
              ...data.articles.map(articulo => ({
                ...articulo,
                categoria,
              }))
            );
          }
        } catch (err) {
          erroresPorCategoria.push(`Categoría ${categoria}: ${err.message}`);
          console.error(`Error en categoría ${categoria}:`, err);
        }
      }

      if (erroresPorCategoria.length > 0) {
        setError(`Errores al cargar algunas categorías: ${erroresPorCategoria.join('; ')}`);
      }

      if (todasNoticias.length === 0 && erroresPorCategoria.length > 0) {
        throw new Error('No se pudieron cargar noticias de ninguna categoría.');
      }

      // Eliminar duplicados y ordenar
      const noticiasUnicas = [...new Map(todasNoticias.map(item => [item.url, item])).values()];
      const noticiasOrdenadas = noticiasUnicas.sort((a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setNoticias(noticiasOrdenadas);
      setUltimaActualizacion(new Date());

      // Actualizar categorías de referencia
      prevCategoriasRef.current = [...categorias];
    } catch (error) {
      console.error('Error al obtener noticias:', error);
      setError(error.message || 'Error desconocido al cargar noticias');
    } finally {
      setCargando(false);
    }
  }, [categorias]);

  // Cargar noticias cuando cambian las categorías
  useEffect(() => {
    // Siempre obtener noticias cuando se monta el componente o cuando hay categorías actualizadas
    obtenerNoticias();
  }, [obtenerNoticias, categoriasActualizadas]);

  return {
    noticias,
    cargando,
    error,
    ultimaActualizacion,
    recargar: obtenerNoticias,
  };
};

export default useNoticias;