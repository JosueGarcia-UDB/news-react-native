import { StyleSheet } from 'react-native';

// paleta de colores
export const colores = {
  primario: '#ff3b30',
  fondoOscuro: '#121212',
  fondoTarjeta: '#252525',
  fondo: '#121212',
  fondoNavegacion: '#1c1c1c',
  textoClaro: '#ffffff',
  textoSecundario: '#cccccc',
  textoTerciario: '#888888',
  boton: '#ffffff',
  textoBoton: '#000000',
  borde: '#333333',
};

// tipografía
export const tipografia = {
  tamaños: {
    pequeño: 12,
    normal: 14,
    medio: 16,
    grande: 18,
    extraGrande: 20,
  },
  pesos: {
    regular: '400',
    medio: '500',
    semiBold: '600',
    negrita: '700',
  },
};

// espaciados
export const espaciados = {
  minimo: 4,
  pequeño: 8,
  base: 12,
  medio: 16,
  grande: 24,
  margenContenedor: 16,
  radioBorde: {
    pequeño: 4,
    medio: 8,
    grande: 16,
    completo: 9999,
  },
};

// estilos que son reutilizables
export const estilosComunes = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondoOscuro,
  },
  contenedorCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondoOscuro,
  },
  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: espaciados.radioBorde.medio,
    marginBottom: espaciados.medio,
    overflow: 'hidden',
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.grande,
    fontWeight: tipografia.pesos.negrita,
    marginBottom: espaciados.pequeño,
  },
  textoNormal: {
    color: colores.textoSecundario,
    fontSize: tipografia.tamaños.normal,
  },
  boton: {
    backgroundColor: colores.boton,
    borderRadius: espaciados.radioBorde.completo,
    paddingHorizontal: espaciados.medio,
    paddingVertical: espaciados.pequeño,
  },
  textoBoton: {
    color: colores.textoBoton,
    fontSize: tipografia.tamaños.normal,
    fontWeight: tipografia.pesos.medio,
  },
});