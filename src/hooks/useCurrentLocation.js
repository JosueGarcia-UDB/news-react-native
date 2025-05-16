import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestLocationPermission = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permiso denegado');
        setPermissionGranted(false);
        return false;
      }

      setPermissionGranted(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCountryFromCoords = async (latitude, longitude) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (reverseGeocode.length > 0) {
        const countryName = reverseGeocode[0].country;
        setCountry(countryName);
        return countryName;
      }
      return null;
    } catch (err) {
      setError(`Error getting country: ${err.message}`);
      return null;
    }
  };

  const getCurrentLocation = async (showPermissionAlert = true) => {
    setLoading(true);
    setError(null);

    try {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        if (showPermissionAlert) {
          Alert.alert(
            "Permiso de ubicación",
            "Necesitamos tu ubicación para mostrarte noticias de tu país",
            [{ text: "OK" }]
          );
        }
        return null;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);

      const userCountry = await getCountryFromCoords(
        locationData.coords.latitude,
        locationData.coords.longitude
      );

      return {
        coords: locationData.coords,
        country: userCountry
      };
    } catch (err) {
      setError(`Error getting location: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    country,
    loading,
    error,
    permissionGranted,
    getCurrentLocation,
    requestLocationPermission,
  };
};

export default useCurrentLocation;
