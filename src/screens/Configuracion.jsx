import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useCategorias } from "../context/CategoriasContext";
import AuthButton from "../components/AuthButton";
import { AuthContext } from "../context/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  isBiometricSupported,
  saveBiometricPreference,
  clearBiometricPreference,
  getBiometricPreference,
} from "../utils/biometrics";
import useCurrentLocation from "../hooks/useCurrentLocation";

const Configuracion = ({ navigation }) => {
  const {
    categorias,
    toggleCategoria,
    guardarPreferencias,
    categoriasActualizadas,
  } = useCategorias();
  const { logout, user } = useContext(AuthContext);
  const { getCurrentLocation } = useCurrentLocation();

  const [nombre, setNombre] = useState(user?.name || "Usuario");
  const [usuario, setUsuario] = useState(user?.username || "");
  const [country, setCountry] = useState(user?.country || "No disponible");

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

    // Actualizar datos de usuario cuando cambie
    if (user) {
      setNombre(user.name || "Usuario");
      setUsuario(user.username || "");
      setCountry(user.country || "No disponible");
    }
  }, [user]);

  const handleGoBack = async () => {
    const guardadoExitoso = await guardarPreferencias();
    if (guardadoExitoso) {
      if (categoriasActualizadas) {
        // Si hubo cambios en las categorías, forzamos un refresh navegando a Inicio
        navigation.navigate("Home", {
          screen: "Inicio",
          params: {
            refreshNews: true,
            timestamp: new Date().getTime(),
          },
        });
      } else {
        navigation.navigate("Home", { screen: "Inicio" });
      }
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
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBiometricAuth = async () => {
    console.log("Navegando a Home con Inicio activo");
    const guardadoExitoso = await guardarPreferencias();
    if (guardadoExitoso) {
      if (categoriasActualizadas) {
        // Si hubo cambios en las categorías, forzamos un refresh
        navigation.navigate("Home", {
          screen: "Inicio",
          params: {
            refreshNews: true,
            timestamp: new Date().getTime(),
          },
        });
      } else {
        navigation.navigate("Home", { screen: "Inicio" });
      }
    } else {
      console.error("Error al guardar las preferencias");
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
          <View style={styles.seccion}>
            <View style={styles.containerPerfil}>
              <View style={styles.containerUsername}>
                <Ionicons name="person-outline" size={45} color={"white"} />
                <Text style={styles.username}>{usuario}</Text>
              </View>
              <Text style={styles.name}>{nombre}</Text>
              <View style={styles.countryUser}>
                <Ionicons name="location-outline" color="white" size={25} />
                <Text style={styles.countryName}>{country}</Text>
              </View>
            </View>
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
  containerPerfil: {
    flex: 1,
    color: "white",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBlock: 10,
    flexDirection: "column",
    gap: 20,
  },
  username: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "900",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  containerUsername: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  countryUser: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  countryName: {
    color: "white",
    fontSize: 20,
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
