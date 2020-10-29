import axios from 'axios';

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const createHeaders = () => {
  if (localStorage.getItem('token')) {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
  return null;
}
