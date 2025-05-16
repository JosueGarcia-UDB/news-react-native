import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import Inicio from './src/screens/Inicio';
import { getBiometricPreference } from './src/utils/biometrics';
import * as LocalAuthentication from 'expo-local-authentication';
import Busqueda from './src/screens/Buscar';
import Fuentes from './src/screens/Fuentes';
import Configuracion from './src/screens/Configuracion';
import SplashScreen from './src/screens/auth/SplashScreen';
import Login from './src/screens/auth/Login';
import Registro from './src/screens/auth/Registro';
import EditarPerfil from './src/screens/EditarPerfil';
import CambiarContrasenia from './src/screens/CambiarContrasenia';
import NoticiaIndividual from './src/screens/NoticiaIndividual';
import Bloqueado from './src/screens/auth/Bloqueado';
import { colores } from './src/styles/globales';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegúrate de que el servidor de desarrollo esté ejecutándose correctamente
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NoticiaStack = createStackNavigator();


function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Buscar') iconName = 'search';
          else if (route.name === 'Fuentes') iconName = 'layers';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          height: 70,
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Buscar" component={Busqueda} />
      <Tab.Screen name="Fuentes" component={Fuentes} />
    </Tab.Navigator>
  );
}

function NoticiasStackScreen() {
  return (
    <NoticiaStack.Navigator>
      <NoticiaStack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <NoticiaStack.Screen
        name="NoticiaIndividual"
        component={NoticiaIndividual}
        options={{
          title: 'Ver más',
          headerStyle: { backgroundColor: colores.fondoNavegacion },
          headerTintColor: colores.textoClaro,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </NoticiaStack.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useContext(AuthContext);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Inicio" component={NoticiasStackScreen} />
            <Stack.Screen name="Configuracion" component={Configuracion} options={{ title: 'Perfil', headerShown: true, headerStyle: { backgroundColor: colores.fondoNavegacion }, headerTintColor: colores.textoClaro, headerTitleStyle: { fontWeight: 'bold' } }} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: 'Editar perfil', headerShown: true, headerStyle: { backgroundColor: colores.fondoNavegacion }, headerTintColor: colores.textoClaro, headerTitleStyle: { fontWeight: 'bold' } }} />
            <Stack.Screen name="CambiarContrasenia" component={CambiarContrasenia} options={{ title: 'Cambiar contraseña', headerShown: true, headerStyle: { backgroundColor: colores.fondoNavegacion }, headerTintColor: colores.textoClaro, headerTitleStyle: { fontWeight: 'bold' } }} />
          </Stack.Group>
        )}
        <Stack.Screen name="Bloqueado" component={Bloqueado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [bloqueado, setBloqueado] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const checkBiometricOnLaunch = async () => {  //Revisa si hay biometría habilitada al iniciar la app
    const enabled = await getBiometricPreference();
    if (enabled) { //si esta habilitada la biometria, pide la huella y bloquea la app con la vista <Bloqueado />
      setBloqueado(true);
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Usa tu huella para ingresar',
      });
      if (result.success) {
        setBloqueado(false);
      }
    } else {
      setBloqueado(false);
    }
  };

  useEffect(() => {
    checkBiometricOnLaunch();
  }, []);

  const handleAnimationComplete = () => {
    setIsSplashVisible(false);
  };


  if (isSplashVisible) {
    return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
  }

  if (bloqueado) {
    return (
      <Bloqueado checkBiometricOnLaunch={checkBiometricOnLaunch} />
    )
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#000" />
        <AuthProvider>
          <AppNavigator />
          <Toast /> 
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
