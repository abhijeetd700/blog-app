// axiosConfig.js
import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL  // Replace with your backend URL
});

const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
