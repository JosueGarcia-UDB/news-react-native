// utils/biometric.js
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BIOMETRIC_KEY = 'BIOMETRIC_ENABLED';

export const isBiometricSupported = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};

export const saveBiometricPreference = async (enabled) => {
  await AsyncStorage.setItem(BIOMETRIC_KEY, JSON.stringify(enabled));
};

export const getBiometricPreference = async () => {
  const value = await AsyncStorage.getItem(BIOMETRIC_KEY);
  return JSON.parse(value);
};

export const clearBiometricPreference = async () => {
  await AsyncStorage.removeItem(BIOMETRIC_KEY);
};

