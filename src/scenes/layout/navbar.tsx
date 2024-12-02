import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // Stilni qo'shish
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import avatar from '../../assets/avatar.png';
import { Avatars, Button, Container, Dashboard, StyledCalendar, Wrapper } from './navbar_sty';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const [data, setData] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const navigate = useNavigate();

  // Calendar modalini yopish
  const handleClose = () => {
    setData(false);
  };

  // Calendarning ichiga bosilganda modal yopilmasligi uchun
  const handleClickInsideCalendar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // Tanlangan sanani o'zgartirish
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setData(false); // Sana tanlanganidan keyin modalni yopish
  };

  // Xush kelibsiz xabarini faqat bir marta ko'rsatish
  useEffect(() => {
    setIsFirstVisit(false);
  }, []);

  return (
    <Container>
      
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                Home
              </Typography>
            </Breadcrumbs>
          </Box>

      <Dashboard>
        {isFirstVisit && (
          <div>
            <h2>Xush kelibsiz, Admin!</h2>
            <p>Dashboardga kirganingiz uchun rahmat!</p>
          </div>
        )}
      </Dashboard>
      <Wrapper>
        <Button onClick={() => setData(true)}>
          <CalendarTodayIcon /> {new Date().toDateString()}
        </Button>
        {data && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleClose}
          >
            <div onClick={handleClickInsideCalendar}>
              <StyledCalendar value={date} onClickDay={handleDateChange} />
            </div>
          </div>
        )}
        <Avatars src={avatar} alt="imag🌌" onClick={() => navigate('/profile')} />
      </Wrapper>
    </Container>
  );
};

export default MyCalendar;


