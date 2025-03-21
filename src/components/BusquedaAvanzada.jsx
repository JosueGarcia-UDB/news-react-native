import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { colores, tipografia, espaciados } from "../styles/globales.js";

const BusquedaAvanzada = ({ onBuscar }) => {
  const [idioma, setIdioma] = useState("");
  const [publicado, setPublicado] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeFecha = (event, selectedDate) => {
    setShowDatePicker(false); // Cierra el picker en ambos sistemas
    if (selectedDate) {
      const fechaFormateada = selectedDate.toISOString().split("T")[0];
      setPublicado(fechaFormateada);
    }
  };

  const manejarBusqueda = () => {
    onBuscar({
      idioma: idioma.trim(),
      publicado: publicado.trim(),
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Búsqueda avanzada</Text>
      <View style={styles.row}>
        {/* Selector de Fecha */}
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Fecha de publicación</Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.fechaBoton}
          >
            <Text style={styles.fechaTexto}>
              {publicado || "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={publicado ? new Date(publicado) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeFecha}
              locale="es-ES" // Español
              theme="light" // Tema claro
            />
          )}
        </View>
        {/* Selector de Idioma */}
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Idioma</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idioma}
              onValueChange={setIdioma}
              style={styles.picker}
              dropdownIconColor={colores.textoClaro}
              mode="dropdown"
            >
              <Picker.Item label="Todos" value="" />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="Inglés" value="en" />
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

// Mantenemos los mismos estilos que tenías originalmente
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: espaciados.medio,
  },
  widthInput: {
    flex: 1,
  },
  campo: {
    marginBottom: espaciados.medio,
  },
  etiqueta: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    marginBottom: espaciados.pequeño,
  },
  fechaBoton: {
    backgroundColor: colores.fondoOscuro,
    borderRadius: espaciados.radioBorde.pequeño,
    paddingVertical: espaciados.pequeño,
    paddingHorizontal: espaciados.medio,
    height: 40,
    justifyContent: "center",
  },
  fechaTexto: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
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
    overflow: "hidden",
    backgroundColor: colores.fondoOscuro,
  },
  picker: {
    color: colores.textoClaro,
    backgroundColor: colores.fondoOscuro,
  },
});

export default BusquedaAvanzada;