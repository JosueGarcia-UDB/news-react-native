import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.js';
import TarjetaFuente from '../components/TarjetaFuente';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Fuentes = () => {
  const fuentes = [
    {
      id: '1',
      nombre: 'Nombre de la fuente',
      descripcion: 'Este bloque de texto es una descripción breve de la fuente de noticias.',
      categoria: 'Categoría',
      pais: 'país',
      idioma: 'idioma',
    },
    {
      id: '2',
      nombre: 'Nombre de la fuente',
      descripcion: 'Este bloque de texto es una descripción breve de la fuente de noticias.',
      categoria: 'Categoría',
      pais: 'país',
      idioma: 'idioma',
    },
  ];

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