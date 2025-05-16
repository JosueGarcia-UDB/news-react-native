import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

const CATEGORIAS_INICIALES = [
  { id: '1', nombre: 'Business', nombreCategoria: 'Negocios', seleccionada: false },
  { id: '2', nombre: 'Entertainment', nombreCategoria: 'Entretenimiento', seleccionada: false },
  { id: '3', nombre: 'General', nombreCategoria: 'General', seleccionada: false },
  { id: '4', nombre: 'Health', nombreCategoria: 'Salud', seleccionada: false },
  { id: '5', nombre: 'Science', nombreCategoria: 'Ciencia', seleccionada: false },
  { id: '6', nombre: 'Sports', nombreCategoria: 'Deportes', seleccionada: false },
  { id: '7', nombre: 'Technology', nombreCategoria: 'Tecnología', seleccionada: false },
];

const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);
  const [categoriasActualizadas, setCategoriasActualizadas] = useState(false);

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
  }, [user]);

  const toggleCategoria = async (id) => {
    const nuevasCategorias = categorias.map(cat =>
      cat.id === id ? { ...cat, seleccionada: !cat.seleccionada } : cat
    );
    setCategorias(nuevasCategorias);
    setCategoriasActualizadas(true);
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
        await marcarConfiguracionInicial();
        return true;
      } catch (error) {
        console.error('Error al guardar las preferencias:', error);
        return false;
      }
    }
    return false;
  };

  const marcarConfiguracionInicial = async () => {
    if (user) {
      const setupKey = `setup_completed_${user.username}`;
      try {
        await AsyncStorage.setItem(setupKey, 'true');
      } catch (error) {
        console.error('Error al marcar la configuración inicial:', error);
      }
    }
  };

  const verificarConfiguracionInicial = async () => {
    if (!user) return false;
    const setupKey = `setup_completed_${user.username}`;
    try {
      const configuracionCompletada = await AsyncStorage.getItem(setupKey);
      return configuracionCompletada === 'true';
    } catch (error) {
      console.error('Error al verificar la configuración inicial:', error);
      return false;
    }
  };

  const resetCategoriasActualizadas = () => {
    setCategoriasActualizadas(false);
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        toggleCategoria,
        guardarPreferencias,
        verificarConfiguracionInicial,
        categoriasActualizadas,
        resetCategoriasActualizadas,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategorias = () => useContext(CategoriasContext); 