import { createStackNavigator } from '@react-navigation/stack';
import ProfilPage from '../screens/Profil/ProfilPage';
import ActivityListPage from '../screens/Activite/ActivityListPage';
import Reservations from '../screens/Reservation/ReservationPage';

const Stack = createStackNavigator();

export default function ProfilNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profil" 
        component={ProfilPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ActivityList" 
        component={ActivityListPage} 
        options={{ headerShown: false }} 
      />
       <Stack.Screen name="Reservations" component={Reservations} />
    </Stack.Navigator>
  );
}
