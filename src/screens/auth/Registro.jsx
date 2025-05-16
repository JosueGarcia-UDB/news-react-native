import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, clearError, clearAllErrors } from '../../redux/validationSlice';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { colores, tipografia, espaciados, estilosComunes } from '../../styles/globales';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/AuthContext'; 

const Registro = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.validation.errors);
  const { register } = useContext(AuthContext); 

  const [name, setName] = useState('');
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [cp, setCP] = useState('');

  const validateFields = () => {
    dispatch(clearAllErrors());

    let hasError = false;

    if (!name.trim()) {
      dispatch(setError({ field: 'name', message: 'El nombre es obligatorio' }));
      hasError = true;
    }
    if (!u.trim()) {
      dispatch(setError({ field: 'username', message: 'El usuario es obligatorio' }));
      hasError = true;
    }
    if (!p.trim()) {
      dispatch(setError({ field: 'password', message: 'La contraseña es obligatoria' }));
      hasError = true;
    }
    if (p !== cp) {
      dispatch(setError({ field: 'confirmPassword', message: 'Las contraseñas no coinciden' }));
      hasError = true;
    }

    return hasError;
  };

  const handleReg = async () => {
    if (validateFields()) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: 'Por favor corrige los errores antes de continuar',
      });
      return;
    }

    try {
      await register(name.trim(), u.trim(), p.trim()); // Usar el contexto para registrar
      Toast.show({
        type: 'success',
        text1: '✅ Registro completo',
        text2: 'Tu cuenta ha sido creada con éxito',
      });
      nav.navigate('Login');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error',
        text2: e.message || 'Error desconocido',
      });
    }
  };

  return (
    <View style={estilosComunes.contenedorCentrado}>
            <Image style={styles.logo} source={require("../../assets/img/logo.png")}/>
      <View style={styles.form}>
        <Text style={styles.title}>INFONOW</Text>
        <Text style={styles.subtitle}>Registrarse</Text>
        <AuthInput
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => {
            setName(text);
            dispatch(clearError({ field: 'name' }));
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <AuthInput
          placeholder="Usuario"
          value={u}
          onChangeText={(text) => {
            setU(text);
            dispatch(clearError({ field: 'username' }));
          }}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        <AuthInput
          placeholder="Contraseña"
          secureTextEntry
          value={p}
          onChangeText={(text) => {
            setP(text);
            dispatch(clearError({ field: 'password' }));
          }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <AuthInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={cp}
          onChangeText={(text) => {
            setCP(text);
            dispatch(clearError({ field: 'confirmPassword' }));
          }}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 600,
    objectFit: 'contain',
    height: 100,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    fontSize: tipografia.tamaños.pequeño,
    marginBottom: espaciados.pequeño,
    alignSelf: 'flex-start',
  },
  linkRow: {
    flexDirection: 'row',
    marginTop: espaciados.pequeño,
  },
  textNormal: {
    color: colores.textoSecundario,
    marginRight: espaciados.pequeño,
  },
  textLink: {
    color: colores.primario,
    fontWeight: tipografia.pesos.semiBold,
  },
});

export default Registro;
