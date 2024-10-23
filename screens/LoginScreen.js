import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

 const nitroImage = require('./wcare_logo.png'); // Ensure the path is correct

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Image
                    source={require('./wcare_logo.png')} // Replace with your logo URL or local path
                    style={styles.logo}
                /> 
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Please sign in to continue.</Text>

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
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                    <Text
                        style={styles.signUpLink}
                        onPress={() => navigation.navigate('SignUp')} 
                    >
                        Sign up
                    </Text>
                </Text>
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
        signUpText: {
            textAlign: 'center',
            marginTop: 30,
            fontSize: 16,
        },
        signUpLink: {
            color: '#d9534f', // Dark red color for Sign up link
            fontWeight: 'bold',
        },
    });