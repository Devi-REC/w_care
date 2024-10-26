import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import necessary functions
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getStorage } from 'firebase/storage'; // Import Storage
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import firebaseConfig from './firebaseConfig'; // Ensure the path is correct

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});

// Initialize Firestore
const database = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Export the necessary modules
export { auth, database, storage };
