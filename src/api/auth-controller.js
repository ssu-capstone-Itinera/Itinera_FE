import api from './axiosInstance';

export const signup = (data) => api.post('/v1/auth/signup', data);

export const login = (data) => api.post('/v1/auth/login', data);

export const refresh = (refreshToken) =>
  axios.post('/vi/auth/refresh', { refreshToken });

export const deleteAccount = () => axios.delete('/vi/auth/withdraw');
