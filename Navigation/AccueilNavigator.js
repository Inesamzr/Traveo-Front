import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccueilPage from '../screens/AccueilPage';

const Stack = createStackNavigator();

export default function AccueilNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccueilPage" component={AccueilPage} />
    </Stack.Navigator>
  );
}
