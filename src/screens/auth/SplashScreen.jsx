import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colores, tipografia, estilosComunes } from '../../styles/globales';

const SplashScreen = ({ onAnimationComplete }) => {  // Recibe `onAnimationComplete` como prop
    console.log('Props recibidas:', { onAnimationComplete }); // Antes del useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete(); // Llama a la función cuando termine el splash
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <View style={[estilosComunes.contenedorCentrado, styles.contenedor]}>
      <Image 
        source={require('../../assets/img/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.titulo}>INFONOW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.fondoOscuro,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
  },
});

export default SplashScreen;