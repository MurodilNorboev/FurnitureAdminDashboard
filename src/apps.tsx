// import { CssVarsProvider } from '@mui/joy/styles';
// import CssBaseline from '@mui/joy/CssBaseline';
// import Box from '@mui/joy/Box';
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import ErrorComponent from './components/error/404';
// import Header from './components/Admin/Header';
// import Sidebar from './components/Admin/Sidebar';
// import OrderTable from './scenes/Orders/OrderTable';
// import { useEffect } from 'react';
// import HomeComponent from './scenes/Home/home';
// import DashboardCompoent from './scenes/Dashboard/dashboard';
// import MessageComponent from './scenes/Messages/message';
// import UserComponents from './scenes/Users/user';
// import Settingcomponent from './scenes/Settings/setting';
// import SupportComponent from './scenes/Support/support';
// import CategorieComponent from './scenes/Categories/categorie';
// import { Navbar } from './scenes';

// interface JoyOrderDashboardTemplateProps {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (loggedIn: boolean) => void;
// }

// export default function JoyOrderDashboardTemplates({ isLoggedIn }: JoyOrderDashboardTemplateProps) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
//       navigate('/login');
//     }
//   }, [isLoggedIn, location.pathname, navigate]);

//   const LoginContainer = location.pathname === "/login" || location.pathname === "/register";

//   return (
//     <CssVarsProvider disableTransitionOnChange>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
//         <Header />
//         <Sidebar />
//         <Box
//           component="main"
//           className="MainContent"
//           sx={{
//             px: { xs: 2, md: 6 },
//             pt: {
//               xs: 'calc(12px + var(--Header-height))',
//               sm: 'calc(12px + var(--Header-height))',
//               md: 3,
//             },
//             pb: { xs: 2, sm: 2, md: 3 },
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             minWidth: 0,
//             height: '100dvh',
//             gap: 1,
//           }}
//         >
//          <Navbar />
//           <Routes>
//              <Route path="/home" element={<HomeComponent />} /> 
//              <Route path="/dashboard" element={<DashboardCompoent />} />   
//              <Route path="/orders" element={<OrderTable />} /> 
//              <Route path="/categorie/:id" element={<CategorieComponent />} /> 
//              <Route path="/messages" element={<MessageComponent />} /> 
//              <Route path="/user" element={<UserComponents />} /> 
//              <Route path="/support" element={<SupportComponent />} /> 
//              <Route path="/setting" element={<Settingcomponent />} /> 
//              <Route path="*" element={<ErrorComponent />} /> 
//           </Routes>
//         </Box>
//       </Box>
//     </CssVarsProvider>
//   );
// }

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ErrorComponent from './components/error/404';
import Header from './components/Admin/Header';
import Sidebar from './components/Admin/Sidebar';
import OrderTable from './scenes/Orders/OrderTable';
import { useEffect } from 'react';
import HomeComponent from './scenes/Home/home';
// import DashboardCompoent from './scenes/Dashboard/dashboard';
import MessageComponent from './scenes/Messages/message';
import UserComponents from './scenes/Users/user';
import Settingcomponent from './scenes/Settings/setting';
import SupportComponent from './scenes/Support/support';
import CategorieComponent from './scenes/Categories/categorie';
import { Navbar } from './scenes';
import DashboardComponent from './scenes/Dashboard/dashboard';

interface JoyOrderDashboardTemplateProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function JoyOrderDashboardTemplates() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
  //     navigate('/login');
  //   }
  // }, [isLoggedIn, location.pathname, navigate]);

  // const LoginContainer = location.pathname === "/login" || location.pathname === "/register";

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
         <Navbar />
          <Routes>
             <Route path="/home" element={<HomeComponent />} /> 
             <Route path="/dashboard" element={<DashboardComponent />} />   
             <Route path="/orders" element={<OrderTable />} /> 
             <Route path="/categorie/:id" element={<CategorieComponent />} /> 
             <Route path="/messages" element={<MessageComponent />} /> 
             <Route path="/user" element={<UserComponents />} /> 
             <Route path="/support" element={<SupportComponent />} /> 
             <Route path="/setting" element={<Settingcomponent />} /> 
             <Route path="*" element={<ErrorComponent />} /> 
          </Routes>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}