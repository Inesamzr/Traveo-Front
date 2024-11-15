import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitePage from '../screens/ActivitePage';

const Stack = createStackNavigator();

export default function ActiviteNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ActivitePage" 
        component={ActivitePage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
