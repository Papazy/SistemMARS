import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
  },
  (error) => {
    return Promise.reject(error);
  }
)

