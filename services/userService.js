// services/userService.js
import apiClient from './apiClient';

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, data) => {
    //const userId = AsyncStorage.getItem("userId")
    console.log(userId)
  const response = await apiClient.put(`/user/update/${userId}`, data);
  return response.data;
};
