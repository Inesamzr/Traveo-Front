import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './localization/LanguageContext'; 
import LanguageSelection from './screens/Profil/LanguageSelection';
import ActivityListPage from './screens/Activite/ActivityListPage';


import Navbar from './Navigation/Navbar';
import AuthNavigator from './Navigation/AuthNavigator';
import AccueilNavigator from './Navigation/AccueilNavigator';
import ActiviteNavigator from './Navigation/ActiviteNavigator';
import ReservationNavigator from './Navigation/ReservationNavigator';
import ProfilNavigator from './Navigation/ProfilNavigator';
import ActivityDetailsPage from './screens/Activite/ActivityDetailsPage'
import ThemesPage from './screens/Theme/ThemePage';
import AddActivityThemePage from './screens/Theme/AddActivityThemePage';
import EditThemePage from './screens/Theme/EditThemePage';
import ActivityReviewsPage from './screens/Activite/ActivityReviewsPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Navbar" component={Navbar} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Accueil" component={AccueilNavigator} />
          <Stack.Screen name="Activite" component={ActiviteNavigator} />
          <Stack.Screen name="Profil" component={ProfilNavigator} />
          <Stack.Screen name="Reservation" component={ReservationNavigator} />
          <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
          <Stack.Screen name="ActivityList" component={ActivityListPage} />
          <Stack.Screen name="ActivityDetails" component={ActivityDetailsPage} />
          <Stack.Screen name="Themes" component={ThemesPage} />
          <Stack.Screen name="AddTheme" component={AddActivityThemePage} />
          <Stack.Screen name="EditTheme" component={EditThemePage} />
          <Stack.Screen name="ActivityReviews" component={ActivityReviewsPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>

  );
}
