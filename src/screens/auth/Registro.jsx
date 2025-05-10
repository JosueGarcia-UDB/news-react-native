import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthInput   from '../../components/AuthInput';
import AuthButton  from '../../components/AuthButton';
import { colores, tipografia, espaciados, estilosComunes } from '../../styles/globales';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

const Registro = () => {
  const nav         = useNavigation();
  const { register, user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [u, setU]       = useState('');
  const [p, setP]       = useState('');
  const [cp, setCP]     = useState('');

  // Al detectar user (por auto-login o manual), vuelve al login
  useEffect(() => {
    if (user) {
      Toast.show({
        type: 'success',
        text1: '¡Bienvenido!',
        text2: 'Tu cuenta se creó con éxito',
      });
      nav.navigate('Login');
    }
  }, [user]);

  const handleReg = async () => {
    if (!name.trim() || !u.trim() || !p.trim() || !cp.trim()) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: 'Todos los campos son obligatorios',
      });
      return;
    }

    if (p !== cp) {
      Toast.show({
        type: 'error',
        text1: '🔒 Error',
        text2: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      await register(name.trim(), u.trim(), p.trim());
      Toast.show({
        type: 'success',
        text1: '✅ Registro completo',
        text2: 'Tu cuenta ha sido creada con éxito',
      });
      nav.navigate('Login');
    } catch (e) {
      if (e.message === 'El usuario ya existe') {
        Toast.show({
          type: 'error',
          text1: '❌ Error',
          text2: 'El nombre de usuario ya está en uso',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: '⚠️ Error',
          text2: e.message || 'Error desconocido',
        });
      }
    }
  };

  return (
    <View style={estilosComunes.contenedorCentrado}>
      <View style={styles.form}>
        <Text style={styles.title}>INFONOW</Text>
        <Text style={styles.subtitle}>Registrarse</Text>
        <AuthInput placeholder="Nombre" value={name} onChangeText={setName} />
        <AuthInput placeholder="Usuario" value={u} onChangeText={setU} />
        <AuthInput placeholder="Contraseña" secureTextEntry value={p} onChangeText={setP} />
        <AuthInput placeholder="Confirmar contraseña" secureTextEntry value={cp} onChangeText={setCP} />
        <AuthButton title="Crear cuenta" onPress={handleReg} />
        <View style={styles.linkRow}>
          <Text style={styles.textNormal}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <Text style={styles.textLink}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '80%', alignItems: 'center'
  },
  title: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.grande,
  },
  subtitle: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.semiBold,
    marginBottom: espaciados.medio,
    alignSelf: 'flex-start',
  },
  linkRow: {
    flexDirection: 'row', marginTop: espaciados.pequeño,
  },
  textNormal: {
    color: colores.textoSecundario, marginRight: espaciados.pequeño
  },
  textLink: {
    color: colores.primario, fontWeight: tipografia.pesos.semiBold
  },
});

export default Registro;
