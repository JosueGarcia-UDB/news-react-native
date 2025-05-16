// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoticiasStackScreen from './NoticiaStack';
import Configuracion from '../screens/Configuracion';
import EditarPerfil from '../screens/EditarPerfil';
import CambiarContrasenia from '../screens/CambiarContrasenia';
import Login from '../screens/auth/Login';
import Registro from '../screens/auth/Registro';
import Bloqueado from '../screens/auth/Bloqueado';
import { colores } from '../styles/globales';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

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