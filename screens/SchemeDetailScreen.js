import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SchemeDetailScreen({ route }) {
  const navigation = useNavigation();
  const { scheme } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the image at the top */}
      <View style={styles.imageContainer}>
        <Image source={scheme.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Scrollable content starts here */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>{scheme.name}</Text>
        <Text style={styles.description}>{scheme.description}</Text>
        <Text style={styles.details}>{scheme.details}</Text>

        {/* Display features if available */}
        {scheme.features && (
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Key Features:</Text>
            <Text style={styles.featuresText}>{scheme.features}</Text>
          </View>
        )}
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Schemes')}
      >
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#d9534f', 
    marginBottom: '10%',
    marginTop: '20%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  image: {
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '17%',
    resizeMode: 'cover',
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d9534f',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  details: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 24,
    color: '#333',
  },
  featuresContainer: {
    marginTop: 20,
    width: '100%',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#d9534f',
    letterSpacing: 0.5,
  },
  featuresText: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 22,
    color: '#333',
    letterSpacing: 0.5,
  },
  backButton: {
    marginTop: 20,
    marginLeft:'5%',
    marginBottom:'7%',
    marginRight:'5%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d9534f',
    backgroundColor: '#d9534f',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
