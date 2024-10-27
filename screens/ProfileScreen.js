// ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth'; // Firebase authentication

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Navigate back to Login screen after logout
        navigation.replace('Login'); // Use `replace` to avoid going back to Profile after logout
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Profile</Text>
      <View style={styles.overlay}>
        <Image
          source={require('./preg_3.png')} // Replace with your profile image URL or local path
          style={styles.logo}
        />
       
        {user && (
          <>
            <Text style={styles.userInfo}>Email: {user.email}</Text>
            {/* Add more user details if available */}
          </>
        )}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light reddish background
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  overlay: {
    backgroundColor: '#fff', // Semi-transparent overlay
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
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d9534f', // Dark red color for the title
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 18,
    color: '#333',
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
  logoutButton: {
    height: 50,
    backgroundColor: '#c9302c', // Darker red color for the logout button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    width: '100%', // Make button fill available width
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
