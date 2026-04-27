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

export async function createBooking(bookingData) {
  const response = await api.post('/bookings', bookingData);
  return response.data;
}

export async function getUserBookings() {
  const response = await api.get('/bookings');
  return response.data;
}

export async function getBookingById(id) {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
}

export async function cancelBooking(id) {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
}