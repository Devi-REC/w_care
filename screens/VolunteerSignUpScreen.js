import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { auth, database } from './firebase'; // Ensure to import your Firebase setup
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const VolunteerSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(database, 'volunteers', user.uid), {
        name: name,
        email: email,
        // Add any other volunteer-specific fields here
      });

      Alert.alert('Sign Up Successful', 'Welcome to the Volunteer Program!');
      navigation.navigate('VolunteerLogin'); // Navigate to the Volunteer Login page after sign-up
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('./vol_4.png')} // Replace with your logo URL or local path
          style={styles.logo}
        />
        <Text style={styles.title}>Volunteer Sign-Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Second')}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows ScrollView to grow with content
    backgroundColor: '#e6f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    marginTop: '13%',
    marginBottom: '10%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#0056b3', // Updated border color
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 180, // Adjust height as needed
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0056b3', // Updated title color
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#0056b3', // Updated border color for input
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
    backgroundColor: '#0056b3', // Updated button background color
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
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0056b3', // Updated border color for back button
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#0056b3', // Updated back button text color
    fontSize: 16,
  },
});

export default VolunteerSignUpScreen;
