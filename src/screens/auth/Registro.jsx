import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';

import {colores, tipografia, espaciados, estilosComunes} from '../../styles/globales';

const Registro = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
  
    const handleRegistro = () => {
      navigation.navigate('Login');
    };

    return (
        <View style={estilosComunes.contenedorCentrado}>
          <View style={styles.contenedorFormulario}>
            <Text style={styles.titulo}>INFONOW</Text>
            <Text style={styles.subtitulo}>Registrarse</Text>
            
            <AuthInput 
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            
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
            
            <AuthInput 
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
            />
            
            <AuthButton 
              title="Crear cuenta"
              onPress={handleRegistro}
            />
            
            <View style={styles.contenedorEnlace}>
              <Text style={styles.textoNormal}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textoEnlace}>Iniciar sesión</Text>
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
      subtitulo: {
        color: colores.textoClaro,
        fontSize: tipografia.tamaños.grande,
        fontWeight: tipografia.pesos.semiBold,
        marginBottom: espaciados.medio,
        alignSelf: 'flex-start',
      },
    });
export default Registro;