import { registerRootComponent } from 'expo';
import App from './src/App';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNsGUdT6oW-AhUds3ulCrl181IzEXN18I",
  authDomain: "whuapp-45f31.firebaseapp.com",
  databaseURL: "https://whuapp-45f31-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whuapp-45f31",
  storageBucket: "whuapp-45f31.appspot.com",
  messagingSenderId: "528481683970",
  appId: "1:528481683970:web:1a146eef1dbf7822e3351b",
  measurementId: "G-29S09ZYM0Z"
};


const app = initializeApp(firebaseConfig);

initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
registerRootComponent(App);
