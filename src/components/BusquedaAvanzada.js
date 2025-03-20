import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colores, tipografia, espaciados } from '../styles/globales.js';

// Componente de búsqueda avanzada
const BusquedaAvanzada = ({ onBuscar }) => {
  const [fuente, setFuente] = useState('');
  const [dominio, setDominio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [idioma, setIdioma] = useState('');
  const [orden, setOrden] = useState('relevancy');

  const manejarBusqueda = () => {
    const parametros = {};
    if (fuente.trim()) parametros.fuente = fuente.trim();
    if (dominio.trim()) parametros.dominio = dominio.trim();
    if (fechaInicio.trim()) parametros.fechaInicio = fechaInicio.trim();
    if (fechaFin.trim()) parametros.fechaFin = fechaFin.trim();
    if (idioma.trim()) parametros.idioma = idioma.trim();
    if (orden.trim()) parametros.orden = orden.trim();

    // Depurar los parámetros enviados
    console.log('Parámetros enviados:', parametros);

    onBuscar(parametros);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Búsqueda avanzada</Text>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Fuentes</Text>
        <TextInput
          style={styles.input}
          placeholder="sobre-diario-libre"
          placeholderTextColor={colores.textoTerciario}
          value={fuente}
          onChangeText={setFuente}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Dominio</Text>
        <TextInput
          style={styles.input}
          placeholder="diariolibre.com"
          placeholderTextColor={colores.textoTerciario}
          value={dominio}
          onChangeText={setDominio}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Fecha de publicación</Text>
        <View style={styles.filaTechas}>
          <TextInput
            style={[styles.input, styles.inputMitad]}
            placeholder="2024-01-01"
            placeholderTextColor={colores.textoTerciario}
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />
          <TextInput
            style={[styles.input, styles.inputMitad]}
            placeholder="2025-01-01"
            placeholderTextColor={colores.textoTerciario}
            value={fechaFin}
            onChangeText={setFechaFin}
          />
        </View>
      </View>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Idioma</Text>
        <TextInput
          style={styles.input}
          placeholder="es o en"
          placeholderTextColor={colores.textoTerciario}
          value={idioma}
          onChangeText={setIdioma}
        />
      </View>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Ordenar por</Text>
        <TextInput
          style={styles.input}
          placeholder="relevancy, popularity, publishedAt"
          placeholderTextColor={colores.textoTerciario}
          value={orden}
          onChangeText={setOrden}
        />
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
    textAlign: 'center',
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
  },
  filaTechas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputMitad: {
    width: '48%',
  },
  boton: {
    backgroundColor: colores.fondoOscuro,
    borderRadius: espaciados.radioBorde.pequeño,
    padding: espaciados.medio,
    alignItems: 'center',
  },
  textoBoton: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.bold,
  },
});

export default BusquedaAvanzada;
