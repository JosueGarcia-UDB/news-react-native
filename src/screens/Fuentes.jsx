// Fuentes.js
import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.jsx';
import TarjetaFuente from '../components/TarjetaFuente.jsx';
import { colores, tipografia, espaciados } from '../styles/globales.js';
import useFuentes from '../hooks/useFuentes.js';

const Fuentes = () => {
  const { sections, loading, error } = useFuentes();

  if (loading) {
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
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarjetaFuente fuente={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.tituloSeccion}>{title}</Text>
        )}
        contentContainerStyle={styles.contenido}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  contenido: {
    padding: espaciados.margenContenedor,
  },
  tituloSeccion: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.medio,
    backgroundColor: colores.fondoOscuro,
    paddingVertical: espaciados.base,
  },
});

export default Fuentes;
