// services/userService.js
import axios from 'axios';
import apiClient from './apiClient';

const USER_API_URL = 'http://10.193.2.198:8080/api/user';


export const getUserById = async (userId) => {
  const response = await axios.get(`${USER_API_URL}/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, data) => {
    //const userId = AsyncStorage.getItem("userId")
    console.log(userId)
  const response = await axios.put(`${USER_API_URL}/update/${userId}`, data);
  return response.data;
};
