import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colores, tipografia, espaciados } from '../styles/globales.js';


//componente de busqueda avanzada
//practimaente son todos los fields del mini formulario
const BusquedaAvanzada = () => {
  return (
    <View style={styles.contenedor}> 
      <Text style={styles.titulo}>Búsqueda avanzada</Text>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Fuentes</Text>
        <TextInput 
          style={styles.input}
          placeholder="sobre-diario-libre"
          placeholderTextColor={colores.textoTerciario}
        />
      </View>
      
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Dominio</Text>
        <TextInput 
          style={styles.input}
          placeholder="diariolibre.com"
          placeholderTextColor={colores.textoTerciario}
        />
      </View>
      
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Fecha de publicación</Text>
        <View style={styles.filaTechas}>
          <TextInput 
            style={[styles.input, styles.inputMitad]}
            placeholder="2024"
            placeholderTextColor={colores.textoTerciario}
          />
          <TextInput 
            style={[styles.input, styles.inputMitad]}
            placeholder="2025"
            placeholderTextColor={colores.textoTerciario}
          />
        </View>
      </View>
      
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Idioma</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={styles.textoSelector}>Seleccionar idioma</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Ordenar por</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={styles.textoSelector}>Relevancia</Text>
        </TouchableOpacity>
      </View>
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
  selector: {
    backgroundColor: colores.fondoOscuro,
    borderRadius: espaciados.radioBorde.pequeño,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
  },
  textoSelector: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.normal,
  },
  iconoSelector: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
  },
});

export default BusquedaAvanzada;