import axios from 'axios';
import TokenManager from '../TokenManager';

const ApiService = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

ApiService.interceptors.request.use(
  (config) => {
     const accessToken = TokenManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response) {
      console.error('Response Error Details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default ApiService;
