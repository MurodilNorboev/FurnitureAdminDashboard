import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // Stilni qo'shish
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import avatar from '../../assets/avatar.png';
import { Avatars, Button, Container, Dashboard, StyledCalendar, Wrapper } from './navbar_sty';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

const MyCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [])

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
      
        
      <Dashboard >
        {isFirstVisit && (
          <div>
            <h2>Xush kelibsiz, Admin!</h2>
            <p>Dashboardga kirganingiz uchun rahmat!</p>
          </div>
        )}
      </Dashboard>

      {loading ? (
        <div style={{display:"flex",width:"100%",justifyContent:"end",paddingTop:"5px",gap:'20px'}}>
             <div>
               <Skeleton variant="rectangular" width={150} height="2em" />
             </div>
             <Skeleton variant="circular" width={35} height={35} />
        </div>
      )
      : 
      (
       <Wrapper>
        <Button onClick={() => setData(true)}>
          <CalendarTodayIcon /> {new Date().toDateString()}
        </Button>
        {data && (
          <div
            style={{
              position: 'fixed',
              zIndex:99999,
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
      )
      }
    </Container>
  );
};

export default MyCalendar;


