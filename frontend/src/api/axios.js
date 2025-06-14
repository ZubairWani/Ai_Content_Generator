// frontend/src/api/axios.js

import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? 'https://ai-content-generator-server-z1e2.onrender.com'
  : 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;