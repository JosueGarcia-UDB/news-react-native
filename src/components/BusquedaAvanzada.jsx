import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { colores, tipografia, espaciados } from "../styles/globales.js";

const BusquedaAvanzada = ({ onBuscar }) => {
  const [idioma, setIdioma] = useState("");
  const [publicado, setPublicado] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const onChangeFecha = (_, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
    
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        const fechaFormateada = currentDate.toISOString().split("T")[0];
        setPublicado(fechaFormateada);
      }
    }
  };

  const confirmarFechaIOS = () => {
    const fechaFormateada = tempDate.toISOString().split("T")[0];
    setPublicado(fechaFormateada);
    setShowDatePicker(false);
  };

  const cancelarFechaIOS = () => {
    setShowDatePicker(false);
  };

  const manejarBusqueda = () => {
    onBuscar({
      idioma: idioma.trim(),
      publicado: publicado.trim(),
    });
  };

  // Renderizado condicional para iOS
  const renderDatePickerIOS = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={cancelarFechaIOS} style={styles.modalButton}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Seleccionar fecha</Text>
              <TouchableOpacity onPress={confirmarFechaIOS} style={styles.modalButton}>
                <Text style={styles.aceptarTexto}>Aceptar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={onChangeFecha}
                themeVariant="light"
                locale="es-ES"
                style={styles.iosDatePicker}
                textColor={colores.textoClaro}
                accentColor={colores.textoClaro}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Búsqueda avanzada</Text>
      <View style={styles.row}>
        {/* Selector de Fecha */}
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Fecha de publicación</Text>
          <TouchableOpacity
            onPress={() => {
              setTempDate(publicado ? new Date(publicado) : new Date());
              setShowDatePicker(true);
            }}
            style={styles.fechaBoton}
          >
            <Text style={styles.fechaTexto}>
              {publicado || "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {/* Para Android */}
          {showDatePicker && Platform.OS === "android" && (
            <DateTimePicker
              value={publicado ? new Date(publicado) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeFecha}
              locale="es-ES"
            />
          )}

          {/* Para iOS, se renderiza un Modal */}
          {Platform.OS === "ios" && renderDatePickerIOS()}
        </View>

        {/* Selector de Idioma */}
        <View style={[styles.campo, styles.widthInput]}>
          <Text style={styles.etiqueta}>Idioma</Text>
          <View style={styles.pickerContainer}>
            {Platform.OS === "ios" ? (
              <Picker
                selectedValue={idioma}
                onValueChange={setIdioma}
                style={styles.pickerIOS}
                itemStyle={styles.pickerItemIOS}
              >
                <Picker.Item label="Todos" value="" />
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="Inglés" value="en" />
              </Picker>
            ) : (
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
            )}
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
  
  // Estilos para el Picker
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
    height: 60,
  },
  pickerIOS: {
    color: colores.textoClaro,
    height: 120,
    width: '100%',
    backgroundColor: colores.fondoTarjeta
  },
  pickerItemIOS: {
    color: colores.textoClaro,
    height: 120,
    fontSize: tipografia.tamaños.normal,
  },
  
  // Estilos para el Modal de iOS
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colores.fondoTarjeta,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: espaciados.medio,
    borderBottomWidth: 1,
    borderBottomColor: colores.fondoOscuro,
  },
  modalTitle: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.semiBold,
  },
  modalButton: {
    padding: espaciados.pequeño,
  },
  cancelarTexto: {
    color: colores.peligro || '#ff6b6b',
    fontSize: tipografia.tamaños.normal,
  },
  aceptarTexto: {
    color: colores.principal || '#4ecdc4',
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.semiBold,
  },
  datePickerContainer: {
    alignItems: 'center',
    padding: espaciados.pequeño,
  },
  iosDatePicker: {
    width: '100%',
    height: 200,
  },
});

export default BusquedaAvanzada;