// firebase-config.example.js
// ✅ Este arquivo É versionado — serve como referência de configuração.
// Copie este arquivo para firebase-config.js e preencha com suas credenciais reais.
//
// SETUP FIREBASE:
// 1. Acesse console.firebase.google.com → seu projeto
// 2. Project Settings → General → Your apps → Web app
// 3. Copie as credenciais e cole no firebase-config.js
// 4. Firestore Database → Create Database → Start in test mode
// 5. Regras sugeridas para produção: allow read, write: if request.time < timestamp.date(2025,12,31)

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cache offline: na segunda visita, dados carregam do IndexedDB instantaneamente
db.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
  console.warn('Firestore persistence não disponível:', err.code);
});
