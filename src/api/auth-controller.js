import api from './axiosInstance';

export const signup = (data) => api.post('/v1/auth/signup', data);

export const login = (data) => api.post('/v1/auth/login', data);

export const deleteAccount = () => api.delete('/v1/auth/withdraw');
