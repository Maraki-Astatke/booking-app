import axios from 'axios';

// const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://yeshi-app-backend.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function addFavorite(destinationId) {
  const response = await api.post('/favorites', { destination_id: destinationId });
  return response.data;
}

export async function removeFavorite(destinationId) {
  const response = await api.delete(`/favorites/${destinationId}`);
  return response.data;
}

export async function getUserFavorites() {
  const response = await api.get('/favorites');
  return response.data;
}

export async function checkFavorite(destinationId) {
  const response = await api.get(`/favorites/check/${destinationId}`);
  return response.data;
}