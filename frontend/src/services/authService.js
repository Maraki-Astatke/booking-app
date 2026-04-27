import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const API_URL = import.meta.env.VITE_API_URL || "https://booking-production-a1ed.up.railway.app";

export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
}

export async function loginUser(userData) {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response.data;
}

export async function getCurrentUser(token) {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
