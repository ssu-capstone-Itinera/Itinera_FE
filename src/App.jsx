import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layout/MainLayout';
import MainLayout_f from './layout/MainLayout_f';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Select from './pages/plan/select/Select';
import Order from './pages/plan/order/Order';
import Survey from './pages/survey/Survey';
import Survey2 from './pages/survey/Survey2';
import Survey3 from './pages/survey/Survey3';
import TourRoute from './pages/plan/tourRoute/TourRoute';
import Final from './pages/plan/fianl/Final';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<MainLayout_f />}>
          <Route path="/plan/select" element={<Select />} />
          <Route path="/plan/order" element={<Order />} />
          <Route path="/plan/route" element={<TourRoute />} />
          <Route path="/plan/final" element={<Final />} />
          <Route path="/survey/1" element={<Survey />} />
          <Route path="/survey/2" element={<Survey2 />} />
          <Route path="/survey/3" element={<Survey3 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
