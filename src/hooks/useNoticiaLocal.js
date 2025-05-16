import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_KEY_NEWS_DATA = 'pub_849140b198830610b8569985dee2f2899bc2a';
const URL_API_NEWS_DATA = 'https://newsdata.io/api/1/latest';

const countryNameToCode = {
  "El Salvador": "sv",
  "México": "mx",
  "Ecuador": "ec",
  "Argentina": "ar",
  "España": "es",
  "Colombia": "co",
  "United States": "us"
};

export function useNoticiaLocal() {
  const { user } = useContext(AuthContext);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      setError(null);
      if (!user || !user.country) {
        setNoticias([]);
        setLoading(false);
        setError('No se ha definido el país del usuario.');
        return;
      }
      try {
        const countryCode = countryNameToCode[user.country] || user.country.toLowerCase();
        const url = `${URL_API_NEWS_DATA}?country=sv&apikey=${API_KEY_NEWS_DATA}&language=es&category=top`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.results) {
          setNoticias(data.results.slice(0, 10));
        } else {
          setNoticias([]);
        }
      } catch (err) {
        setError('Error al obtener noticias locales.');
        setNoticias([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, [user]);

  return { noticias, loading, error };
}