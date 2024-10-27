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
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-3-blastocycst_4x3.jpg?width=722', quote: "The beginning of a beautiful journey." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-4-yolk-sac_4x3.jpg?width=722', quote: "Tiny steps toward a new life." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-5-amniotic-sac_4x3.jpg?width=722', quote: "Life blooms within." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-6-webbed-hands_4x3.jpg?width=722', quote: "A miracle is unfolding." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-7-tailbone_4x3.jpg?width=722', quote: "Tiny but strong beginnings." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-8-brain-nerve-cells_4x3.jpg?width=722', quote: "The mind begins to form, full of possibilities." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-9-finger-touch-pads.jpg?width=722', quote: "Little fingers prepare to touch the world." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-10-fingernails_4x3.jpg?width=722', quote: "Small details emerge, shaping a unique life." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-11-tooth-buds_4x3.jpg?width=722', quote: "A tiny smile is forming, full of future joy." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-12-eyelids_4x3.jpg?width=722', quote: "Eyes that will see the world start to grow." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-13-fingerprints_4x3.jpg?width=722', quote: "Unique fingerprints begin to tell their own story." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-14-face-muscles_4x3.jpg?width=722', quote: "Little expressions start to take shape." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-15-lung-development_4x3.jpg?width=722', quote: "Breath of life grows within." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-16-heart-development_4x3.jpg?width=722', quote: "A heartbeat, strong and steady." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-17-skeleton_4x3.jpg?width=722', quote: "Bones form, supporting the miracle of life." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-20-fetal-movement_4x3.jpg?width=722', quote: "Little movements remind of the growing life within." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-23-hearing_4x3.jpg?width=722', quote: "The world’s sounds begin to fill tiny ears." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-24-lung-development_4x3.jpg?width=722', quote: "Preparing for the first breath." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-27-sleep.jpg?width=722', quote: "Dreams already begin, even before birth." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-30-amniotic-fluid_4x3.jpg?width=722', quote: "The protective bubble of life grows ever stronger." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-36-vernix-caseosa_4x3.jpg?width=722', quote: "Protected and nurtured for the final days of waiting." },
    { uri: 'https://assets.babycenter.com/ims/2015/01/pregnancy-week-41-amniotic-fluid_4x3.jpg?width=722', quote: "A miracle, ready to greet the world." }// ... More images
  ];

  // State for managing the currently displayed tip and image
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
    }, 2000); // Change the interval time as needed (5000ms = 5 seconds)
    return () => clearInterval(imageInterval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('./preg_4.png')} // Replace with your pregnancy-related image URL
          style={styles.pregnancyImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.monthContainer}>
        <Text style={styles.title}>Pregnancy Tracker</Text>
        <Text style={styles.monthsGone}>Months Gone: {monthsGone}</Text>
      </View>
      <View style={styles.autoplayImageContainer}>
      {/* New Heading for Pregnancy Journey */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Embrace the Miracle: A Beautiful Journey Begins!</Text>
      </View>

      {/* Autoplay Image Container */}
      
        <Image 
          source={images[currentImageIndex]} 
          style={styles.scrollableImage} 
          resizeMode="cover"
        />
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            {images[currentImageIndex].quote}
          </Text>
        </View>
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
  headingContainer: {
   marginTop:'2%'
  
  },
  headingText: {
    fontSize: 23,
    fontWeight: 'bolder',
    color: '#d9534f',
    textShadowColor: '#d9534f',
    textShadowOffset: { width: 2, height: 1 }, // Shadow offset
    textShadowRadius: 3, // Shadow blur radius
    paddingHorizontal: 10,
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
 
  },
  pregnancyImage: {
    width: '100%',
    height: 240,
   
  },
  autoplayImageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d9534f', // Dark red border color
    overflow: 'hidden',
    position: 'relative', // Make the container relative for positioning text
  },
  scrollableImage: {
    width: '94%',
    height: 200,
    marginTop:'3%',
    marginBottom:'5%',
    borderRadius: 5,
  },
  quoteContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for quote
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom:'5%',
    borderRadius: 5,
  },
  quoteText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
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
