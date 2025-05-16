// src/navigation/NoticiasStack.js
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Tabs from './Tabs';
import NoticiaIndividual from '../screens/NoticiaIndividual';
import { colores } from '../styles/globales';

const NoticiaStack = createStackNavigator();

export default function NoticiasStackScreen() {
  return (
    <NoticiaStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <NoticiaStack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <NoticiaStack.Screen
        name="NoticiaIndividual"
        component={NoticiaIndividual}
        options={{
          title: 'Inicio',
          headerStyle: { backgroundColor: colores.fondoNavegacion },
          headerTintColor: colores.textoClaro,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </NoticiaStack.Navigator>
  );
}