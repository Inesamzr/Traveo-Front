import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import ActivitePage from '../screens/ActivitePage';
import ReservationPage from '../screens/ReservationPage';
import ProfilPage from '../screens/ProfilPage';
import AccueilPage from '../screens/AccueilPage';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    backgroundColor: "#D9D9D9",
  },
};

export default function Navbar() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Accueil"
        component={AccueilPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo name="home" size={30} color={focused ? "#008900" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activité"
        component={ActivitePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5 name="map-marker-alt" size={25} color={focused ? "#008900" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Réservation"
        component={ReservationPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons name="ticket-confirmation" size={30} color={focused ? "#008900" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5 name="user-alt" size={25} color={focused ? "#008900" : "#111"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
