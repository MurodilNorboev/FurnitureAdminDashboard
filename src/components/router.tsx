import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from './Form/register';
import { useState, useEffect } from 'react';
import Login from './Form/login';
import JoyOrderDashboardTemplates from '../apps';
import OrderList from '../scenes/Orders/OrderList';

const RouterComponent = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login  />} />
      <Route path='/' element={<Login  />} />      
      <Route path='/register' element={<Register />} />

      <Route path='/*' element={<JoyOrderDashboardTemplates  />} />
      <Route path='/*' element={<JoyOrderDashboardTemplates />} />
    </Routes>
  );
};

export default RouterComponent;

