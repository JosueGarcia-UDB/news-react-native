import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colores, tipografia, espaciados } from "../styles/globales.js";
import { Picker } from "@react-native-picker/picker";

// Componente de búsqueda avanzada
const BusquedaAvanzada = ({ onBuscar }) => {
  const [idioma, setIdioma] = useState("");
  const [publicado, setPublicado] = useState("");

  // En BusquedaAvanzada.jsx
  const manejarBusqueda = () => {
    const parametros = {
      idioma: idioma.trim(),
      publicado: publicado.trim(),
    };
    onBuscar(parametros);
    console.log(parametros)
  };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Búsqueda avanzada</Text>
      <View style={styles.row}>
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Fecha de publicación</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={colores.textoTerciario}
            value={publicado}
            onChangeText={setPublicado}
          />
        </View>
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Idioma</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idioma}
              onValueChange={(itemValue) => setIdioma(itemValue)}
              style={styles.picker}
              dropdownIconColor={colores.textoClaro}
              mode="dropdown" // Para Android
              dropdownStyle={styles.dropdownStyle}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Todos" value="" style={styles.pickerItem} />
              <Picker.Item
                label="Español"
                value="es"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="Inglés"
                value="en"
                style={styles.pickerItem}
              />
            </Picker>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.boton} onPress={manejarBusqueda}>
        <Text style={styles.textoBoton}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    padding: espaciados.medio,
    marginVertical: espaciados.medio,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.semiBold,
    textAlign: "center",
    marginBottom: espaciados.medio,
  },
  campo: {
    marginBottom: espaciados.medio,
  },
  etiqueta: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    marginBottom: espaciados.pequeño,
  },
  input: {
    backgroundColor: colores.fondoOscuro,
    borderRadius: espaciados.radioBorde.pequeño,
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
    height: 40, // Altura uniforme para inputs
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: espaciados.medio,
  },
  widthInput: {
    flex: 1,
  },
  boton: {
    backgroundColor: colores.fondoOscuro,
    borderRadius: espaciados.radioBorde.pequeño,
    padding: espaciados.medio,
    alignItems: "center",
  },
  textoBoton: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.bold,
  },
  pickerContainer: {
    borderRadius: espaciados.radioBorde.pequeño,
    justifyContent: "center",
    height: 40,
    overflow: 'hidden',
  },
  dropdownStyle: {
    borderColor: colores.fondoOscuro,
  },
  pickerItem: {
    fontSize: tipografia.tamaños.normal,
    color: colores.textoClaro,
  },
  picker: {
    color: colores.textoClaro,
  },
});

export default BusquedaAvanzada;
