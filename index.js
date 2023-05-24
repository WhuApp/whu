import { registerRootComponent } from 'expo';
import App from './src/App';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD8pwH_V0cqNFbZ8ydJuvM3NVBDvYWhFDg',
  authDomain: 'whuapp-bce7b.firebaseapp.com',
  projectId: 'whuapp-bce7b',
  storageBucket: 'whuapp-bce7b.appspot.com',
  messagingSenderId: '917151787296',
  appId: '1:917151787296:web:764e32c1bc102bb3a40f45',
  measurementId: 'G-7K5CHEJ8L2',
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
registerRootComponent(App);
