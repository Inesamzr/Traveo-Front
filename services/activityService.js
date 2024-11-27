import axios from 'axios';

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
