import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react';
import useAuthStore from './store/authStore'

import MainLayout from './layout/MainLayout';
import MainLayout_f from './layout/MainLayout_f';

import Home from './pages/home/Home';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Mypage from './pages/user/Mypage';
import Select from './pages/plan/select/Select';
import Order from './pages/plan/order/Order';
import Survey from './pages/survey/Survey';
import Survey1 from './pages/survey/Survey1';
import Survey2 from './pages/survey/Survey2';
import Survey3 from './pages/survey/Survey3';
import TourRoute from './pages/plan/tourRoute/TourRoute';
import Final from './pages/plan/fianl/Final';

function App() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    if (accessToken && user) {
      login({
        ...JSON.parse(user),
        accessToken,
        refreshToken: localStorage.getItem('refreshToken'),
      });
    }
  }, [login]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />

          <Route path="/survey/1" element={<Survey />} />
          <Route path="/survey/2" element={<Survey1 />} />
          <Route path="/survey/3" element={<Survey2 />} />
          <Route path="/survey/4" element={<Survey3 />} />
        </Route>

        <Route path="/" element={<MainLayout_f />}>
          <Route path="/plan/1" element={<Select />} />
          <Route path="/plan/2" element={<Order />} />
          <Route path="/plan/3" element={<TourRoute />} />
          <Route path="/plan/4" element={<Final />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;