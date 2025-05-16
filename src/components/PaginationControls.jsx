import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colores, tipografia, espaciados } from "../styles/globales.js";

const PaginationControls = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  // No mostrar controles si solo hay una página
  if (totalPaginas <= 1) return null;

  // Función para generar los números de página a mostrar
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Número máximo de páginas a mostrar

    if (totalPaginas <= maxVisiblePages) {
      // Si hay menos páginas que el máximo, mostrar todas
      for (let i = 1; i <= totalPaginas; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1);

      // Calcular el rango de páginas a mostrar alrededor de la página actual
      let start = Math.max(2, paginaActual - 1);
      let end = Math.min(totalPaginas - 1, paginaActual + 1);

      // Ajustar si estamos en los extremos
      if (paginaActual <= 2) {
        end = Math.min(totalPaginas - 1, 4);
      } else if (paginaActual >= totalPaginas - 1) {
        start = Math.max(2, totalPaginas - 3);
      }

      // Agregar puntos suspensivos si hay un salto desde la primera página
      if (start > 2) {
        pages.push("...");
      }

      // Agregar las páginas del medio
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Agregar puntos suspensivos si hay un salto hasta la última página
      if (end < totalPaginas - 1) {
        pages.push("...");
      }

      // Siempre mostrar la última página
      if (totalPaginas > 1) {
        pages.push(totalPaginas);
      }
    }

    return pages;
  };

  return (
    <View style={styles.paginationContainer}>
      {/* Botón Anterior */}
      <TouchableOpacity
        style={[
          styles.paginationButton,
          paginaActual === 1 && styles.paginationButtonDisabled,
        ]}
        onPress={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        <Text
          style={[
            styles.paginationButtonText,
            paginaActual === 1 && styles.paginationButtonTextDisabled,
          ]}
        >
          Anterior
        </Text>
      </TouchableOpacity>

      {/* Números de página */}
      <View style={styles.paginationNumbers}>
        {getPaginationNumbers().map((page, index) => (
          <TouchableOpacity
            key={`page-${index}`}
            style={[
              styles.pageNumber,
              page === paginaActual && styles.currentPage,
              page === "..." && styles.ellipsis,
            ]}
            onPress={() => page !== "..." && cambiarPagina(page)}
            disabled={page === "..." || page === paginaActual}
          >
            <Text
              style={[
                styles.pageNumberText,
                page === paginaActual && styles.currentPageText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón Siguiente */}
      <TouchableOpacity
        style={[
          styles.paginationButton,
          paginaActual === totalPaginas && styles.paginationButtonDisabled,
        ]}
        onPress={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        <Text
          style={[
            styles.paginationButtonText,
            paginaActual === totalPaginas &&
              styles.paginationButtonTextDisabled,
          ]}
        >
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: espaciados.grande,
  },
  paginationButton: {
    backgroundColor: colores.boton,
    paddingVertical: espaciados.pequeño,
    paddingHorizontal: espaciados.pequeño,
    borderRadius: espaciados.radioBorde.pequeño,
  },
  paginationButtonDisabled: {
    backgroundColor: colores.fondoClaro,
  },
  paginationButtonText: {
    color: colores.textoBoton,
    fontSize: tipografia.tamaños.pequeño,
    fontWeight: tipografia.pesos.medio,
  },
  paginationButtonTextDisabled: {
    color: colores.textoSecundario,
  },
  paginationNumbers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  pageNumber: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: colores.fondoTarjeta,
  },
  pageNumberText: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.pequeño,
  },
  currentPage: {
    backgroundColor: colores.boton,
  },
  currentPageText: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.negrita,
  },
  ellipsis: {
    backgroundColor: "transparent",
  },
});

export default PaginationControls;
