import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./pic.png')} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Insert the "OR" text here */}
        <Text style={styles.middleText}>OR</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 300,
  },
  buttonContainer: {
    marginTop: 0,
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'center', // Center buttons
    alignItems: 'center', // Center align buttons
    width: '70%',
    borderWidth: 2, // Border width
    borderColor: '#d9534f', // Border color
    borderRadius: 10, // Rounded corners for the border
    padding: 10, // Padding inside the container
  },
  button: {
    backgroundColor: '#d9534f', // Button color
    padding: 10,
    borderRadius: 5,
    width: '70%', // Make button fill the container width
    alignItems: 'center',
    marginTop:10,
    marginBottom: 10, // Space between buttons
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  middleText: {
    marginVertical: 10, // Add some vertical space around the text
    fontSize: 16, // Adjust size as needed
    color: '#d9534f', // Style to match your theme
    fontWeight: 'bold', // Optional: make it bold
  },
});

export default FirstScreen;
