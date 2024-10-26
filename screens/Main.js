import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import HomeScreen from './HomeScreen';  // Adjust the path accordingly
import AlertScreen from './AlertScreen';  // Ensure the path is correct
import SchemesScreen from './SchemesScreen';
import AboutScreen from './AboutScreen';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Alert':
              iconName = 'notifications';
              break;
            case 'Schemes':
              iconName = 'work';
              break;
            case 'About':
              iconName = 'info';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffe6e6',  // Active icon color (bright red)
        tabBarInactiveTintColor: '#B0BEC5', // Inactive icon color (light gray)
        tabBarStyle: { backgroundColor: '#d9534f' }, // Background color of the tab bar (light red)
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./wcare_logo.png')}  // Replace with your logo image path
              style={{ width: 95, height: 100, resizeMode: 'contain',marginTop:"10%" }}
            />
          ),
          headerStyle: { backgroundColor: '#ffe6e6' },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./wcare_logo.png')}  // Replace with your logo image path
              style={{ width: 95, height: 100, resizeMode: 'contain',marginTop:"10%" }}
            />
          ),
          headerStyle: { backgroundColor: '#ffe6e6' },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Schemes"
        component={SchemesScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./wcare_logo.png')}  // Replace with your logo image path
              style={{ width: 95, height: 100, resizeMode: 'contain',marginTop:"10%" }}
            />
          ),
          headerStyle: { backgroundColor: '#d9534f' },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./wcare_logo.png')}  // Replace with your logo image path
              style={{ width: 95, height: 100, resizeMode: 'contain',marginTop:"10%" }}
            />
          ),
          headerStyle: { backgroundColor: '#d9534f' },
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}
