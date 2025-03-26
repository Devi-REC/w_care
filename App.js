import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Main from './screens/Main';
import SignupScreen from './screens/SignupScreen'; 
import AlertScreen from './screens/AlertScreen';
import FirstScreen from './screens/FirstScreen';
import FirstPageScreen from './screens/FirstPageScreen';
import SecondScreen from './screens/SecondScreen';
import VolunteerLoginScreen from './screens/VolunteerLoginScreen';
import VolunteerSignUpScreen from './screens/VolunteerSignUpScreen';
import VolunteerDashboardScreen from './screens/VolunteerDashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import SchemeDetailScreen from './screens/SchemeDetailScreen';
import ChatbotScreen from './screens/ChatbotScreen';

import ApplicationFilterScreen from './screens/ApplicationFilterScreen';
import ChatScreen from './screens/ChatScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen name="FirstPage" component={FirstPageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ApplicationFilterScreen" component={ApplicationFilterScreen} />
      <Stack.Screen name="Second" component={SecondScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VolunteerLogin" component={VolunteerLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VolunteerSignUp" component={VolunteerSignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VolunteerDashboard" component={VolunteerDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="SchemeDetail" component={SchemeDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Alert" component={AlertScreen} options={{ headerShown: false }}/> 
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}