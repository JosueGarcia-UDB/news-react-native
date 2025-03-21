import { useState } from 'react'
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
  const [modalVisible, setModalVisible] = useState(true);

  // Cierra la modal y guarda las preferencias
  const handleCloseModal = () => {
    setModalVisible(false);
  };


  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />

      {/* Modal de configuración */}
      <ConfiguracionModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Configuracion" component={Configuracion} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
