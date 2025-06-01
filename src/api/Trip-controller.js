import api from './axiosInstance';

export const saveTrip = async (req) => {
  try {
    const res = await api.post('trip/save', req);
    return res.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const getTripDetail = async (memberId, tripId) => {
    try {
        const res = await api.get(`trip/${memberId}/${tripId}`);
        return res.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};