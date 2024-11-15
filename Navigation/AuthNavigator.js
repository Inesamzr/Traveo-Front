import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilPage from '../screens/Profil/ProfilPage';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfilPage" 
        component={ProfilPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
