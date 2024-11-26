import axios from "axios";


const USER_API_URL = 'http://162.38.32.231:8087/api/themes/';

export const getThemes = async () => {
    console.log("j'arrive")
  const response = await axios.get(`${USER_API_URL}`);
  console.log(response)
  return response.data;
};

export const createTheme = async (data) => {
  const response = await axios.post(`${USER_API_URL}`, data);
  return response.data;
};
