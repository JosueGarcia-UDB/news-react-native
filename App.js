import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Inicio from './src/screens/Inicio';
import Busqueda from './src/screens/Buscar';
import Fuentes from './src/screens/Fuentes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      <NavigationContainer>
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
              height: 60,
              paddingBottom: 10,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Inicio" component={Inicio} />
          <Tab.Screen name="Buscar" component={Busqueda} />
          <Tab.Screen name="Fuentes" component={Fuentes} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});