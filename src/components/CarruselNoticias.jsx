import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colores, espaciados, tipografia } from "../styles/globales";

const { width } = Dimensions.get("window");

const NoticiaLocalCard = ({ noticia }) => {
  if (!noticia) return null;
  const {
    title = "",
    description = "",
    image_url = null,
    link = "",
    pubDate = "",
    source_name = "",
  } = noticia;

  // Formatear fecha
  let fecha = "";
  if (pubDate) {
    try {
      fecha = new Date(pubDate).toLocaleDateString();
    } catch {
      fecha = pubDate;
    }
  }

  const handlePress = () => {
    if (link) Linking.openURL(link);
  };

  // Función para normalizar la descripción a aproximadamente 200 palabras
  const normalizarDescripcion = (texto, longitudObjetivo = 20) => {
    const palabras = texto.trim().split(/\s+/);

    // Si ya tiene 200 o más palabras, recortamos
    if (palabras.length >= longitudObjetivo) {
      return palabras.slice(0, longitudObjetivo).join(" ") + "...";
    }

    // Si tiene menos, repetimos o rellenamos con texto neutro
    const palabrasFaltantes = longitudObjetivo - palabras.length;
    const relleno = Array(palabrasFaltantes)
      .join(" ");
    return texto + " " + relleno;
  };


  return (
    <View style={styles.card}>
      {image_url ? (
        <Image
          source={{ uri: image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]} />
      )}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.source}>
            {source_name || "Fuente desconocida"}
          </Text>
          {fecha ? <Text style={styles.date}>{fecha}</Text> : null}
        </View>
        <Text style={styles.title}>{title}</Text>
        {description ? (
          <Text style={styles.description}>{normalizarDescripcion(description)}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Leer más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarruselNoticias = ({ noticias = [], loading, error }) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colores.textoClaro} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!noticias || noticias.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No hay noticias disponibles para tu país.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={noticias}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <NoticiaLocalCard noticia={item} />
        </View>
      )}
      keyExtractor={(item, index) =>
        `${item.article_id || item.link || item.title}-${index}`
      }
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={width * 0.8 + espaciados.medio}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colores.primario,
    fontSize: tipografia.tamaños.medio,
    textAlign: "center",
  },
  emptyContainer: {
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    textAlign: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  cardContainer: {
    width: width * 0.8,
    marginRight: espaciados.medio,
  },
  card: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginVertical: espaciados.pequeño,
    minHeight: 400,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: colores.borde,
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: espaciados.base,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: espaciados.pequeño,
  },
  source: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    flex: 1,
    marginRight: espaciados.pequeño,
  },
  date: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
  },
  title: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.pequeño,
  },
  description: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
    marginBottom: espaciados.medio,
  },
  button: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    alignSelf: "center",
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
  },
  buttonText: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
});

export default CarruselNoticias;
