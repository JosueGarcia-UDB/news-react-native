import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import useCategorias from '../hooks/useCategorias'

const Configuracion = ({ navigation }) => {
  const { categorias, toggleCategoria, guardarPreferencias } = useCategorias();

  const handleGoBack = async () => {
    await guardarPreferencias();
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.cabecera}>
        <TouchableOpacity 
          style={styles.botonAtras}
          onPress={handleGoBack}
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
              <Text style={styles.nombreCategoria}>{categoria.nombreCategoria}</Text>
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
    backgroundColor: '#1E1E1E',
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  botonAtras: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconoAtras: {
    fontSize: 24,
    marginRight: 10,
    color: 'white', 
  },
  textoAtras: {
    fontSize: 18,
    color: 'white', 
  },
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: 20,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', 
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#555', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#333', 
  },
  checkmark: {
    fontSize: 16,
    color: 'white', 
  },
  nombreCategoria: {
    fontSize: 16,
    color: 'white', 
  },
});

export default Configuracion;