import axios from 'axios';

const ApiService = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

ApiService.interceptors.request.use(
  (config) => {
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
    }
    return Promise.reject(error);
  }
);

export default ApiService;