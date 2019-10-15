import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-spot.herokuapp.com',
})

export default api;