import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationListPage from '../screens/Reservation/ReservationListPage';
import ReservationDetailsPage from '../screens/Reservation/ReservationDetailsPage';

const Stack = createStackNavigator();

export default function ReservationNavigator() {
  return (
    <Stack.Navigator>
      {/* Liste des réservations */}
      <Stack.Screen 
        name="ReservationList" 
        component={ReservationListPage} 
        options={{ headerShown: false }} 
      />
      
      {/* Détails de la réservation */}
      <Stack.Screen 
        name="ReservationDetails" 
        component={ReservationDetailsPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

