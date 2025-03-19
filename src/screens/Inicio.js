import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.js';
import TarjetaNoticia from '../components/TarjetaNoticia';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Inicio = () => {
  const noticias = [
    {
      id: '1',
      fuente: 'Nombre fuente',
      titulo: 'Esto en un título de noticia',
      descripcion: 'Este es una breve descripción de la noticia.',
      imagen: require('../assets/img/placeholder.png'),
    },
    {
      id: '2',
      fuente: 'Nombre fuente',
      titulo: 'Esto en un título de noticia',
      descripcion: 'Este es una breve descripción de la noticia.',
      imagen: require('../assets/img/placeholder.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
          <Text style={styles.tituloSeccion}>
            Lo más destacado en lo que te gusta
          </Text>
          
          {noticias.map(noticia => (
            <TarjetaNoticia key={noticia.id} noticia={noticia} />
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
  }
});

export default Inicio;