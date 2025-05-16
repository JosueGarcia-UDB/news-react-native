// src/screens/Inicio.js
import React, { useState, useCallback, useContext, useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header.jsx";
import TarjetaNoticia from "../components/TarjetaNoticia.jsx";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import useNoticias from "../hooks/useNoticias.js";
import { AuthContext } from "../context/AuthContext";
import ConfiguracionModal from "../components/ConfiguracionModal.jsx";
import { useCategorias } from "../context/CategoriasContext";
import { useNoticiaLocal } from "../hooks/useNoticiaLocal";
import CarruselNoticias from "../components/CarruselNoticias";

const Inicio = ({ navigation, route }) => {
  const { noticias, cargando, error, ultimaActualizacion, recargar } =
    useNoticias();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const { verificarConfiguracionInicial, resetCategoriasActualizadas } =
    useCategorias();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const {
    noticias: localNoticias,
    loading: localLoading,
    error: localError,
  } = useNoticiaLocal();

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user) {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } else {
      // Verificar si es la primera vez que el usuario inicia sesión
      const checkFirstLogin = async () => {
        const configuracionCompletada = await verificarConfiguracionInicial();
        setShowConfigModal(!configuracionCompletada);
      };

      checkFirstLogin();
    }
  }, [user]);

  // Detectar si debe refrescar las noticias (después de cambiar categorías)
  useEffect(() => {
    if (route.params?.refreshNews) {
      recargar();
      resetCategoriasActualizadas();
    }
  }, [route.params?.refreshNews, route.params?.timestamp]);

  // Recargar noticias al volver a esta pantalla
  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await recargar();
    setRefreshing(false);
  }, [recargar]);

  const handleModalClose = (shouldRefresh = false) => {
    setShowConfigModal(false);
    if (shouldRefresh) {
      // Force immediate reload of news with slight delay to ensure state is updated
      setTimeout(() => {
        recargar();
      }, 100);
    }
  };

  const renderUltimaActualizacion = () => {
    if (!ultimaActualizacion) return null;
    return (
      <Text style={styles.ultimaActualizacion}>
        Última actualización: {ultimaActualizacion.toLocaleTimeString()}
      </Text>
    );
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <Header />

        <View style={styles.carrusel}>
          {/* Título para el carrusel */}
          <Text style={styles.tituloCarrusel}>
            Lo más destacado en México
          </Text>
          <CarruselNoticias
            noticias={localNoticias}
            loading={localLoading}
            error={localError}
          />
        </View>

        <View style={styles.contenedorFlatList}>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.contenido}
            data={noticias}
            renderItem={({ item }) => <TarjetaNoticia noticia={item} />}
            keyExtractor={(item, index) => `${item.url || item.title}-${index}`}
            ListHeaderComponent={
              <>
                <Text style={styles.tituloSeccion}>
                  Lo más destacado en lo que te gusta
                </Text>
                {renderUltimaActualizacion()}
              </>
            }
            ListEmptyComponent={
              <Text style={styles.sinNoticias}>
                No hay noticias disponibles. Por favor, selecciona algunas
                categorías en la configuración.
              </Text>
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
        </View>

        <ConfiguracionModal
          visible={showConfigModal}
          onClose={handleModalClose}
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
  contenedorFlatList: {
    margin: espaciados.margenContenedor,
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
    color: colores.textoClaro,
    textAlign: "center",
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginTop: 0,
    marginBlock: espaciados.base,
    paddingHorizontal: espaciados.base,
  },
  sinNoticias: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    textAlign: "center",
    padding: espaciados.base,
  },
  ultimaActualizacion: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
    textAlign: "center",
    marginBottom: espaciados.medio,
  },
  tituloCarrusel: {
    color: colores.textoClaro,
    textAlign: "center",
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginTop: espaciados.base,
    marginBottom: espaciados.base,
  },
  carrusel: {
    height: 'auto',
  }
});

export default Inicio;
