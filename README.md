# InfoNow

## Descripción
**InfoNow** es una aplicación móvil desarrollada en **React Native** que permite a los usuarios acceder a noticias en tiempo real de diversas categorías. La aplicación consume la API de **NewsAPI** para obtener información actualizada y presenta una interfaz intuitiva y amigable. Además, almacena las noticias favoritas de los usuarios utilizando **Async-Storage**, permitiéndoles acceder a ellas en cualquier momento.

## Nuevas funcionalidades
**La última versión de INFO NOW incorpora mejoras significativas en la autenticación, gestión de usuarios y experiencia de lectura, optimizando la interacción del usuario con la plataforma.** A continuación, se detallan las nuevas funcionalidades implementadas:

- **Inicio de Sesión:** La aplicación ahora cuenta con un Log in que te permite ingresar a nuestra aplicación y si aún no tienes las credenciales puedes registrarte en el formulario de Registro.

- **Registro:** Serás capaz de registrarte y crear tu propio usuario con contraseña incluida para poder acceder a toda la aplicación.

- **Panel de Configuración:** Nueva interfaz unificada para:
•	Edición de perfil 
•	Cambio de contraseña
•	Autenticación biométrica 

- **Noticia Individual (Detalle):** Rediseño de la vista de noticias. Al hacer clic en Leer más te mandará a la ventana donde la noticia se visualizará de forma breve por si quieres seguir leyendo puedes ir a visitar al sitio.

## Nuevas Dependencias agregadas
- **react-redux:** Conexión entre React y Redux.
- **expo-secure-store:¨** Almacena datos sensibles (contraseñas) de forma segura.
- **react-native-gesture-handler & react-native-reanimated:** Soporte para gestos táctiles y animaciones fluidas (requeridos por React Navigation)
- **react-native-async-storage/async-storage:** Almacenamiento persistente simple (ej: preferencias de usuario).
- **expo-local-authentication:** Integra autenticación biométrica (Face ID, Touch ID).

## Tecnologías utilizadas
- **Expo**
- **React Native**
- **JavaScript**
- **Npm**
- **React**
- **Async-Storage**

## Instrucciones de instalación y ejecución
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/JosueGarcia-UDB/news-react-native.git
   ```
2. Acceder al directorio del proyecto:
   ```sh
   cd news-react-native
   ```
3. Instalar dependencias:
   ```sh
   npm install
   ```
4. Ejecutar la aplicación en Expo:
   ```sh
   npx expo start
   ```
5. Escanear el código QR con la aplicación Expo Go en tu dispositivo móvil o usar un emulador.

## Integrantes del equipo
| Nombre de integrante | Carnet | Rol |
|----------------------|--------|-------------------------------|
| Josué Eduardo García Estrada | GE240098 | Consumir API de NewsAPI |
| Eduardo Alfredo Ramírez Torres | RT240549 | Consumir API de NewsAPI |
| José Fernando Rodríguez Escamilla | RE240134 | Creación de prototipos de Figma |
| Roberto Arturo Duarte Mejía | DM240115 | Creación de prototipos de Figma |
| Jeremy Edenilson Flores Portillo | FP240479 | Creación de interfaces |
| Oscar Daniel Soto Jovel | SJ241841 | Creación de interfaces |

## Prototipos en Figma
Puedes visualizar los prototipos de la aplicación en el siguiente enlace:  
[🔗 Diseño en Figma](https://www.figma.com/design/6mJQfWIKFHCvByxAiT74Q0/MockUps-DPS441-ProyectoCatedra?node-id=0-1&p=f&t=ggfYOnz2XPxVjgoB-0)

## Capturas de pantalla
A continuación, se presentan algunas capturas de la aplicación donde se muestra el resultado y el diseño inicial en Figma 🎨

| ![Imagen 1](./src/assets/img/first-comparation.png) | ![Imagen 2](./src/assets/img/second-comparation.png) |
|----------------------------------|----------------------------------|
| ![Imagen 3](./src/assets/img/third-comparation.png) | ![Imagen 4](./src/assets/img/fourth-comparation.png) |


🚀 ¡Ya puedes InfoNow! 📱

