// services/authService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL = 'http://162.38.37.37:8080/api/user';
//const API_URL = 'http://192.168.1.54:8080/api/user';
//const API_URL = `http://162.38.32.231:8080/api/user`;
//const API_URL = 'http://162.38.37.37:8080/api/user';
//const API_URL = 'http://10.193.2.198:8080/api/users';
//const API_URL = 'http://192.168.1.54:8080/api/user';
const API_URL = `http://162.38.32.231:8080/api/users`;


// Fonction pour se connecter
export const login = async (email, password) => {
    console.log("connexion")
    console.log(API_URL)
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
     AsyncStorage.setItem('userToken', response.data.token); 
     AsyncStorage.setItem('userId', response.data.id.toString());
     AsyncStorage.setItem('userRole', response.data.role); 
    console.log("user id : " , response.data.id.toString())

    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);

    console.log (keys)
    console.log (stores)

    const storedId = await AsyncStorage.getItem('userId');
    console.log('Stored User ID:', storedId);

    return response.data

  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur de connexion au serveur' };
  }
};

export const register = async (data) => {
    console.log(API_URL)
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    
     AsyncStorage.setItem('userToken', response.data.token); // Stocke le token
     AsyncStorage.setItem('userId', response.data.id.toString());
     AsyncStorage.setItem('userRole', response.data.role); 

    return response.data

  } catch (error) {
      console.error("Register Error:", error);
      throw error.response ? error.response.data : { message: 'Erreur de connexion au serveur' };
  }
};


export const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userRole');
  };