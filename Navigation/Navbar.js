import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';

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
      bottom: 20,
      left: 20,
      right: 20,
      height: 55,
      backgroundColor: "#F2E8CF",
      borderRadius: 45,
      paddingHorizontal: 10, 
      marginHorizontal:30,
      shadowColor: '#510D0A',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
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
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 5 }}>
              <Fontisto name="tent" size={30} 
              color="#510D0A" 
                style={{ opacity: focused ? 1 : 0.4 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activité"
        component={ActivitePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 5 }}>
              <MaterialCommunityIcons 
              name="map-search" 
              size={25} 
              color="#510D0A"
                style={{ opacity: focused ? 1 : 0.4 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Réservation"
        component={ReservationPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 6 }}>
              <Entypo name="calendar" size={23} 
              color="#510D0A" 
              style={{ opacity: focused ? 1 : 0.4 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 7 }}>
                <FontAwesome5
                name="user-alt"
                size={20}
                color="#510D0A" 
                style={{ opacity: focused ? 1 : 0.4 }} 
                />            
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
