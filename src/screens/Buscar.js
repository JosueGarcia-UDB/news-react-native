import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.js';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Busqueda = () => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <View style={styles.contenido}>
        <Text style={styles.texto}>Pantalla de Búsqueda</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
  },
});

export default Busqueda;