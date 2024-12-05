import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ErrorComponent from './components/error/404';
import Header from './components/Admin/Header';
import Sidebar from './components/Admin/Sidebar';
import OrderTable from './scenes/Orders/OrderTable';
import HomeComponent from './scenes/Home/home';
import MessageComponent from './scenes/Messages/message';
import UserComponents from './scenes/Users/user';
import Settingcomponent from './scenes/Settings/setting';
import SupportComponent from './scenes/Support/support';
import CategorieComponent from './scenes/Categories/categorie';
import { Navbar } from './scenes';
import Test from './test/test';
import Login from './components/Profile/profile';


export default function JoyOrderDashboardTemplates() {

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
             <Route path="/categorie/:id" element={<CategorieComponent />} /> 
             <Route path="/messages" element={<MessageComponent />} /> 
             <Route path="/user" element={<UserComponents />} /> 
             <Route path="/support" element={<SupportComponent />} /> 
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