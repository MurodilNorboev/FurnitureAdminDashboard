

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/types/Sidebar';
import Header from './components/types/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 
import CarouselComponent from './components/pages/carousel';
import CaravanComponent from './components/pages/caravan';
import TuningComponent from './components/pages/tuning';
import UsedCarComponent from './components/pages/usedCar';
import CampingPlaceComponent from './components/pages/campingPlace';
import UserListComponent from './components/pages/userList';
import MassageComponent from './components/pages/massage';
import OmaterialMoto from './components/hook/OmaterialMoto';
import Omaterialcaravan from './components/hook/OmaterialCaravan';
import Omaterialtuning from './components/hook/OmaterialTuning';
import OmaterialusedCar from './components/hook/OmaterialUsed';
import ErrorComponent from './components/error/404';
import OmaterialCamp from './components/hook/Omaterial';
import MotorComponent from './components/pages/motor';
import NameComponent from './components/test/name';

interface JoyOrderDashboardTemplateProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function JoyOrderDashboardTemplate({ isLoggedIn }: JoyOrderDashboardTemplateProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const LoginContainer = location.pathname === "/login" || location.pathname === "/register";
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        {!LoginContainer && <><Header /><Sidebar /></>}

        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: { xs: 'calc(12px + var(--Header-height))', sm: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >

          
          <Routes>
            <Route path='/motor' element={<MotorComponent />} />
            <Route path="/omaterial/motor/:id" element={<OmaterialMoto onClose={() => navigate(-1)} />} />

            <Route path='/caravan' element={<CaravanComponent />} />
            <Route path="/omaterial/caravan/:id" element={<Omaterialcaravan onClose={() => navigate(-1)} />} />


            <Route path='/tuning' element={<TuningComponent />} />
            <Route path="/omaterial/tuning/:id" element={<Omaterialtuning onClose={() => navigate(-1)} />} />

            <Route path='/usedCar' element={<UsedCarComponent />} />
            <Route path="/omaterial/usedCar/:id" element={<OmaterialusedCar onClose={() => navigate(-1)} />} />

            <Route path='/campingPlace' element={<CampingPlaceComponent />} />
            <Route path="/omaterial/camping/:id" element={<OmaterialCamp onClose={() => navigate(-1)} />} />

            <Route path='/userList' element={<UserListComponent />} />
            <Route path='/carousel' element={<CarouselComponent />} />
            <Route path='/message' element={<MassageComponent />} />

            <Route path='*' element={<ErrorComponent />} />
          </Routes>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}




















