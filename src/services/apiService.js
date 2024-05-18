import axios from 'axios';

const apiService = axios.create({
  // TODO change url
  baseURL: 'http://localhost:3000',
});

export default apiService;