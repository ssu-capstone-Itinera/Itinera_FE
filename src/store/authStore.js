import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  initialized: false,

  initialize: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    if (accessToken && refreshToken && user) {
      set({
        accessToken,
        refreshToken,
        user: JSON.parse(user),
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }
  },

  login: ({ accessToken, refreshToken, ...userInfo }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userInfo));

    set({ accessToken, refreshToken, user: userInfo });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, accessToken: null, refreshToken: null });
    window.location.href = '/login'; // 로그아웃 후 로그인 페이지 이동
  },
}));

export default useAuthStore;
