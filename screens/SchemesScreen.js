import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import local images
const image1 = require('./PMMVY.jpeg');
const image2 = require('./PMSMA.png');
const image3 = require('./sura.jpeg');
const image4 = require('./JSY.png');

const schemes = [
  {
    id: '1',
    name: 'PMMVY',
    image: image1,
    description: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    details: 'PMMVY provides financial assistance to pregnant women for their first live birth. Eligible women receive cash incentives in installments, covering various stages of pregnancy and childbirth to promote health and well-being.',
    features: '1. Financial Assistance: ₹5,000 cash incentive for first live birth. 2. Conditional Cash Transfers for antenatal and postnatal care. 3. Support for Nutritional Needs. 4. Empowerment of Women. 5. Accessible to Vulnerable Groups. 6. Integration with Other Health Services. 7. Monitoring and Evaluation.'
  },
  {
    id: '2',
    name: 'SUMAN',
    image: image2,
    description: 'SURAKSHIT MATRITVA AASHWASAN (SUMAN)',
    details: 'SUMAN aims to provide assured, dignified, and respectful delivery and newborn care at no cost to pregnant women. It includes all components of safe delivery practices and follows a zero tolerance for denial of services.',
    features: '1. Financial Assistance for antenatal care. 2. Special focus on states with low delivery rates. 3. Emphasis on accessible and respectful maternal care. 4. Free essential medicines and diagnostics. 5. Zero tolerance for denial of services.'
  },
  {
    id: '3',
    name: 'PMSMA',
    image: image3,
    description: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    details: 'PMSMA offers free antenatal care services to pregnant women on the 9th of every month. It aims to reduce maternal and neonatal mortality by providing necessary health check-ups during pregnancy.',
    features: '1. Monthly health check-ups. 2. Free diagnostic services. 3. Emphasis on high-risk pregnancy detection. 4. Special facilities for remote areas. 5. Focus on reducing maternal and neonatal mortality.'
  },
  {
    id: '4',
    name: 'JSY',
    image: image4,
    description: 'Janani Suraksha Yojana',
    details: 'Janani Suraksha Yojana (JSY) is a safe motherhood intervention under the National Health Mission. It is being implemented with the objective of reducing maternal and neonatal mortality by promoting institutional delivery among poor pregnant women.',
    features: '1. Focus on institutional deliveries. 2. Financial assistance for delivery in healthcare facilities. 3. Special focus on low-performing states. 4. Integration with health schemes for maximum outreach.'
  },
];

export default function SchemesScreen() {
  const navigation = useNavigation();

  const renderScheme = ({ item }) => (
    <TouchableOpacity
      style={styles.schemeContainer}
      onPress={() => navigation.navigate('SchemeDetail', { scheme: item })}
    >
      <Image source={item.image} style={styles.schemeImage} resizeMode="cover"/>
      <Text style={styles.schemeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schemes</Text>
      
      <FlatList
        data={schemes}
        renderItem={renderScheme}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Button to navigate to ApplicationFilterScreen */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ApplicationFilterScreen')}
      >
        <Text style={styles.buttonText}>Go to Application Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Light background color
  },
  list: {
    alignItems: 'center',
  },
  schemeContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff', // Card background color
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d9534f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Shadow for Android
    width:'90%', // Fixed width for consistency
  },
  schemeImage: {
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#d9534f', // Dark red color for the title
    marginBottom: 10,
  },
  schemeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Text color
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});
