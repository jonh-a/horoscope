/* eslint-disable no-param-reassign */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const openweathermap = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
  },
});

openweathermap.interceptors.request.use((config) => {
  config.params = {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
    ...config.params,
  };

  return config;
});

export default openweathermap;
