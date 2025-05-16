import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import {
  colores,
  tipografia,
  espaciados,
  estilosComunes,
} from "../../styles/globales";
import { AuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const Login = () => {
  const navigation = useNavigation();
  const { login, user, loading, updateUserCountry } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getCurrentLocation } = useCurrentLocation();

  // Redirección mejorada
  React.useEffect(() => {
    if (user && !loading) {
      // Si el usuario ya tiene un país asociado, redirige directamente
      if (user.country) {
        navigation.reset({
          routes: [{ name: "Inicio" }],
        });
      } else {
        // Si es la primera vez, solicita ubicación
        requestLocationPermission();
      }
    }
  }, [user, loading]);

  const requestLocationPermission = () => {
    Alert.alert(
      "Permiso de ubicación",
      "¿Nos permites acceder a tu ubicación para mostrarte noticias de tu país?",
      [
        {
          text: "No, gracias",
          onPress: () => {
            // Si el usuario rechaza, navegamos normalmente sin guardar país
            navigation.reset({
              index: 0,
              routes: [{ name: "Inicio" }],
            });
          },
          style: "cancel",
        },
        {
          text: "Sí, permitir",
          onPress: handleGetLocation,
        },
      ]
    );
  };

  const handleGetLocation = async () => {
    if (!user) return;

    try {
      const locationData = await getCurrentLocation(false); // No mostrar alerta adicional

      if (locationData && locationData.country) {
        // Actualiza el usuario con el país
        await updateUserCountry(locationData.country);
      }

      // Redirecciona después de obtener (o intentar obtener) la ubicación
      navigation.reset({
        index: 0,
        routes: [{ name: "Inicio" }],
      });
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      // Redirigir de todos modos incluso si hay error
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };

  const handleLogin = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        Toast.show({
          type: "error",
          text1: "⚠️ Error",
          text2: "Todos los campos son obligatorios",
        });
        return;
      }

      await login(username.trim(), password.trim());
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        Toast.show({
          type: "error",
          text1: "❌ Error",
          text2: "El usuario no existe",
        });
      } else if (error.message === "Contraseña incorrecta") {
        Toast.show({
          type: "error",
          text1: "🔒 Error",
          text2: "La contraseña es incorrecta",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "⚠️ Error",
          text2: error.message || "Error desconocido",
        });
      }
    }
  };

  return (
    <View style={estilosComunes.contenedorCentrado}>
      <Image style={styles.logo} source={require("../../assets/img/logo.png")}/>
      <View style={styles.form}>
        <Text style={styles.title}>INFONOW</Text>
        <Text style={styles.subtitle}>Iniciar sesión</Text>

        <AuthInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <AuthInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AuthButton
          title={loading ? "Cargando..." : "Ingresar"}
          onPress={handleLogin}
          disabled={loading}
        />

        <View style={styles.linkRow}>
          <Text style={styles.textNormal}>¿Aún no tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text style={styles.textLink}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    width: "80%",
    alignItems: "center",
  },
  logo: {
    width: 500,
    objectFit: 'contain',
    height: 100,
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
    alignSelf: "flex-start",
  },
  linkRow: {
    flexDirection: "row",
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

export default Login;
