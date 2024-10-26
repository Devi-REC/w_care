import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from './firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  // Function to handle user sign-in
  const handleLogin = () => {
    setErrorMessage(''); // Clear previous error message
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Main'); // Navigate to Main screen on success
      })
      .catch((error) => {
        setErrorMessage(error.message); // Set error message
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('./preg_1.png')} // Replace with your logo URL or local path
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>
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
        backgroundColor: '#ffe6e6', // Light reddish background
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#d9534f', // Dark red border color
        alignItems: 'center', // Center align items
        width: '90%', // Adjust width as needed
        maxWidth: 400, // Max width for larger screens
    },
    logo: {
        width: 250, // Adjust width as needed
        height: 200, // Adjust height as needed
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d9534f', // Dark red color for the title
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#9a9a9a',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#d9534f', // Dark red color for input border
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
        color: '#d9534f', // Dark red color for forgot password text
        marginBottom: 20,
    },
    button: {
        height: 50,
        backgroundColor: '#d9534f', // Dark red color for button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        width: '100%', // Make button fill available width
    },
    buttonPressed: {
        backgroundColor: '#c9302c', // Darker red color for button when pressed
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
        backgroundColor: '#d9534f', // Dark red background for back button
        width: '100%', // Make back button fill available width
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
