// services/authService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';

const API_URL = `${apiClient}/user`;

// Fonction pour se connecter
export const login = async (email, password) => {
    console.log("connexion")
    console.log(API_URL)
  try {
    const response = await apiClient.post('/user/login', { email, password });
    //await AsyncStorage.setItem('userToken', response.data.token); // Stocke le token
    AsyncStorage.setItem('userId', response.data.id.toString());
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

export const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
  };