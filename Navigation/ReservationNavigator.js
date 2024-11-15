import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationPage from '../screens/Reservation/ReservationPage';

const Stack = createStackNavigator();

export default function ReservationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ReservationPage" 
        component={ReservationPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
