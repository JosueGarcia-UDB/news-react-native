// screens/Bloqueado.js
import React from "react";
import { View, Text, Button, StyleSheet, Image} from "react-native";
import AuthButton from "../../components/AuthButton"; // Asegúrate de que la ruta sea correcta
import { colores } from "../../styles/globales";

const Bloqueado = ({ navigation, checkBiometricOnLaunch }) => {

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.text}>Acceso bloqueado</Text>
      <AuthButton title="Reintentar" onPress={checkBiometricOnLaunch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    backgroundColor: colores.fondoOscuro,
    alignItems: "center",
    padding: 20,
  },
  text: { 
    fontSize: 18, 
    marginBottom: 20, 
    color: colores.textoClaro,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Bloqueado;
