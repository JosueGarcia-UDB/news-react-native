// src/screens/Inicio.js
import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header.jsx";
import TarjetaNoticia from "../components/TarjetaNoticia.jsx";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import useNoticias from "../hooks/useNoticias.js";
import { AuthContext } from "../context/AuthContext";
import { useCategorias } from "../context/CategoriasContext";
import { useNoticiaLocal } from "../hooks/useNoticiaLocal";
import CarruselNoticias from "../components/CarruselNoticias";
import PaginationControls from "../components/PaginationControls";

const Inicio = ({ navigation, route }) => {
  const {
    noticias,
    cargando,
    error,
    ultimaActualizacion,
    recargar,
    paginaActual,
    totalPaginas,
    cambiarPagina,
  } = useNoticias();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const { resetCategoriasActualizadas } = useCategorias();
  const {
    noticias: localNoticias,
    loading: localLoading,
    error: localError,
  } = useNoticiaLocal();
  const flatListRef = useRef(null);

  // Redirigir al login si no hay usuario y recargar noticias al montar
  useEffect(() => {
    if (!user) {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } else {
      recargar();
    }
  }, [user, recargar]);

  // Detectar si debe refrescar las noticias (después de cambiar categorías)
  useEffect(() => {
    if (route.params?.refreshNews) {
      recargar();
      resetCategoriasActualizadas();
    }
  }, [route.params?.refreshNews, route.params?.timestamp]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await recargar();
    setRefreshing(false);
  }, [recargar]);

  const renderUltimaActualizacion = () => {
    if (!ultimaActualizacion) return null;
    return (
      <Text style={styles.ultimaActualizacion}>
        Última actualización: {ultimaActualizacion.toLocaleTimeString()}
      </Text>
    );
  };

  const handlePageChange = (newPage) => {
    cambiarPagina(newPage);
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, 100);
  };

  if (cargando && !refreshing) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color={colores.textoClaro} />
          <Text style={styles.cargandoTexto}>Cargando noticias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <View style={styles.cargando}>
          <Text style={styles.errorText}>
            Ocurrió un error al cargar las noticias. Por favor, intenta de
            nuevo.
          </Text>
          <TouchableOpacity style={styles.botonReintentar} onPress={recargar}>
            <Text style={styles.textoBotonReintentar}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Renderizar el carrusel como un componente separado para la sección superior
  const renderCarrusel = () => (
    <View style={styles.carrusel}>
      <Text style={styles.tituloCarrusel}>
        Lo más destacado en {user.country}
      </Text>
      <CarruselNoticias
        noticias={localNoticias}
        loading={localLoading}
        error={localError}
      />
    </View>
  );

  // Renderizar el encabezado de la sección de noticias por categoría
  const renderNoticiasCategoriaHeader = () => (
    <>
      <Text style={styles.tituloSeccion}>
        Lo más destacado en lo que te gusta
      </Text>
      {renderUltimaActualizacion()}
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <Header />

        <FlatList
          ref={flatListRef}
          style={styles.flatList}
          contentContainerStyle={styles.contenido}
          data={noticias}
          renderItem={({ item }) => <TarjetaNoticia noticia={item} />}
          keyExtractor={(item, index) => `${item.url || item.title}-${index}`}
          ListHeaderComponent={
            <>
              {renderCarrusel()}
              {renderNoticiasCategoriaHeader()}
            </>
          }
          ListFooterComponent={
            <PaginationControls
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              cambiarPagina={handlePageChange}
            />
          }
          ListEmptyComponent={
            noticias.length === 0 && (
              <Text style={styles.sinNoticias}>
                No hay noticias disponibles. Por favor, selecciona algunas
                categorías en la configuración.
              </Text>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colores.textoClaro]}
              tintColor={colores.textoClaro}
            />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  flatList: {
    flex: 1,
  },
  contenido: {
    padding: espaciados.margenContenedor,
  },
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cargandoTexto: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    marginTop: espaciados.base,
  },
  errorText: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    textAlign: "center",
    padding: espaciados.base,
  },
  botonReintentar: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
    marginTop: espaciados.base,
  },
  textoBotonReintentar: {
    color: colores.textoBoton,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.medio,
  },
  tituloSeccion: {
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    color: colores.textoClaro,
    marginTop: espaciados.grande,
    marginBottom: espaciados.base,
  },
  sinNoticias: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    textAlign: "center",
    marginTop: espaciados.grande,
  },
  ultimaActualizacion: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.pequeño,
    marginBottom: espaciados.base,
  },
  tituloCarrusel: {
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    color: colores.textoClaro,
    marginTop: espaciados.base,
    marginBottom: espaciados.base,
    textAlign: "center",
  },
  carrusel: {
    height: "auto",
  },
});

export default Inicio;
