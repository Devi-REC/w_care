import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true, title: 'Home' }}
    />
    <Tab.Screen
      name="Alert"
      component={AlertScreen}
      options={{ headerShown: true, title: 'Alerts' }}
    />
    <Tab.Screen
      name="Schemes"
      component={SchemesScreen}
      options={{ headerShown: true, title: 'Schemes' }}
    />
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={{ headerShown: true, title: 'About Us' }}
    />
  </Tab.Navigator>
  
  );
}
