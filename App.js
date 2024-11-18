import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navbar from './Navigation/Navbar';
import AuthNavigator from './Navigation/AuthNavigator';
import AccueilNavigator from './Navigation/AccueilNavigator';
import ActiviteNavigator from './Navigation/ActiviteNavigator';
import ReservationNavigator from './Navigation/ReservationNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Navbar" component={Navbar} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Accueil" component={AccueilNavigator} />
        <Stack.Screen name="Activite" component={ActiviteNavigator} />
        <Stack.Screen name="Reservation" component={ReservationNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
