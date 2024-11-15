import 'react-native-gesture-handler';
import Navbar from './Navigation/Navbar'
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
  );
}

