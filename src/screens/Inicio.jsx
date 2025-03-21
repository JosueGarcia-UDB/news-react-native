import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabecera from '../components/Header.jsx';
import TarjetaNoticia from '../components/TarjetaNoticia.jsx';
import { colores, tipografia, espaciados } from '../styles/globales.js';
import useNoticias from '../hooks/useNoticias.js';

const Inicio = () => {
  const { noticias, cargando, error, ultimaActualizacion, recargar } = useNoticias();
  const [refreshing, setRefreshing] = useState(false);

  // Función para manejar pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await recargar();
    setRefreshing(false);
  }, [recargar]);

  // Función para renderizar mensaje de última actualización
  const renderUltimaActualizacion = () => {
    if (!ultimaActualizacion) return null;
    return (
      <Text style={styles.ultimaActualizacion}>
        Última actualización: {ultimaActualizacion.toLocaleTimeString()}
      </Text>
    );
  };

  // Renderizar estado de carga
  if (cargando && !refreshing) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Cabecera />
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color={colores.textoClaro} />
          <Text style={styles.cargandoTexto}>Cargando noticias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Cabecera />
        <View style={styles.cargando}>
          <Text style={styles.errorText}>
            Ocurrió un error al cargar las noticias. Por favor, intenta de nuevo.
          </Text>
          <TouchableOpacity style={styles.botonReintentar} onPress={recargar}>
            <Text style={styles.textoBotonReintentar}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Renderizar lista de noticias
  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <View style={styles.contenedorFlatList}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.contenido}
        data={noticias}
        renderItem={({ item }) => <TarjetaNoticia noticia={item} />}
        keyExtractor={(item, index) => `${item.url || item.title}-${index}`}
        ListHeaderComponent={
          <>
            <Text style={styles.tituloSeccion}>Lo más destacado en lo que te gusta</Text>
            {renderUltimaActualizacion()}
          </>
        }
        ListEmptyComponent={
          <Text style={styles.sinNoticias}>
            No hay noticias disponibles. Por favor, selecciona algunas categorías en la configuración.
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
    </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargandoTexto: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    marginTop: espaciados.base,
  },
  errorText: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    textAlign: 'center',
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
    textAlign: 'center',
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginTop: 0,
    marginBlock: espaciados.base,
    paddingHorizontal: espaciados.base,
  },
  sinNoticias: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    textAlign: 'center',
    padding: espaciados.base,
  },
  ultimaActualizacion: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
    textAlign: 'center',
    marginBottom: espaciados.medio,
  },
});

export default Inicio;