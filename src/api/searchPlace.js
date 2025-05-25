import api from './axiosInstance';

export const fetchSearchPlaces = async ({ requestBodyWithCursor}) => {
    try {
        const res = await api.post('/v1/place/myPlaceSearch', { requestBodyWithCursor});
        return res.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};