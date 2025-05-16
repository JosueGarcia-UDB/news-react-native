// Fuentes.js
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header.jsx";
import TarjetaFuente from "../components/TarjetaFuente.jsx";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import useFuentes from "../hooks/useFuentes.js";
import PaginationControls from "../components/PaginationControls";

const Fuentes = () => {
  const {
    sections,
    loading,
    error,
    paginaActual,
    totalPaginas,
    cambiarPagina,
  } = useFuentes();

  if (loading) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <Text style={{ color: colores.textoClaro, textAlign: "center" }}>
          Cargando...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TarjetaFuente fuente={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.tituloSeccion}>{title}</Text>
          )}
          contentContainerStyle={styles.contenido}
          ListFooterComponent={
            sections[0]?.data?.length > 0 && totalPaginas > 1 ? (
              <PaginationControls
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                cambiarPagina={cambiarPagina}
              />
            ) : null
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
  contenido: {
    padding: espaciados.margenContenedor,
  },
  tituloSeccion: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.medio,
    backgroundColor: colores.fondoOscuro,
    paddingVertical: espaciados.base,
  },
});

export default Fuentes;
