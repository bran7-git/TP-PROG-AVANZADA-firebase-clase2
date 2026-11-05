/**
 * Configuración web de tu proyecto Firebase.
 * Consola de Firebase → ⚙ Configuración del proyecto → General → Tus apps → App web → SDK setup and configuration
 *
 * Estos valores NO son secretos: viajan en el bundle de JavaScript y cualquiera puede verlos.
 * La seguridad no depende de esconderlos, sino de Auth + las reglas @auth de SQL Connect
 * (y, más adelante, App Check).
 *
 * Mientras desarrollás con `npm run dev`, la app usa los emuladores locales y no importa
 * si estos valores son reales. Para producción tenés que completarlos.
 */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAYdiH4_OGvDnOS0L5ZRllyHkojpU_ZZ8Y",
  authDomain: "tp-firebase-clase2.firebaseapp.com",
  projectId: "tp-firebase-clase2",
  storageBucket: "tp-firebase-clase2.firebasestorage.app",
  messagingSenderId: "459712397281",
  appId: "1:459712397281:web:a0fac76b03481143429ca0",
  measurementId: "G-Y47TF0D4T4"
};

/** Debe coincidir con dataconnect/dataconnect.yaml y dataconnect/cursos/connector.yaml */
export const sqlConnectConfig = {
  location: "us-east4",
  service: "catalogo",
  connector: "cursos",
};
