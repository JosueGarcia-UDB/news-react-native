import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const CambiarContrasenia = () => {
  const navigation = useNavigation();
  const { changePassword, logout } = useContext(AuthContext);
  const [contraseniaActual, setContraseniaActual] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

  const handleChange = async () => {
    if (!contraseniaActual.trim() || !nuevaContrasenia.trim() || !confirmarContrasenia.trim()) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: 'Todos los campos son obligatorios',
      });
      return;
    }

    if (nuevaContrasenia !== confirmarContrasenia) {
      Toast.show({
        type: 'error',
        text1: '🔒 Error',
        text2: 'Las contraseñas nuevas no coinciden',
      });
      return;
    }

    try {
      await changePassword(contraseniaActual.trim(), nuevaContrasenia.trim());
      Toast.show({
        type: 'success',
        text1: '✅ Éxito',
        text2: 'Contraseña actualizada correctamente',
      });
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: error.message || 'No se pudo cambiar la contraseña',
      });
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
     
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contenido}>
        <AuthInput
          placeholder="Contraseña anterior"
          secureTextEntry
          value={contraseniaActual}
          onChangeText={setContraseniaActual}
        />
        <AuthInput
          placeholder="Nueva contraseña"
          secureTextEntry
          value={nuevaContrasenia}
          onChangeText={setNuevaContrasenia}
        />
        <AuthInput
          placeholder="Confirmar nueva contraseña"
          secureTextEntry
          value={confirmarContrasenia}
          onChangeText={setConfirmarContrasenia}
        />
        <View style={styles.botonContainer}>
          <AuthButton
            title="Confirmar cambios"
            onPress={handleChange}
            style={styles.botonGuardar}
            
          />
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
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: 20,
  },
  botonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  botonGuardar: {
    width: '80%', 
    paddingVertical: 12,
    borderRadius: 10,
    color: 'white',
  },
});

export default CambiarContrasenia;