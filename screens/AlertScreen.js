import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebase'; // Ensure you import the app instance correctly

export default function AlertScreen() {
  const [data, setData] = useState({ pressure: '', temp: '' });
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    // Initialize Realtime Database
    const database = getDatabase(app);
    const dataRef = ref(database, '/'); // Adjust the path if necessary

    // Fetch data from the Realtime Database
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      console.log('Fetched Data:', fetchedData); // Debugging line

      if (fetchedData) {
        // Check if fetchedData has `pressure` and `temp` or within `Example`
        const pressure = fetchedData.pressure || fetchedData.Example?.pressure || 'No pressure data';
        const temp = fetchedData.temp || fetchedData.Example?.temp || 'No temperature data';

        setData({ pressure, temp });
        setLoading(false); // Set loading to false after data is fetched
      } else {
        console.log('No data available');
        setLoading(false); // Also set loading to false if no data is found
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.'); // Set error message
      setLoading(false); // Set loading to false on error
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realtime Data </Text>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Display error message
      ) : (
        <>
          <Text style={styles.text}>Pressure: {data.pressure}</Text>
          <Text style={styles.text}>Temperature: {data.temp}</Text>
        </>
      )}
    </View>
  );
}

// Define the styles object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0056b3',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
});
