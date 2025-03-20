import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estado global compartido con valores iniciales
let categoriasGlobales = [
  { id: '1', nombre: 'business', seleccionada: false },
  { id: '2', nombre: 'entertainment', seleccionada: false },
  { id: '3', nombre: 'general', seleccionada: true },
  { id: '4', nombre: 'health', seleccionada: false },
  { id: '5', nombre: 'science', seleccionada: false },
  { id: '6', nombre: 'sports', seleccionada: false },
  { id: '7', nombre: 'technology', seleccionada: false },
];

//Con fines de depuración
let listeners = [];

const useCategorias = () => {
  const [categorias, setCategorias] = useState(categoriasGlobales);

  useEffect(() => {
    const listener = (nuevasCategorias) => {
      setCategorias([...nuevasCategorias]);
    };
    listeners.push(listener);

    const cargarPreferencias = async () => {
      try {
        const preferenciasGuardadas = await AsyncStorage.getItem('preferencias');
        if (preferenciasGuardadas) {
          categoriasGlobales = JSON.parse(preferenciasGuardadas);
          notificarCambios();
          console.log("Preferencias cargadas desde AsyncStorage:", {categoriasGlobales});
        }
      } catch (error) {
        console.error('Error al cargar las preferencias:', error);
      }
    };

    cargarPreferencias();

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  //Función para depurar que categorías se tienen seleccionadas
  const notificarCambios = () => {
    listeners.forEach(listener => listener(categoriasGlobales));
  };

  const guardarPreferencias = async () => {
    try {
      const categoriasValidas = categoriasGlobales.map(cat => ({
        id: cat.id,
        nombre: cat.nombre, // Aseguramos que se guarde el nombre correcto en inglés
        seleccionada: cat.seleccionada
      }));
      await AsyncStorage.setItem('preferencias', JSON.stringify(categoriasValidas));
      notificarCambios();
      return true;
    } catch (error) {
      console.error('Error al guardar las preferencias:', error);
      return false;
    }
  };
  

  const toggleCategoria = async (id) => {
    categoriasGlobales = categoriasGlobales.map(cat =>
      cat.id === id ? { ...cat, seleccionada: !cat.seleccionada } : cat
    );
    await guardarPreferencias(); // Guardar inmediatamente al cambiar
    notificarCambios();
  };

  return {
    categorias,
    toggleCategoria,
    guardarPreferencias,
  };
};

export default useCategorias;