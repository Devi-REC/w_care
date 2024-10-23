// AlertScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from './firebase'; // Adjust the path accordingly
import { ref, onValue } from 'firebase/database';

const AlertScreen = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertsRef = ref(database, 'alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Snapshot data:', data);
      const alertsList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setAlerts(alertsList);
    }, (error) => {
      console.error('Error fetching data:', error);
    });
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alerts</Text>
      {alerts.length > 0 ? (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.alertContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noAlertsText}>No alerts available</Text>
      )}
    </View>
  );
};

//export default AlertScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  alertContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginVertical: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#777',
  },
  noAlertsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default AlertScreen;

