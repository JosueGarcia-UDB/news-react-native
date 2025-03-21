import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const TarjetaNoticia = ({ noticia = {} }) => {
  // Si 'noticia' es un array, extraemos el objeto (normalmente en la posición 1)
  const noticiaData = Array.isArray(noticia) ? noticia[1] : noticia;

  const { 
    title = '', 
    description = '', 
    urlToImage = null,
    url = '',
    publishedAt = '',
    categoria = ''
  } = noticiaData;
  
  const sourceName = noticiaData?.source?.name || 'Fuente desconocida';
  const fechaPublicacion = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';
  
  // Manejar apertura de URL
  const abrirNoticia = () => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error al abrir URL:', err));
    }
  };

  return (
    <View style={styles.tarjeta}>
      {/* Encabezado con fuente y fecha */}
      <View style={styles.encabezado}>
        <Text style={styles.fuente}>{sourceName}</Text>
        {fechaPublicacion && <Text style={styles.fecha}>{fechaPublicacion}</Text>}
      </View>

      {/* Categoría (si existe) */}
      {categoria && (
        <View style={styles.categoriaContainer}>
          <Text style={styles.categoriaTexto}>{categoria.toUpperCase()}</Text>
        </View>
      )}

      {/* Título de la noticia */}
      <Text style={styles.titulo}>{title}</Text>

      {/* Imagen de la noticia (si existe) */}
      {urlToImage && (
        <View style={styles.contenedorImagen}>
          <Image 
            source={{ uri: urlToImage }} 
            style={styles.imagen}
            resizeMode="cover"
            defaultSource={require('../assets/img/placeholder.png')} // Placeholder si la imagen no carga
          />
        </View>
      )}

      {/* Descripción y botón "Leer más" */}
      {description && (
        <>
          <Text style={styles.descripcion}>{description}</Text>
          <TouchableOpacity style={styles.boton} onPress={abrirNoticia}>
            <Text style={styles.textoBoton}>Leer más</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBlock: espaciados.pequeño,
    overflow: 'hidden',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: espaciados.base,
    marginBottom: espaciados.pequeño,
  },
  fuente: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal, 
    flex: 1,
    marginRight: espaciados.pequeño,
  },
  fecha: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
  },
  categoriaContainer: {
    backgroundColor: colores.primario, 
    alignSelf: 'flex-start',
    paddingHorizontal: espaciados.pequeño,
    paddingVertical: espaciados.minimo,
    borderRadius: espaciados.radioBorde.completo,
    marginLeft: espaciados.base,
    marginBottom: espaciados.medio
  },
  categoriaTexto: {
    color: colores.textoBoton,
    fontSize: tipografia.tamaños.pequeño,
    fontWeight: tipografia.pesos.negrita,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.negrita,
    paddingHorizontal: espaciados.base,
    paddingBottom: espaciados.pequeño,
    lineHeight: 24, // Añadido para mejor legibilidad
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    padding: espaciados.base,
    paddingBottom: espaciados.pequeño,
    lineHeight: 20, // Añadido
  },
  contenedorImagen: {
    height: 180,
    backgroundColor: colores.borde,
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    alignSelf: 'center',
    marginLeft: espaciados.base,
    marginBottom: espaciados.medio,
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