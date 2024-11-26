import axios from 'axios';
import apiClient from './apiClient';

//const ACTIVITY_API_URL = 'http://10.193.2.198:8086/api/activities';
//const ACTIVITY_API_URL = 'http://162.38.37.37:8086/api/activities';
const ACTIVITY_API_URL = 'http://192.168.1.54:8086/api/activities';


// Récupérer toutes les activités
export const getAllActivities = async () => {
  try {
    const response = await axios.get(ACTIVITY_API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur lors de la récupération des activités." };
  }
};

// Récupérer les activités spécifiques à un utilisateur (si applicable)
export const getUserActivities = async (userId) => {
  try {
    console.log("hello j'essaies", userId)
    const response = await axios.get(`${ACTIVITY_API_URL}/user/${userId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur lors de la récupération des activités utilisateur." };
  }
};
