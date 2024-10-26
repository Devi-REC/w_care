import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Example data
  const monthsGone = 6; // Number of months gone
  const tips = [
    "Stay hydrated and drink plenty of water.",
    "Get enough rest and sleep.",
    "Engage in light exercises or walks.",
    "Eat a balanced diet rich in nutrients.",
    "Attend regular check-ups with your doctor.",
  ];

  const images = [
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-3-blastocycst_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-4-yolk-sac_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-5-amniotic-sac_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-6-webbed-hands_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-7-tailbone_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-8-brain-nerve-cells_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-9-finger-touch-pads.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-10-fingernails_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-11-tooth-buds_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-12-eyelids_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-13-fingerprints_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-14-face-muscles_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-15-lung-development_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-16-heart-development_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-17-skeleton_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-20-fetal-movement_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-23-hearing_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-24-lung-development_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-27-sleep.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-30-amniotic-fluid_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-36-vernix-caseosa_4x3.jpg?width=722' },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-41-amniotic-fluid_4x3.jpg?width=722' }
  ];

  // State for managing the currently displayed tip
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through the tips every 3 seconds
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000); // Change the interval time as needed (3000ms = 3 seconds)

    return () => clearInterval(tipInterval); // Clean up interval on component unmount
  }, [tips.length]);

  // Cycle through the images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change the interval time as needed (5000ms = 5 seconds)
    return () => clearInterval(imageInterval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./preg_2.png')} // Replace with your pregnancy-related image URL
          style={styles.pregnancyImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.monthContainer}>
        <Text style={styles.title}>Pregnancy Tracker</Text>
        <Text style={styles.monthsGone}>Months Gone: {monthsGone}</Text>
      </View>

      {/* Autoplay Image Container */}
      <View style={styles.autoplayImageContainer}>
        <Image 
          source={images[currentImageIndex]} 
          style={styles.scrollableImage} 
          resizeMode="cover"
        />
      </View>

      {/* Tips Section */}
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Tips for a Healthy Pregnancy:</Text>
        <Text style={styles.tip}>
          • {tips[currentTipIndex]} {/* Display the current tip */}
        </Text>
      </View>

      {/* Button with Background Image */}
      <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('First')}
        >
          <Text style={styles.backButtonText}>CHATBOT</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  monthContainer: {
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#d9534f', // Dark red border color
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  subContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#d9534f',
    width: '100%',
    maxWidth: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  monthsGone: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pregnancyImage: {
    width: '100%',
    height: 270,
    borderRadius: 10,
  },
  autoplayImageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d9534f', // Dark red border color
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
    overflow: 'hidden',
  },
  scrollableImage: {
    width: '100%',  // Adjust width as needed
    height: 230, // Adjust height as needed
    borderRadius: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bolder',
    textShadowColor: '#d9534f',
    textShadowOffset: { width: 2, height: 1 }, // Shadow offset
    textShadowRadius: 3, // Shadow blur radius
    marginVertical: 2, // Add some vertical space around the text
    fontSize: 26, // Adjust size as needed
    color: '#d9534f', // Style to match your theme
    fontWeight: 'bolder', // Optional: make it bold
    marginBottom: 10,
  },
  tip: {
    fontSize: 20,
    marginVertical: 5,
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

export default HomeScreen;
