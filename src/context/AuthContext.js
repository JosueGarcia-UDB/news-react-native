import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        let token, username;
        if (Platform.OS === 'web') {
          token = await AsyncStorage.getItem('userToken');
          username = await AsyncStorage.getItem('userLogged');
        } else {
          [token, username] = await Promise.all([
            SecureStore.getItemAsync('userToken'),
            SecureStore.getItemAsync('userLogged'),
          ]);
        }

        if (token && username) {
          const userData = await AsyncStorage.getItem(`user_${username}`);
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const register = async (name, username, password) => {
    try {
      const userKey = `user_${username}`;
      if (await AsyncStorage.getItem(userKey)) {
        throw new Error('El usuario ya existe');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      const newUser = { id: Date.now(), name, username, password };
      await AsyncStorage.setItem(userKey, JSON.stringify(newUser));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const userKey = `user_${username}`;
      const storedUser = await AsyncStorage.getItem(userKey);

      if (!storedUser) throw new Error('Usuario no encontrado');

      const userData = JSON.parse(storedUser);

      if (userData.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      const newToken = `tok_${Date.now()}`;
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem('userToken', newToken);
        await AsyncStorage.setItem('userLogged', username);
      } else {
        await Promise.all([
          SecureStore.setItemAsync('userToken', newToken),
          SecureStore.setItemAsync('userLogged', username),
        ]);
      }

      setUser(userData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userLogged');
    } else {
      await Promise.all([
        SecureStore.deleteItemAsync('userToken'),
        SecureStore.deleteItemAsync('userLogged'),
      ]);
    }
    setUser(null);
  };

  const updateProfile = async (newName, newUsername) => {
    if (!user) throw new Error('No hay usuario logueado');

    try {
      const oldUserKey = `user_${user.username}`;
      const newUserKey = `user_${newUsername}`;
      const oldPrefsKey = `prefs_${user.username}`;
      const newPrefsKey = `prefs_${newUsername}`;

      // Verificar si el nuevo nombre de usuario ya está en uso
      if (newUsername !== user.username && (await AsyncStorage.getItem(newUserKey))) {
        throw new Error('El nuevo nombre de usuario ya está en uso');
      }

      // Migrar las preferencias del usuario
      const oldPreferences = await AsyncStorage.getItem(oldPrefsKey);
      if (oldPreferences) {
        await AsyncStorage.setItem(newPrefsKey, oldPreferences);
        await AsyncStorage.removeItem(oldPrefsKey); // Eliminar las preferencias antiguas
      }

      // Actualizar los datos del usuario
      const updatedUser = { ...user, name: newName, username: newUsername };
      await AsyncStorage.setItem(newUserKey, JSON.stringify(updatedUser));

      if (newUsername !== user.username) {
        await AsyncStorage.removeItem(oldUserKey); // Eliminar los datos del usuario antiguo
      }

      setUser(updatedUser);

      // Actualizar el nombre de usuario en SecureStore o AsyncStorage
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem('userLogged', newUsername);
      } else {
        await SecureStore.setItemAsync('userLogged', newUsername);
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const updateUserCountry = async (countryName) => {
    if (!user) throw new Error('No hay usuario logueado');

    try {
      const userKey = `user_${user.username}`;

      // Actualizar los datos del usuario con el país
      const updatedUser = { ...user, country: countryName };
      await AsyncStorage.setItem(userKey, JSON.stringify(updatedUser));

      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Error al guardar el país del usuario:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) throw new Error('No hay usuario logueado');

    try {
      if (user.password !== currentPassword) {
        throw new Error('La contraseña actual es incorrecta');
      }

      const userKey = `user_${user.username}`;
      const updatedUser = { ...user, password: newPassword };
      await AsyncStorage.setItem(userKey, JSON.stringify(updatedUser));

      setUser(updatedUser);

      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        updateUserCountry
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};