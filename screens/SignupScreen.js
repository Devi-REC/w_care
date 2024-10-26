import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, database, storage } from './firebase'; // Ensure to import auth, database, and storage
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker'; // Use the new Picker import

const nitroImage = require('./wcare_logo.png'); // Ensure the path is correct

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pregnancyStatus, setPregnancyStatus] = useState('No');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to handle user sign-up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload image if exists
      if (image) {
        setUploading(true);
        const imageUrl = await uploadImageToFirebase(image, user.uid);
        await saveUserDataToFirestore(user.uid, email, pregnancyStatus, imageUrl);
        setUploading(false);
      } else {
        await saveUserDataToFirestore(user.uid, email, pregnancyStatus, null);
      }

      Alert.alert('Success', 'Sign Up successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  // Function to save user data to Firestore
  const saveUserDataToFirestore = async (userId, email, pregnancyStatus, imageUrl) => {
    try {
      await addDoc(collection(database, 'users'), {
        userId,
        email,
        pregnancyStatus,
        imageUrl,
      });
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImageToFirebase = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `pregnancyConfirmations/${userId}.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You've refused to allow this app to access your photos! Please enable photo access in your device settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              // Open app settings
              Linking.openURL('app-settings:');
            },
          },
        ]
      );
      return; // Exit the function if permission is not granted
    }

    // If permission is granted, launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Selected image URI:', result.uri); // Log the selected image URI
      setImage(result.uri); // Set the selected image URI
    }
  };

  // Function to remove the selected image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={nitroImage} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#8f8f8f"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#8f8f8f"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={styles.label}>Are you pregnant?</Text>
        <Picker
          selectedValue={pregnancyStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setPregnancyStatus(itemValue)}
        >
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>

        {/* Image Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Confirmation Image</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.uploadedImage} />
            <TouchableOpacity style={styles.closeButton} onPress={removeImage}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={uploading}>
          <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'SIGN UP'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('First')}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#d9534f',
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#d9534f',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#d9534f',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  uploadButton: {
    height: 50,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

