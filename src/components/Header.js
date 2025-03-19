import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Header = () => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogo}>
      <Image source={require('../assets/img/logo.png')}style={styles.imagenLogo}/>
        <Text style={styles.textoLogo}>INFONOW</Text>
      </View>
      <TouchableOpacity style={styles.botonAjustes}>
        <Ionicons name="settings-outline" size={24} color={colores.textoClaro} />
      </TouchableOpacity>
    </View>
  );
};

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