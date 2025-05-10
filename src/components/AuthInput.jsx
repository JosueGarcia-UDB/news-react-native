import { View, TextInput, StyleSheet } from "react-native";
import { colores, tipografia, espaciados } from "../styles/globales";

const AuthInput = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colores.textoTerciario}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: espaciados.medio,
    width: "100%",
  },
  input: {
    backgroundColor: colores.fondoTarjeta,
    color: colores.textoClaro,
    padding: espaciados.medio,
    borderRadius: espaciados.radioBorde.medio,
    fontSize: tipografia.tamaños.normal,
  },
});

export default AuthInput;