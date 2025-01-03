import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { Route, Routes } from 'react-router-dom';
import ErrorComponent from './components/error/404';
import Header from './components/Admin/Header';
import Sidebar from './components/Admin/Sidebar';
import OrderTable from './scenes/Orders/OrderTable';
import HomeComponent from './scenes/Home/home';
import MessageComponent from './scenes/Messages/message';
import UserComponents from './scenes/Users/user';
import Settingcomponent from './scenes/Settings/setting';
import CategorieComponent from './scenes/Products/categorie';
import { Navbar } from './scenes';
import Test from './test/Tests';
import Login from './components/Profile/profile';
import { SendBirdProvider } from '@sendbird/uikit-react'; 
import { useEffect, useState } from 'react';


export default function JoyOrderDashboardTemplates() {
  const userId = "Admin";
  const accessToken = "accessTokenHere"; 

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
             <Route path="/orders" element={<OrderTable />} /> 
             <Route path="/categorie" element={<CategorieComponent />} /> 
             <Route path="/messages" element={    
                <SendBirdProvider
                  appId="894E1E6C-8871-47A1-935D-B9B0BDB46A25" 
                  userId={userId}
                  accessToken={accessToken || undefined}
                >
                  <MessageComponent appId="894E1E6C-8871-47A1-935D-B9B0BDB46A25" adminId={userId} accessToken={accessToken} />
                </SendBirdProvider>} /> 
             <Route path="/user" element={<UserComponents />} /> 
             <Route path="/setting" element={<Settingcomponent />} /> 
             <Route path='profile' element={<Login />} />
             <Route path="*" element={<ErrorComponent />} /> 

             {/* //// testing  */}
             <Route path='test' element={<Test />} />
          </Routes>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}