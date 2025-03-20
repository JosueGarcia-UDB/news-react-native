import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { colores, tipografia, espaciados } from '../styles/globales.js';


// componente del header
// este componente representa el header de la aplicación, que incluye el logo y un botón de configuración.
const Header = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogo}>
        {/* esta es la sección del logo */}
        <Image source={require('../assets/img/logo.png')} style={styles.imagenLogo} />
        <Text style={styles.textoLogo}>INFONOW</Text>
      </View>
      {/* este es el icono de configuración */}
      <TouchableOpacity style={styles.botonAjustes} onPress={() => navigation.navigate('Configuracion')}>
        <Ionicons name="settings-outline" size={24} color={colores.textoClaro} />
      </TouchableOpacity>
    </View>
  );
};

//estilos 
const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaciados.margenContenedor,
    paddingVertical: espaciados.base,
    backgroundColor: colores.fondoOscuro,
  },
  contenedorLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagenLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textoLogo: {
    color: colores.textoClaro,
    fontWeight: tipografia.pesos.negrita,
    fontSize: tipografia.tamaños.grande,
    marginLeft: espaciados.pequeño,
  },
  botonAjustes: {
    padding: espaciados.minimo,
  },
});

export default Header;
