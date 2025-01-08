// src/api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your actual API URL

export const fetchSongs = async (page) => {
  const response = await axios.get(`${API_URL}?page=${page}`); // Adjust according to your API
  return response.data;
};

export default {
  fetchSongs,
};
