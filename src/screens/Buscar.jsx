import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header.jsx";
import BusquedaAvanzada from "../components/BusquedaAvanzada.jsx";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useNuevaBusqueda } from "../hooks/useNuevaBusqueda";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import PaginationControls from "../components/PaginationControls";

const Buscar = () => {
  const [mostrarAvanzada, setMostrarAvanzada] = useState(false);
  const [query, setQuery] = useState("");
  const {
    resultados,
    cargando,
    error,
    realizarBusqueda,
    paginaActual,
    totalPaginas,
    cambiarPagina,
  } = useNuevaBusqueda();

  const toggleBusquedaAvanzada = () => {
    setMostrarAvanzada(!mostrarAvanzada);
  };

  const handleBasicSearch = () => {
    if (!query.trim()) return;
    realizarBusqueda({ q: query });
  };

  const handleAdvancedSearch = (params) => {
    const parametros = {
      q: query,
      language: params.idioma,
      from: params.publicado,
      to: params.publicado,
    };

    realizarBusqueda(parametros);
    toggleBusquedaAvanzada();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.contenido}>
            <Text style={styles.tituloSeccion}>
              Busca tus noticias de interés
            </Text>

            <View style={styles.barraBusqueda}>
              <TextInput
                style={styles.inputBusqueda}
                placeholder="¿Qué deseas buscar?......."
                placeholderTextColor={colores.textoTerciario}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleBasicSearch}
              />
              <Ionicons
                name="search-outline"
                size={20}
                color={colores.textoTerciario}
              />
            </View>

            <TouchableOpacity style={styles.boton} onPress={handleBasicSearch}>
              <Text style={styles.textoBoton}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkAvanzado}
              onPress={toggleBusquedaAvanzada}
            >
              <Text style={styles.textoLinkAvanzado}>
                {mostrarAvanzada
                  ? "Ocultar búsqueda avanzada"
                  : "Búsqueda avanzada"}
              </Text>
            </TouchableOpacity>

            {mostrarAvanzada && (
              <BusquedaAvanzada onBuscar={handleAdvancedSearch} />
            )}

            {cargando && <Text style={styles.mensaje}>Cargando...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            {!cargando && !error && resultados.length === 0 && (
              <Text style={styles.mensaje}>
                No hay noticias relacionadas con tu búsqueda
              </Text>
            )}

            {resultados.map((articulo, index) => (
              <TarjetaNoticia key={index} noticia={articulo} />
            ))}

            {/* Controles de paginación */}
            {resultados.length > 0 && totalPaginas > 1 && (
              <PaginationControls
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                cambiarPagina={cambiarPagina}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
  },
  barraBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBottom: espaciados.medio,
    paddingHorizontal: espaciados.medio,
  },
  inputBusqueda: {
    flex: 1,
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    paddingVertical: espaciados.medio,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.pequeño,
    paddingVertical: espaciados.pequeño,
    marginBottom: espaciados.medio,
    alignItems: "center",
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
  linkAvanzado: {
    alignItems: "center",
    paddingVertical: espaciados.pequeño,
  },
  textoLinkAvanzado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.medio,
  },
  resultado: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.pequeño,
    padding: espaciados.medio,
    marginBottom: espaciados.medio,
  },
  tituloResultado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.pequeño,
  },
  descripcionResultado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
  },
  mensaje: {
    color: colores.textoClaro,
    textAlign: "center",
    marginVertical: espaciados.medio,
    fontSize: tipografia.tamaños.normal,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: espaciados.medio,
  },
});

export default Buscar;
