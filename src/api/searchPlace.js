import api from './axiosInstance';

export const fetchSearchPlaces = async (req) => {
    try {
        const res = await api.post('/v1/place/myPlaceSearch', req);
        return res.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};