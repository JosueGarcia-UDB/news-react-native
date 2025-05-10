import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import { LinearGradient } from "expo-linear-gradient";

const NoticiaIndividual = ({ route, navigation }) => {
  const { noticia } = route.params;

  // Extraer los datos de la noticia
  const {
    title,
    description,
    urlToImage,
    url,
    publishedAt,
    categoria,
    content,
  } = noticia;

  const sourceName = noticia?.source?.name || "Fuente desconocida";
  const fechaPublicacion = publishedAt
    ? new Date(publishedAt).toLocaleDateString()
    : "";

  // Abrir la URL en el navegador
  const abrirURL = () => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir URL:", err)
      );
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        {/* Imagen principal con efecto de desvanecido */}
        {urlToImage && (
          <View style={styles.contenedorImagen}>
            <Image
              source={{ uri: urlToImage }}
              style={styles.imagen}
              resizeMode="cover"
              defaultSource={require("../assets/img/placeholder.png")}
            />
            <LinearGradient
              colors={["rgba(18, 18, 18, 0)", "rgba(3, 3, 3, 0.96)"]}
              style={styles.gradiente}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        )}

        {/* Categoría */}
        {categoria && (
          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaTexto}>{categoria.toUpperCase()}</Text>
          </View>
        )}

        {/* Título */}
        <Text style={styles.titulo}>{title}</Text>

        {/* Fuente y fecha */}
        <View style={styles.infoContainer}>
          <Text style={styles.fuente}>{sourceName}</Text>
          <Text style={styles.separador}>-</Text>
          <Text style={styles.fecha}>{fechaPublicacion}</Text>
        </View>

        {/* Descripción */}
        {description && <Text style={styles.descripcion}>{description}</Text>}

        {/* Contenido */}
        <View style={styles.contenidoContainer}>
          <Text style={styles.contenidoLabel}>Descripción:</Text>
          <Text style={styles.contenido}>
            {content || "No hay contenido disponible para esta noticia."}
          </Text>
        </View>

        {/* Botón leer más */}
        <TouchableOpacity style={styles.boton} onPress={abrirURL}>
          <Text style={styles.textoBoton}>Leer más</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenedorImagen: {
    height: 250,
    backgroundColor: colores.borde,
    position: "relative",
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  gradiente: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
  },
  categoriaContainer: {
    backgroundColor: colores.primario,
    alignSelf: "flex-start",
    paddingHorizontal: espaciados.pequeño,
    paddingVertical: espaciados.minimo,
    borderRadius: espaciados.radioBorde.completo,
    marginLeft: espaciados.base,
    marginTop: espaciados.medio,
  },
  categoriaTexto: {
    color: colores.textoBoton,
    fontSize: tipografia.tamaños.pequeño,
    fontWeight: tipografia.pesos.negrita,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.negrita,
    paddingHorizontal: espaciados.base,
    paddingTop: espaciados.pequeño,
    lineHeight: 30,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: espaciados.base,
    marginVertical: espaciados.pequeño,
  },
  fuente: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
  },
  separador: {
    color: colores.textoSecundario,
    marginHorizontal: espaciados.minimo,
  },
  fecha: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    padding: espaciados.base,
    lineHeight: 22,
    fontStyle: "italic",
  },
  contenidoContainer: {
    padding: espaciados.base,
  },
  contenidoLabel: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.pequeño,
  },
  contenido: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    alignSelf: "center",
    marginVertical: espaciados.base,
    paddingHorizontal: espaciados.grande,
    paddingVertical: espaciados.pequeño,
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
});

export default NoticiaIndividual;
