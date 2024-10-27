import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About WCare</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('./preg_2.png')} // Replace with your image path
          style={styles.logo}
        />
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            
            <Text style={styles.description}>
              WCare is a digital healthcare solution designed to address the challenges faced by pregnant women in underserved rural communities. By integrating wearable technology, real-time health monitoring, and emergency response systems, WCare ensures safer pregnancies and timely medical interventions.
            </Text>
            <Text style={styles.featuresTitle}>Key Features Include:</Text>
            <Text style={styles.featureItem}>
              • A wearable health device that continuously tracks vital signs like heart rate, blood pressure, and oxygen levels, providing real-time alerts for abnormalities.
            </Text>
            <Text style={styles.featureItem}>
              • A fetal health monitor that tracks the baby’s heartbeat and movements, alerting mothers to seek care if needed.
            </Text>
            <Text style={styles.featureItem}>
              • Fall detection technology, which triggers automatic emergency alerts in case of accidents.
            </Text>
            <Text style={styles.featureItem}>
              • Personalized chatbot counseling for emotional support and offline access to government healthcare schemes, allowing users to easily apply for benefits.
            </Text>
            <Text style={styles.featureItem}>
              • A volunteering network for medical professionals to provide care through rural health camps.
            </Text>
            <Text style={styles.finalNote}>
              WCare bridges the healthcare gap by offering continuous monitoring, emergency response, easy access to government schemes, and personalized care for pregnant women in remote areas, ensuring every pregnancy has a safe birth.
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
  },
  imageContainer: {
    width: '90%', // Adjust width as needed
    maxWidth: 400, // Max width for larger screens
    borderRadius: 20,
    overflow: 'hidden', // This will clip the overlay to the image border
  },
  logo: {
    width: '100%', // Make logo fill the container width
    height: 500, // Adjust logo size
    resizeMode: 'cover', // Cover the entire area
  },
  overlay: {
    position: 'absolute', // Position overlay on top of the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
    padding: 20,
    borderWidth: 2,
    borderColor: '#d9534f',
    justifyContent: 'center', // Center content vertically
    borderRadius: 20, // Rounded corners for the overlay
  },
  scrollViewContent: {
    flexGrow: 1, // Allow the scroll view to grow based on content size
    justifyContent: 'center', // Center content vertically if needed
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#d9534f',
    letterSpacing: 1, // Add letter spacing
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight:18,
    letterSpacing: 0.5, // Add letter spacing
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d9534f',
    letterSpacing: 1, // Add letter spacing
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    letterSpacing: 0.5, // Add letter spacing
  },
  finalNote: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#d9534f',
    lineHeight:18,
    letterSpacing: 1, // Add letter spacing
  },
});

export default AboutScreen;
