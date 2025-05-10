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
import Busqueda from './src/screens/Buscar';
import Fuentes from './src/screens/Fuentes';
import Configuracion from './src/screens/Configuracion';
import SplashScreen from './src/screens/auth/SplashScreen';
import Login from './src/screens/auth/Login';
import Registro from './src/screens/auth/Registro';
import EditarPerfil from './src/screens/EditarPerfil';
import CambiarContrasenia from './src/screens/CambiarContrasenia';
import NoticiaIndividual from './src/screens/NoticiaIndividual';
import { colores } from './src/styles/globales';

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
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleAnimationComplete = () => {
    setIsSplashVisible(false);
  };

  useEffect(() => {
    // Asegurarse de que el servidor esté ejecutándose correctamente
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:8081');
        if (!response.ok) {
          console.error('Error al conectar con el servidor');
        }
      } catch (error) {
        console.error('Servidor no disponible', error);
      }
    };
    checkServerStatus();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
  }

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
            <Stack.Screen name="MainApp" component={NoticiasStackScreen} />
            <Stack.Screen name="Configuracion" component={Configuracion} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
            <Stack.Screen name="CambiarContrasenia" component={CambiarContrasenia} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#000" />
        <AuthProvider>
          <AppNavigator />
          <Toast /> {/* Agrega Toast aquí */}
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
