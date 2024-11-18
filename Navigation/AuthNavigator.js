import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilPage from '../screens/Profil/ProfilPage';
import LoginPage from '../screens/Profil/LoginPage';
import RegisterPage from '../screens/Profil/RegisterPage';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="Login" 
        component={LoginPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profil" 
        component={ProfilPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
