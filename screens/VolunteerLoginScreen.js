// VolunteerLogin.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth } from './firebase'; // Ensure to import your Firebase setup
import { signInWithEmailAndPassword } from 'firebase/auth';

const VolunteerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('VolunteerDashboard'); // Navigate to the Volunteer Dashboard upon successful login
    } catch (error) {
      setErrorMessage(error.message); // Set error message if login fails
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('./vol_4.png')} // Replace with your logo URL or local path
          style={styles.logo}
        />
        <Text style={styles.title}>Volunteer Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>

        {/* Display error message if exists */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

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

        <TouchableOpacity onPress={() => alert('Forgot password?')}>
          <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isPressed ? styles.buttonPressed : null]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Second')}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff', // Light blue background
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#0056b3', // Change border color to #0056b3
    alignItems: 'center', // Center align items
    width: '90%', // Adjust width as needed
    maxWidth: 400, // Max width for larger screens
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 180, // Adjust height as needed
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0056b3', // Change title color to #0056b3
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9a9a9a',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#0056b3', // Change input border color to #0056b3
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff', // White background for input
    width: '100%', // Make input fill available width
  },
  forgotText: {
    textAlign: 'right',
    color: '#0056b3', // Change forgot password text color to #0056b3
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#0056b3', // Change button background color to #0056b3
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    width: '100%', // Make button fill available width
  },
  buttonPressed: {
    backgroundColor: '#004494', // Darker blue for button when pressed
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#0056b3', // Change back button background color to #0056b3
    width: '100%', // Make back button fill available width
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red', // Color for error messages
    marginBottom: 10,
  },
});

export default VolunteerLoginScreen;
