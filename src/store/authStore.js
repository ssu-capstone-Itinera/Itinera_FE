import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user: null,
    login: (userData) => {
        const {
            accessToken,
            refreshToken,
            accessTokenExpiration,
            refreshTokenExpiration,
            ...userInfo
        } = userData;

        // 로컬스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userInfo));

        set({ user: userInfo });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({ user: null })
    },
}));

export default useAuthStore
