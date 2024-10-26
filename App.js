import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Main from './screens/Main';
import SignupScreen from './screens/SignupScreen'; 
import AlertScreen from './screens/AlertScreen';
import FirstScreen from './screens/FirstScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
      <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="Alert" component={AlertScreen} options={{ headerShown: false }}/> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}