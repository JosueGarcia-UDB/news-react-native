import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { ScrollView } from 'react-native';
import {colores, tipografia, espaciados, estilosComunes} from '../styles/globales';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditarPerfil = () =>{
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleGoBack = async () => {
        navigation.goBack();
      };
    return(
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.cabecera}>
                <TouchableOpacity 
                    style={styles.botonAtras}
                    onPress={handleGoBack}
                >
                    <Text style={styles.iconoAtras}>←</Text>
                    <Text style={styles.textoAtras}>Editar Perfil</Text>
                </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollView}>
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
                        placeholder="Confirmar Contraseña"
                        secureTextEntry
                        value={contrasena}
                        onChangeText={setContrasena}
                    />
                    <View style={styles.seccion}>
                <AuthButton 
                title="Confirmar cambios" 
                onPress={handleGoBack
                } 
                style={[styles.botonConfig, styles.botonCerrarSesion]}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    marginTop: Platform.OS === "ios" ? 0 : 20
  },
  botonConfig: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
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
  botonFondoGris: {
    backgroundColor: '#423E3E',
  },
  botonCerrarSesion: {
    backgroundColor: '#BA1816',
  },
});

export default EditarPerfil;

