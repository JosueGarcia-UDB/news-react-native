// hooks/useFuentes.js
import { useState, useEffect } from 'react';

const API_KEY = '04fc44b2e4314e96b8397639f509664b';

const useFuentes = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Agrupamos en secciones: la primera con fuentes en español y la segunda con fuentes en inglés
        setSections([
          { title: 'Español', data: mappedEs },
          { title: 'English', data: mappedEn },
        ]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { sections, loading, error };
};

export default useFuentes;
