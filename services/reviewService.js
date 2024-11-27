import axios from 'axios';

const API_URL = 'http://162.38.32.231:8088/api/avis';

export const fetchReviewsByReservationId = async (reservationId) => {
  const response = await axios.get(`${API_URL}/activite/${reservationId}`);
  return response.data; 
};

export const addReview = async (data) => {
    console.log(data)
  const response = await axios.post(`${API_URL}`, data);
  return response.data; 
};


export const deleteReview = async (reviewId) => {
  const response = await axios.delete(`${API_URL}/${reviewId}`);
  return response.data;
};

