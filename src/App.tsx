import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/side_bar/Sidebar';
import Header from './components/side_bar/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 
import ErrorComponent from './components/error/404';
import AddTodo from './components/add.data/add.datas';

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
            <Route path='/data/:id' element={<AddTodo />} /> 
            <Route path='*' element={<ErrorComponent />} />
          </Routes>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}




















