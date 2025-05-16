// hooks/useFuentes.js
import { useState, useEffect } from 'react';
import { REACT_APP_API_KEY_NEWSAPI } from '@env';

const API_KEY = REACT_APP_API_KEY_NEWSAPI;

const useFuentes = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  useEffect(() => {
    Promise.all([
      fetch(`https://newsapi.org/v2/sources?language=es&apiKey=${API_KEY}`).then(res => res.json()),
      fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`).then(res => res.json())
    ])
      .then(([dataEs, dataEn]) => {
        const sourcesEs = dataEs.sources || [];
        const sourcesEn = dataEn.sources || [];

        const mapSource = (source) => ({
          id: source.id,
          nombre: source.name,
          descripcion: source.description,
          categoria: source.category,
          pais: source.country,
          idioma: source.language,
          url: source.url,
        });

        const mappedEs = sourcesEs.map(mapSource);
        const mappedEn = sourcesEn.map(mapSource);

        // Unir todas las fuentes para paginación global
        const allSources = [...mappedEs, ...mappedEn];
        const total = allSources.length;
        setTotalPaginas(Math.max(1, Math.ceil(total / ITEMS_POR_PAGINA)));

        // Paginación global (mezclando ambos idiomas)
        const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
        const fin = inicio + ITEMS_POR_PAGINA;
        const paginatedSources = allSources.slice(inicio, fin);
        setSections([
          { title: 'Fuentes', data: paginatedSources }
        ]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    setPaginaActual(nuevaPagina);
  };

  return {
    sections,
    loading,
    error,
    paginaActual,
    totalPaginas,
    cambiarPagina,
    ITEMS_POR_PAGINA
  };
};

export default useFuentes;
