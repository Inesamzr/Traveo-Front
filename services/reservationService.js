import axios from 'axios';

const RESERVATION_API_URL = 'http://10.193.2.198:8085/api/reservations';

// Récupérer toutes les réservations
export const getAllReservations = async () => {
  try {
    const response = await axios.get(RESERVATION_API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la récupération des réservations.' };
  }
};

// Récupérer les réservations par utilisateur
export const getReservationsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${RESERVATION_API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la récupération des réservations utilisateur.' };
  }
};

// Récupérer les réservations par activité
export const getReservationsByActivityId = async (activityId) => {
  try {
    const response = await axios.get(`${RESERVATION_API_URL}/activity/${activityId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la récupération des réservations par activité.' };
  }
};

// Créer une nouvelle réservation
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(RESERVATION_API_URL, reservationData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la création de la réservation.' };
  }
};

// Mettre à jour une réservation existante
export const updateReservation = async (reservationId, updatedData) => {
  try {
    const response = await axios.put(`${RESERVATION_API_URL}/${reservationId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la mise à jour de la réservation.' };
  }
};

// Supprimer une réservation
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${RESERVATION_API_URL}/${reservationId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Erreur lors de la suppression de la réservation.' };
  }
};

