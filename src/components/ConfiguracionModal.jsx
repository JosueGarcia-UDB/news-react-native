// components/ConfiguracionModal.js
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useCategorias } from "../context/CategoriasContext";

const ConfiguracionModal = ({ visible, onClose }) => {
  const { categorias, toggleCategoria, guardarPreferencias } = useCategorias();

  const handleGuardar = async () => {
    const guardadoExitoso = await guardarPreferencias();
    if (guardadoExitoso) {
      // Siempre indicar que se deben refrescar las noticias
      onClose(true);
    } else {
      // Mostrar un mensaje de error si es necesario
      console.error("No se pudieron guardar las preferencias");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.tituloSeccion}>
              Marca las categorías de tu interés
            </Text>

            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={styles.categoriaItem}
                onPress={() => toggleCategoria(categoria.id)}
              >
                <View style={styles.checkboxContainer}>
                  {categoria.seleccionada && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.nombreCategoria}>
                  {categoria.nombreCategoria}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Botón de guardar centrado */}
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Text style={styles.textoBotonGuardar}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#333",
    borderRadius: 4,
  },
  checkmark: {
    fontSize: 16,
    color: "white",
  },
  nombreCategoria: {
    fontSize: 16,
    color: "white",
  },
  botonGuardar: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotonGuardar: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default ConfiguracionModal;
