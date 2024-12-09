import styled from 'styled-components';
import SessionsChart from './Chart.session/sessionChart';
import EventChart from './Event/event';
import Conversion from './Conversion/conversion';
import Explore from './Explore/explore';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 30px 0px;
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  min-width: 250px;

@media screen and (max-width: 1400px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
}
`;

function HomeComponent() {
const [ loading, setLoadig ] = useState(false);

useEffect(() => {
  setLoadig(true);
  setTimeout(() => {
    setLoadig(false)
  }, 5000);
}, [])
  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center',position:"fixed", top: 30 }}>
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
      {loading ? 
      (
        <div style={{width:"100vw",minHeight:"40rem", height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
         <ScaleLoader color={'#1976e8d7'} loading={loading} />
        </div>
      )
        : 
      ( <>
      <SessionsChart />
      <EventChart />
      <Conversion />
      <Explore />
       </> )
      }

      
    </Container>
  )
}

export default HomeComponent


