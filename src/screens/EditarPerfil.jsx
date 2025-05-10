import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const EditarPerfil = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useContext(AuthContext);
  const [nombre, setNombre] = useState(user?.name || '');
  const [usuario, setUsuario] = useState(user?.username || '');
  const [contraseniaActual, setContraseniaActual] = useState('');

  const handleSave = async () => {
    try {
      if (!contraseniaActual.trim()) {
        Toast.show({
          type: 'error',
          text1: '⚠️ Error',
          text2: 'Debes ingresar tu contraseña actual',
        });
        return;
      }

      if (contraseniaActual !== user.password) {
        Toast.show({
          type: 'error',
          text1: '🔒 Error',
          text2: 'La contraseña actual es incorrecta',
        });
        return;
      }

      if (!nombre.trim() || !usuario.trim()) {
        Toast.show({
          type: 'error',
          text1: '⚠️ Error',
          text2: 'Todos los campos son obligatorios',
        });
        return;
      }

      await updateProfile(nombre.trim(), usuario.trim());
      Toast.show({
        type: 'success',
        text1: '✅ Éxito',
        text2: 'Perfil actualizado correctamente',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: error.message || 'No se pudo actualizar el perfil',
      });
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.cabecera}>
        <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
          <Text style={styles.iconoAtras}>←</Text>
          <Text style={styles.textoAtras}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contenido}>
        <AuthInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <AuthInput placeholder="Usuario" value={usuario} onChangeText={setUsuario} />
        <AuthInput
          placeholder="Contraseña actual"
          secureTextEntry
          value={contraseniaActual}
          onChangeText={setContraseniaActual}
        />
        <View style={styles.botonContainer}>
          <AuthButton
            title="Confirmar cambios"
            onPress={handleSave}
            style={styles.botonGuardar}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#1E1E1E', marginTop: Platform.OS === 'ios' ? 0 : 20 },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  botonAtras: { flexDirection: 'row', alignItems: 'center' },
  iconoAtras: { fontSize: 24, marginRight: 10, color: 'white' },
  textoAtras: { fontSize: 18, color: 'white' },
  scrollView: { flex: 1 },
  contenido: { padding: 20 },
  botonContainer: {
    alignItems: 'center', 
    marginTop: 20,
  },
  botonGuardar: {
    width: '80%', 
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#BA1816',
  },
  botonCerrarSesion: { backgroundColor: '#BA1816' },
});

export default EditarPerfil;