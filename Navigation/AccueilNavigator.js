import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccueilPage from '../screens/Accueil/AccueilPage';
import ActivitePage from '../screens/Activite/ActivitePage';
import ReservationPage from '../screens/Reservation/ReservationPage'

const Stack = createStackNavigator();

export default function AccueilNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="AccueilPage" 
      component={AccueilPage} 
      options={{ headerShown: false }} 
      />
      <Stack.Screen 
      name="Activite" 
      component={ActivitePage} 
      options={{ headerShown: false }} 
      />
      <Stack.Screen 
      name="Reservation" 
      component={ReservationPage} 
      options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
