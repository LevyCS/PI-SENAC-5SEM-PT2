import axios from 'axios';
import { useAuth } from '../store/useAuth';
import { toast } from 'react-toastify';

export const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuth.getState().clear();
      toast.error('Seu login expirou, por favor, logue novamente')
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;