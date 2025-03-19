import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const TarjetaNoticia = ({ noticia }) => {
  const { fuente, titulo, descripcion, imagen } = noticia;
  
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.fuente}>{fuente}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.contenedorImagen}>
        <Image source={imagen} style={styles.imagen} />
      </View>
      {descripcion ? (
        <>
          <Text style={styles.descripcion}>{descripcion}</Text>
          <TouchableOpacity style={styles.boton}>
            <Text style={styles.textoBoton}>Leer más</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBottom: espaciados.medio,
    overflow: 'hidden',
  },
  fuente: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
    padding: espaciados.base,
    paddingBottom: espaciados.minimo,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.negrita,
    paddingHorizontal: espaciados.base,
    paddingBottom: espaciados.pequeño,
  },
  contenedorImagen: {
    height: 180,
    backgroundColor: colores.borde,
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.7,
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    padding: espaciados.base,
    paddingBottom: espaciados.pequeño,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    alignSelf: 'flex-start',
    marginLeft: espaciados.base,
    marginBottom: espaciados.base,
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
});

export default TarjetaNoticia;