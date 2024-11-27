import axios from 'axios';

//const ACTIVITY_API_URL = 'http://10.193.2.198:8086/api/activities';
//const ACTIVITY_API_URL = 'http://162.38.37.37:8086/api/activities';
//const ACTIVITY_API_URL = 'http://192.168.1.54:8086/api/activities';
const ACTIVITY_API_URL = 'http://162.38.32.231:8086/api/activities';


// Récupérer toutes les activités
export const getAllActivities = async () => {
  try {
    const response = await axios.get(ACTIVITY_API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur lors de la récupération des activités." };
  }
};

// Récupérer une activité par ID
export const getActivityById = async (activityId) => {
  try {
    const response = await axios.get(`${ACTIVITY_API_URL}/${activityId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur lors de la récupération de l'activité." };
  }
};

// Récupérer les activités spécifiques à un utilisateur (si applicable)
export const getUserActivities = async (userId) => {
  try {
    const response = await axios.get(`${ACTIVITY_API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Erreur lors de la récupération des activités utilisateur." };
  }
};

export const createActivity = async (activity) => {
  try {
    console.log("hello j'essaies", activity)
    const response = await axios.post(ACTIVITY_API_URL, activity);
    console.log("réponse",response)
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Erreur lors de la création de l'activité." };
  }
};
