import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Configuracion = ({ navigation }) => {
  const [categorias, setCategorias] = useState([
    { id: '1', nombre: 'Negocios', seleccionada: true },
    { id: '2', nombre: 'Entretenimiento', seleccionada: true },
    { id: '3', nombre: 'General', seleccionada: true },
    { id: '4', nombre: 'Salud', seleccionada: true },
    { id: '5', nombre: 'Ciencia', seleccionada: true },
    { id: '6', nombre: 'Deportes', seleccionada: true },
    { id: '7', nombre: 'Tecnología', seleccionada: true },
  ]);

  const toggleCategoria = (id) => {
    setCategorias(categorias.map(cat => 
      cat.id === id ? { ...cat, seleccionada: !cat.seleccionada } : cat
    ));
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.cabecera}>
        <TouchableOpacity 
          style={styles.botonAtras}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.iconoAtras}>←</Text>
          <Text style={styles.textoAtras}>Configuración</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
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
              <Text style={styles.nombreCategoria}>{categoria.nombre}</Text>
            </TouchableOpacity>
          ))}
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
  cabecera: {
    paddingHorizontal: espaciados.margenContenedor,
    paddingVertical: espaciados.medio,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  botonAtras: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoAtras: {
    fontSize: tipografia.tamaños.grande,
    color: colores.textoClaro,
    marginRight: espaciados.pequeño,
  },
  textoAtras: {
    fontSize: tipografia.tamaños.medio,
    color: colores.textoClaro,
    fontWeight: tipografia.pesos.semiBold,
  },
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: espaciados.margenContenedor,
  },
  tituloSeccion: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    marginBottom: espaciados.grande,
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: espaciados.medio,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colores.primario,
    marginRight: espaciados.medio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.negrita,
  },
  nombreCategoria: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
  },
});

export default Configuracion;