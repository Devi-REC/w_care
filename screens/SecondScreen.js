import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./vol_3.png')} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerLogin')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerSignUp')}>
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
    backgroundColor: '#e6f7ff', // Light blue background
  },
  image: {
    width: 320,
    height: 250,
  },
  buttonContainer: {
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderWidth: 2,
    borderColor: '#0056b3', // Theme color
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#0056b3', // Theme color
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  middleText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#0056b3', // Theme color
    fontWeight: 'bold',
  },
});

export default SecondScreen;
