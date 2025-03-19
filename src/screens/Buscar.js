import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Cabecera from '../components/Header.js';
import BusquedaAvanzada from '../components/BusquedaAvanzada.js';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Buscar = () => {
  const [mostrarAvanzada, setMostrarAvanzada] = useState(false);

  const toggleBusquedaAvanzada = () => {
    setMostrarAvanzada(!mostrarAvanzada);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
    <Cabecera />
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
          />
          <Ionicons name="search-outline" size={20} color={colores.textoTerciario} />
        </View>
        
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>Buscar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkAvanzado}
          onPress={toggleBusquedaAvanzada}
        >
          <Text style={styles.textoLinkAvanzado}>
            {mostrarAvanzada ? 'Ocultar búsqueda avanzada' : 'Búsqueda avanzada'}
          </Text>
        </TouchableOpacity>
        
        {mostrarAvanzada && <BusquedaAvanzada />}
      </View>
    </ScrollView>
  </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  iconoBusqueda: {
    fontSize: tipografia.tamaños.medio,
    marginLeft: espaciados.pequeño,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.pequeño,
    paddingVertical: espaciados.pequeño,
    marginBottom: espaciados.medio,
    alignItems: 'center',
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
  linkAvanzado: {
    alignItems: 'center',
    paddingVertical: espaciados.pequeño,
  },
  textoLinkAvanzado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.medio,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: colores.fondoOscuro,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingBottom: espaciados.pequeño,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: espaciados.pequeño,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: colores.primario,
  },
  navIcon: {
    fontSize: tipografia.tamaños.medio,
    marginBottom: espaciados.minimo,
  },
  navText: {
    color: colores.textoTerciario,
    fontSize: tipografia.tamaños.pequeño,
  },
  navTextActive: {
    color: colores.textoClaro,
  }
});

export default Buscar;