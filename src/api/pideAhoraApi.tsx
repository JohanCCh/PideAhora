import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.3.5:3000'; //agregar la ip de la maquina mas ":3000"

const pideAhoraApi = axios.create({baseURL});

pideAhoraApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('x-access-token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default pideAhoraApi;
