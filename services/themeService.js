import axios from "axios";


const USER_API_URL = 'http://10.193.2.198:8087/api/themes/';

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

export const deleteTheme = async (themeId) => {
    console.log(themeId)
    console.log(`${USER_API_URL}/${themeId}`)
    const response = await axios.delete(`${USER_API_URL}${themeId}`)
    return response.data
}
