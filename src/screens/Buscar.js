import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cabecera from '../components/Header.js';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Busqueda = () => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Busca tus noticias de interés</Text>
        <View style={styles.barraBusqueda}>
          <Ionicons name="search-outline" size={20} color={colores.textoTerciario} />
          <TextInput
            placeholder="Buscar..."
            placeholderTextColor={colores.textoTerciario}
            style={styles.input}
          />
        </View>
        <Text style={styles.advancedText}>Búsqueda avanzada</Text>
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
    paddingHorizontal: espaciados.margenContenedor,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.grande,
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    paddingHorizontal: espaciados.base,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    marginLeft: espaciados.pequeño,
  },
  advancedText: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.medio,
    marginTop: espaciados.grande,
  },
});

export default Busqueda;
