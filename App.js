import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfiguracionModal from './src/components/ConfiguracionModal';
import Inicio from './src/screens/Inicio';
import Busqueda from './src/screens/Buscar';
import Fuentes from './src/screens/Fuentes';
import Configuracion from './src/screens/Configuracion';
import SplashScreen from './src/screens/auth/SplashScreen';
import Login from './src/screens/auth/Login';
import Registro from './src/screens/auth/Registro';
import EditarPerfil from './src/screens/EditarPerfil';
import { colores } from './src/styles/globales';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let nombreIcono;

          if (route.name === 'Inicio') {
            nombreIcono = 'home';
          } else if (route.name === 'Buscar') {
            nombreIcono = 'search';
          } else if (route.name === 'Fuentes') {
            nombreIcono = 'layers';
          }

          return <Ionicons name={nombreIcono} size={size} color={color} />;
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga para el splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    }, []);


  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  if (isLoading){
    return (
      <SafeAreaProvider>
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="MainApp" component={Tabs} />
          <Stack.Screen name="Configuracion" component={Configuracion} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
