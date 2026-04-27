import axios from 'axios';

// const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://booking-production-a1ed.up.railway.app/api';

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

export async function getAllDestinations() {
  const response = await api.get('/destinations');
  return response.data;
}

export async function getDestinationById(id) {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
}