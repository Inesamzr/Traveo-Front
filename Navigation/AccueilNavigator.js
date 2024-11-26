import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccueilPage from '../screens/Accueil/AccueilPage';
import ActivitePage from '../screens/Activite/ActivitePage';
import ReservationPage from '../screens/Reservation/ReservationPage'
import CreerActivitePage from '../screens/Activite/CreerActivitePage';
import ActivityListPage from '../screens/Activite/ActivityListPage';
import ActivityDetailsPage from '../screens/Activite/ActivityDetailsPage';

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
      <Stack.Screen 
      name="CreerActivite" 
      component={CreerActivitePage} 
      options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ActivityList" 
        component={ActivityListPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ActivityDetails" 
        component={ActivityDetailsPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
