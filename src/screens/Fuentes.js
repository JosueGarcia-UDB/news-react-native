import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.js';
import TarjetaFuente from '../components/TarjetaFuente';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Fuentes = () => {
  const [fuentes, setFuentes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'b20bb19aa7094cf6b21a41cda437bc0e'; // Reemplaza con tu API key de NewsAPI

  useEffect(() => {
    Promise.all([
      fetch(`https://newsapi.org/v2/sources?language=es&apiKey=${API_KEY}`).then(res => res.json()),
      fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${API_KEY}`).then(res => res.json())
    ])
      .then(([dataEs, dataEn]) => {
        const sourcesEs = dataEs.sources || [];
        const sourcesEn = dataEn.sources || [];
        
        const fuentesMapeadas = [...sourcesEs, ...sourcesEn].map(source => ({
          id: source.id,
          nombre: source.name,
          descripcion: source.description,
          categoria: source.category,
          pais: source.country,
          idioma: source.language,
          url: source.url, // URL de la fuente
        }));
  
        // Ordenar: primero las de español, luego las de inglés
        const fuentesOrdenadas = fuentesMapeadas.sort((a, b) => {
          if (a.idioma === 'es' && b.idioma === 'en') return -1;
          if (a.idioma === 'en' && b.idioma === 'es') return 1;
          return 0;
        });
  
        setFuentes(fuentesOrdenadas);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);
  

  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Cabecera />
        <Text style={{ color: colores.textoClaro, textAlign: 'center' }}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Cabecera />
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
          <Text style={styles.tituloSeccion}>
            Fuentes de tus noticias favoritas
          </Text>
          
          {fuentes.map(fuente => (
            <TarjetaFuente key={fuente.id} fuente={fuente} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: espaciados.margenContenedor,
  },
  tituloSeccion: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.medio,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: colores.fondoOscuro,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingBottom: espaciados.pequeño,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: espaciados.pequeño,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: colores.primario,
  },
  navIcon: {
    fontSize: tipografia.tamaños.medio,
    marginBottom: espaciados.minimo,
  },
  navText: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
  },
  navTextActive: {
    color: colores.textoClaro,
  }
});

export default Fuentes;