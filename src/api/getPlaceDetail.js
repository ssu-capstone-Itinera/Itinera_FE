import api from './axiosInstance';

// id에 따라 상세 조회
export const fetchDetail = async (googleId) => {
    try {
        const res = await api.get(`/v1/place/${googleId}`);
        return res.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};
