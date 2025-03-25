import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ApplicationFilterScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to upload and verify image
  const submitForVerification = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    setLoading(true);

    let formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'proof.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLoading(false);
      Alert.alert('Verification Result', response.data.message);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Verification failed. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Filtering</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Proof</Text>
      </TouchableOpacity>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}

      {loading ? (
        <ActivityIndicator size="large" color="#d9534f" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={submitForVerification}>
          <Text style={styles.buttonText}>Submit for Verification</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
