// src/config/axios.config.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
    withCredentials: false, // Changed to false - use Authorization header instead
});

// Request interceptor - Add token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('hotel_jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        const status = error.response && error.response.status;
        console.error('Response error:', status, error.message);

        if (error.code === 'ECONNABORTED') {
            error.message = 'Request timeout - server not responding';
        } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            error.message = 'Network error - cannot connect to server. Please check if backend is running on http://localhost:8081';
        } else if (status === 401) {
            localStorage.removeItem('hotel_jwt');
            window.location.href = '/';
        } else if (status === 403) {
            error.message = 'Access denied';
        } else if (status === 500) {
            const serverMsg = error.response && error.response.data && error.response.data.message;
            error.message = serverMsg || 'Server error occurred';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
export { API_BASE_URL };