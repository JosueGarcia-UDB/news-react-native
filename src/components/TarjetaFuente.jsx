import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colores, tipografia, espaciados } from '../styles/globales.js';

//componente de tarjeta fuente que muestra la informacion del apartado de noticias
const TarjetaFuente = ({ fuente }) => {
  const { nombre, descripcion, categoria, pais, idioma, url } = fuente;

  const abrirSitioWeb = () => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
    }
  };

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.nombre}>{nombre}</Text>
      <View style={styles.separador} />
      
      <Text style={styles.descripcion}>{descripcion}</Text>
      <View style={styles.separador} />
      
      <Text style={styles.metadatos}>
        {categoria}
        {'\n'}
        {pais} · {idioma}
      </Text>
      
      <TouchableOpacity style={styles.boton} onPress={abrirSitioWeb}>
        <Text style={styles.textoBoton}>Ver sitio web</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBottom: espaciados.medio,
    padding: espaciados.base,
  },
  nombre: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.negrita,
    paddingVertical: espaciados.pequeño,
  },
  separador: {
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    marginVertical: espaciados.pequeño,
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    paddingVertical: espaciados.pequeño,
  },
  metadatos: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
    lineHeight: tipografia.tamaños.pequeño * 1.4,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    alignSelf: 'center',
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
});

export default TarjetaFuente;