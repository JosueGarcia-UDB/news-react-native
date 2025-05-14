import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import useCategorias from "../hooks/useCategorias";
import AuthButton from "../components/AuthButton";
import { AuthContext } from "../context/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";
4;
import { useState, useEffect } from "react";
import {
  isBiometricSupported,
  saveBiometricPreference,
  clearBiometricPreference,
  getBiometricPreference,
} from "../utils/biometrics";

const Configuracion = ({ navigation }) => {
  const { categorias, toggleCategoria, guardarPreferencias } = useCategorias();
  const { logout } = useContext(AuthContext);

  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    const loadBiometricSetting = async () => {
      const available = await isBiometricSupported();
      setBiometricAvailable(available);
      const savedPref = await getBiometricPreference();
      setBiometricEnabled(savedPref || false);
    };
    loadBiometricSetting();
  }, []);

  const handleGoBack = async () => {
    const guardadoExitoso = await guardarPreferencias();
    if (guardadoExitoso) {
      navigation.navigate("MainApp", { screen: "Inicio" });
    } else {
      console.error("Error al guardar las preferencias");
    }
  };

  const handleBiometricToggle = async () => {
    if (!biometricAvailable) {
      alert("Este dispositivo no soporta autenticación biométrica.");
      return;
    }

    if (!biometricEnabled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirma tu huella para activar",
      });

      if (result.success) {
        await saveBiometricPreference(true);
        setBiometricEnabled(true);
        alert("Autenticación biométrica activada.");
      } else {
        alert("No se pudo activar la huella.");
      }
    } else {
      await saveBiometricPreference(false);
      setBiometricEnabled(false);
      alert("Autenticación biométrica desactivada.");
    }
  };

  const handleLogout = async () => {
    try {
      await clearBiometricPreference(); // Desvincular la huella
      await logout();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBiometricAuth = async () => {
    console.log("Navegando a MainApp con Inicio activo");
    const guardadoExitoso = await guardarPreferencias();
    if (guardadoExitoso) {
      navigation.navigate("MainApp", { screen: "Inicio" });
    } else {
      console.error("Error al guardar las preferencias");
    }
  };

  console.log("Rutas disponibles:", navigation.getState().routes);

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Cuenta</Text>
            <AuthButton
              title="Editar perfil"
              onPress={() => navigation.navigate("EditarPerfil")}
              style={[styles.botonConfig, styles.botonFondoGris]}
            />
            <AuthButton
              title="Cambiar contraseña"
              onPress={() => navigation.navigate("CambiarContrasenia")}
              style={[styles.botonConfig, styles.botonFondoGris]}
            />
          </View>

          <Text style={styles.tituloSeccion}>Preferencias</Text>
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={styles.categoriaItem}
              onPress={() => toggleCategoria(categoria.id)}
            >
              <View style={styles.checkboxContainer}>
                {categoria.seleccionada && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.nombreCategoria}>
                {categoria.nombreCategoria}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.seccion}>
            <AuthButton
              title={
                biometricEnabled
                  ? "Desactivar inicio con huella"
                  : "Activar inicio con huella"
              }
              onPress={handleBiometricToggle}
              style={styles.botonConfig}
            />
          </View>

          <View style={styles.seccion}>
            <AuthButton
              title="Cerrar sesión"
              onPress={handleLogout}
              style={[styles.botonConfig, styles.botonFondoGris]}
            /> 
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  cabecera: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: 20,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#333",
  },
  checkmark: {
    fontSize: 16,
    color: "white",
  },
  nombreCategoria: {
    fontSize: 16,
    color: "white",
  },
  botonFondoGris: {
    backgroundColor: "#414141",
  },
  botonConfig: {
    marginBottom: 10,
  },
});

export default Configuracion;
