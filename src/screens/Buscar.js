import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Cabecera from '../components/Header.js';
import BusquedaAvanzada from '../components/BusquedaAvanzada.js';
import { colores, tipografia, espaciados } from '../styles/globales.js';

const Buscar = () => {
  const [mostrarAvanzada, setMostrarAvanzada] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const API_KEY = 'c06a4f8c1bc8483988cc89f9cb0d5f1e';

  const toggleBusquedaAvanzada = () => {
    setMostrarAvanzada(!mostrarAvanzada);
  };

  // Función que arma la URL de búsqueda según los parámetros
  const realizarBusqueda = (parametros) => {
    setCargando(true);
    setError(null);

    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.append('apiKey', API_KEY);

    // Validar y agregar parámetros
    let tieneParametros = false;
    if (parametros.q) {
      url.searchParams.append('q', parametros.q);
      tieneParametros = true;
    }
    if (parametros.fuente) {
      url.searchParams.append('sources', parametros.fuente);
      tieneParametros = true;
    }
    if (parametros.dominio) {
      url.searchParams.append('domains', parametros.dominio);
      tieneParametros = true;
    }
    if (parametros.fechaInicio) {
      url.searchParams.append('from', parametros.fechaInicio);
      tieneParametros = true;
    }
    if (parametros.fechaFin) {
      url.searchParams.append('to', parametros.fechaFin);
      tieneParametros = true;
    }
    if (parametros.idioma) {
      url.searchParams.append('language', parametros.idioma);
      tieneParametros = true;
    }
    if (parametros.orden) {
      url.searchParams.append('sortBy', parametros.orden);
      tieneParametros = true;
    }

    // Si no hay parámetros válidos, mostrar un error
    if (!tieneParametros) {
      setError('Por favor, ingresa al menos un parámetro de búsqueda.');
      setCargando(false);
      return;
    }

    // Depurar la URL generada
    console.log('URL de búsqueda:', url.toString());

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setResultados(data.articles);
        } else {
          setError('No se encontraron resultados.');
        }
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  };

  // Función para realizar la búsqueda básica con la consulta del TextInput
  const handleBasicSearch = () => {
    realizarBusqueda({ q: query });
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Cabecera />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenido}>
          <Text style={styles.tituloSeccion}>Busca tus noticias de interés</Text>
          
          <View style={styles.barraBusqueda}>
            <TextInput
              style={styles.inputBusqueda}
              placeholder="¿Qué deseas buscar?......."
              placeholderTextColor={colores.textoTerciario}
              value={query}
              onChangeText={setQuery}
            />
            <Ionicons name="search-outline" size={20} color={colores.textoTerciario} />
          </View>
          
          <TouchableOpacity style={styles.boton} onPress={handleBasicSearch}>
            <Text style={styles.textoBoton}>Buscar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkAvanzado} onPress={toggleBusquedaAvanzada}>
            <Text style={styles.textoLinkAvanzado}>
              {mostrarAvanzada ? 'Ocultar búsqueda avanzada' : 'Búsqueda avanzada'}
            </Text>
          </TouchableOpacity>
          
          {mostrarAvanzada && <BusquedaAvanzada onBuscar={realizarBusqueda} />}
          
          {cargando && <Text style={{ color: colores.textoClaro, textAlign: 'center' }}>Cargando...</Text>}
          {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
          
          {resultados.map((articulo, index) => (
            <View key={index} style={styles.resultado}>
              <Text style={styles.tituloResultado}>{articulo.title}</Text>
              <Text style={styles.descripcionResultado}>{articulo.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  scrollView: {
    flex: 1,
  },
  contenido: {
    padding: espaciados.margenContenedor,
  },
  tituloSeccion: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.extraGrande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.medio,
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBottom: espaciados.medio,
    paddingHorizontal: espaciados.medio,
  },
  inputBusqueda: {
    flex: 1,
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    paddingVertical: espaciados.medio,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.pequeño,
    paddingVertical: espaciados.pequeño,
    marginBottom: espaciados.medio,
    alignItems: 'center',
  },
  textoBoton: {
    color: colores.textoBoton,
    fontWeight: tipografia.pesos.medio,
    fontSize: tipografia.tamaños.normal,
  },
  linkAvanzado: {
    alignItems: 'center',
    paddingVertical: espaciados.pequeño,
  },
  textoLinkAvanzado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.medio,
  },
  resultado: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.pequeño,
    padding: espaciados.medio,
    marginBottom: espaciados.medio,
  },
  tituloResultado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.pequeño,
  },
  descripcionResultado: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.normal,
  },
});

export default Buscar;
