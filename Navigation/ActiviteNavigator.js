import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitePage from '../screens/Activite/ActivitePage';
import ActivityListPage from '../screens/Activite/ActivityListPage';
import ActivityDetailsPage from '../screens/Activite/ActivityDetailsPage'
import ActivityReviewsPage from '../screens/Activite/ActivityReviewsPage'

const Stack = createStackNavigator();

export default function ActiviteNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ActivitePage" 
        component={ActivitePage} 
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
      <Stack.Screen name="ActivityReviews" 
      component={ActivityReviewsPage} 
      options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
