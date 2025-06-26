import axios from 'axios';


const api = axios.create({
  baseURL: 'https://saleschatbot-s7sz.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url); 
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
     
    }
    
    return Promise.reject(error);
  }
);

export default api;