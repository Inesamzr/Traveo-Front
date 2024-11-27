import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  //baseURL: 'http://162.38.32.197:',
  baseURL: 'http://162.38.32.231:',
  //baseURL: 'http://162.38.37.37:',
  //baseURL: 'http://192.168.1.54:',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout d'un intercepteur pour injecter le token automatiquement
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
