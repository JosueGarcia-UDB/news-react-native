import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const CATEGORIAS_INICIALES = [
  { id: '1', nombre: 'Business', nombreCategoria: 'Negocios', seleccionada: false },
  { id: '2', nombre: 'Entertainment', nombreCategoria: 'Entretenimiento', seleccionada: false },
  { id: '3', nombre: 'General', nombreCategoria: 'General', seleccionada: false },
  { id: '4', nombre: 'Health', nombreCategoria: 'Salud', seleccionada: false },
  { id: '5', nombre: 'Science', nombreCategoria: 'Ciencia', seleccionada: false },
  { id: '6', nombre: 'Sports', nombreCategoria: 'Deportes', seleccionada: false },
  { id: '7', nombre: 'Technology', nombreCategoria: 'Tecnología', seleccionada: false },
];

const useCategorias = () => {
  const { user } = useContext(AuthContext);
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);

  useEffect(() => {
    const cargarPreferencias = async () => {
      if (user) {
        const prefsKey = `prefs_${user.username}`;
        try {
          const preferenciasGuardadas = await AsyncStorage.getItem(prefsKey);
          if (preferenciasGuardadas) {
            setCategorias(JSON.parse(preferenciasGuardadas));
          } else {
            setCategorias(CATEGORIAS_INICIALES);
          }
        } catch (error) {
          console.error('Error al cargar las preferencias:', error);
        }
      } else {
        setCategorias(CATEGORIAS_INICIALES);
      }
    };

    cargarPreferencias();
  }, [user]); // Escucha cambios en el usuario

  const toggleCategoria = async (id) => {
    const nuevasCategorias = categorias.map(cat =>
      cat.id === id ? { ...cat, seleccionada: !cat.seleccionada } : cat
    );
    setCategorias(nuevasCategorias);

    if (user) {
      const prefsKey = `prefs_${user.username}`;
      try {
        await AsyncStorage.setItem(prefsKey, JSON.stringify(nuevasCategorias));
      } catch (error) {
        console.error('Error al guardar las preferencias:', error);
      }
    }
  };

  const guardarPreferencias = async () => {
    if (user) {
      const prefsKey = `prefs_${user.username}`;
      try {
        await AsyncStorage.setItem(prefsKey, JSON.stringify(categorias));
        return true;
      } catch (error) {
        console.error('Error al guardar las preferencias:', error);
        return false;
      }
    }
    return false;
  };

  return {
    categorias,
    toggleCategoria,
    guardarPreferencias,
  };
};

export default useCategorias;
