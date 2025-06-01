import axios from 'axios';
import useAuthStore from '../store/authStore';

const instance = axios.create({
  baseURL: `/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 보낼 때 accessToken 자동 추가
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 에러 처리 (401 발생 시 리프레시 시도)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const authStore = useAuthStore.getState();

      //console.log('기존 엑세스 토큰:', localStorage.getItem('accessToken'));

      if (!refreshToken) {
        console.error('리프레시 토큰이 없음! 로그아웃 처리');
        authStore.logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        console.log('new AccessToken:', newAccessToken);

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Zustand store 업데이트
        authStore.login({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          ...(authStore.user || {}),
        });

        console.log('재요청 헤더:', originalRequest.headers.Authorization);
        console.log('재요청 req:', originalRequest.data);

        // 실패했던 요청에 새 토큰 넣고 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);

      } catch (refreshError) {
        // 리프레시 실패하면 로그아웃 처리
        console.log("리프레시 실패")
        //authStore.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
