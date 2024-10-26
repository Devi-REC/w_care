import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth, database } from './firebase'; // Ensure to import your Firebase setup
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const VolunteerDashboardScreen = ({ navigation }) => {
  const [volunteerData, setVolunteerData] = useState(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(database, 'volunteers', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVolunteerData(docSnap.data());
        } else {
          Alert.alert('No such document!');
        }
      } else {
        Alert.alert('User not authenticated');
      }
    };

    fetchVolunteerData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('VolunteerLogin'); // Redirect to login after logout
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {volunteerData ? (
          <>
            <Image
              source={require('./vol_4.png')} // Replace with your logo URL or local path
              style={styles.logo}
            />
            <Text style={styles.title}>Welcome, {volunteerData.name}!</Text>
            <Text style={styles.info}>Email: {volunteerData.email}</Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.eventButton}
              onPress={() => navigation.navigate('Events')}
            >
              <Text style={styles.buttonText}>Upcoming Events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.eventText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
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
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#0056b3', // Dark red border color
    alignItems: 'center', // Center align items
    width: '90%', // Adjust width as needed
    maxWidth: 400, // Max width for larger screens
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 180, // Adjust height as needed
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3', // Dark red color for the title
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  eventButton: {
    backgroundColor: '#589feb',
    borderColor: '#0056b3',
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderColor: '#0056b3',
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventText: {
    color: '#0056b3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
});

export default VolunteerDashboardScreen;
