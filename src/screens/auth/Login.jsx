import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { colores, tipografia, espaciados, estilosComunes } from '../../styles/globales';

const Login = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View style={estilosComunes.contenedorCentrado}>
      <View style={styles.contenedorFormulario}>
        <Text style={styles.titulo}>INFONOW</Text>
        <Text style={styles.subtitulo}>Iniciar sesión</Text>
        
        <AuthInput 
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
        />
        
        <AuthInput 
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />
        
        <AuthButton 
          title="Ingresar"
          onPress={handleLogin}
        />
        
        <View style={styles.contenedorEnlace}>
          <Text style={styles.textoNormal}>¿Aún no tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.textoEnlace}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorFormulario: {
    width: '80%',
    alignItems: 'center',
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.grande,
  },
  subtitulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.semiBold,
    marginBottom: espaciados.medio,
    alignSelf: 'flex-start',
  },
  contenedorEnlace: {
    flexDirection: 'row',
    marginTop: espaciados.pequeño,
  },
  textoNormal: {
    color: colores.textoSecundario,
    marginRight: espaciados.pequeño,
  },
  textoEnlace: {
    color: colores.primario,
    fontWeight: tipografia.pesos.semiBold,
  },
});

export default Login;