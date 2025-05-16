import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';
import { CategoriasProvider } from './src/context/CategoriasContext';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/auth/SplashScreen';
import Bloqueado from './src/screens/auth/Bloqueado';
import { getBiometricPreference } from './src/utils/biometrics';
import * as LocalAuthentication from 'expo-local-authentication';
import AppNavigator from './src/navigation/AppNavigator';
import { useColorScheme } from 'react-native';

export default function App() {
  const [bloqueado, setBloqueado] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  const colorScheme = useColorScheme();

  const checkBiometricOnLaunch = async () => {
    const enabled = await getBiometricPreference();
    if (enabled) {
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
    return <Bloqueado checkBiometricOnLaunch={checkBiometricOnLaunch} />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'dark' : 'dark'}  />
        <AuthProvider>
          <CategoriasProvider>
            <AppNavigator />
            <Toast />
          </CategoriasProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}