import axios from 'axios';

const API_URL = 'http://10.193.2.198:8088/api/avis/';

export const fetchReviewsByReservationId = async (reservationId) => {
    console.log(`${API_URL}activite/${reservationId}`)
  const response = await axios.get(`${API_URL}activite/${reservationId}`);
  return response.data; 
};
