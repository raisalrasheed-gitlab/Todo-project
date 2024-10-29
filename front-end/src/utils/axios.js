import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8001/',
  timeout: 8001,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default instance;
