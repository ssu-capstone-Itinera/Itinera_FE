import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layout/MainLayout';
import MainLayout_f from './layout/MainLayout_f';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Select from './pages/plan/select/Select';
import Order from './pages/plan/order/Order';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
