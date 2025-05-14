import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colores, tipografia, espaciados } from "../styles/globales";

const AuthButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.boton, style]} onPress={onPress}>
      <Text style={styles.textoBoton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colores.primario,
    padding: espaciados.base,
    borderRadius: espaciados.radioBorde.medio,
    alignItems: "center",
    width: "100%",
    marginVertical: espaciados.pequeño,
  },
  textoBoton: {
    color: colores.textoClaro,
    fontSize: tipografia.tamaños.medio,
    fontWeight: tipografia.pesos.semiBold,
  },
});

export default AuthButton;