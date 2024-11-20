import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitePage from '../screens/Activite/ActivitePage';
import ActivityListPage from '../screens/Activite/ActivityListPage';

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
    </Stack.Navigator>
  );
}
