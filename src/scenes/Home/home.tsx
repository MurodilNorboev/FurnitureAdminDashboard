import styled from 'styled-components';
import SessionsChart from './Container1/Chart.session/sessionChart';
import EventChart from './Container1/Event/event';
import Conversion from './Container1/Conversion/conversion';
import Explore from './Container1/Explore/explore';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from 'react';
import Session from './Container2/Sessions/session';
import Download from './Container2/Downloads/download';
import Country from './Container3/Country/country';
import Table from './Container3/Table/table';

const ContainerWrapper = styled.div`
  padding: 30px 1px;
  min-height: 680px;
  overflow: scroll;
`;
const Container1 = styled.div`
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

@media screen and (max-width: 1400px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
}
`;
const Container2 = styled.div`
  padding: 30px 0px;
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  min-width: 250px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

@media screen and (max-width: 1400px) {
  grid-template-columns: repeat(2, 1fr);
}
@media screen and (max-width: 1000px) {
  grid-template-columns: repeat(1, 1fr);
  /* width: 100%; */
}
`;
const Container3 = styled.div`
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  min-width: 250px;
  display: grid;
  grid-template-columns: 3fr 1fr;

@media screen and (max-width: 1400px) {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
@media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
}
`;
const Content3 = styled.div`
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  min-width: 250px;
  display: grid;
  align-content: start;
  grid-template-columns: repeat(1, 2fr);

@media screen and (max-width: 1400px) {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
@media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
}
`;

function HomeComponent() {
const [ loading, setLoadig ] = useState(false);
const data = [300, 150, 100, 250, 500];
const labels = ['USA', 'Canada', 'Mexico', 'Germany', 'Australia'];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFB533', '#33FFF7'];
const flags = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1920px-Flag_of_Canada.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png',
];

useEffect(() => {
  setLoadig(true);
  setTimeout(() => {
    setLoadig(false)
  }, 100);
}, [])
  return (
    <ContainerWrapper>
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
         <ScaleLoader color={'#303648'} loading={loading} />
        </div>
      )
        : 
      (
      <>
        <Container1>
          <SessionsChart />
          <EventChart />
          <Conversion />
          <Explore />
        </Container1>

        <Container2>
          <Session />
          <Download />
        </Container2>

        <Container3>
          <Table />
            <Content3>
              <Country data={data} labels={labels} flags={flags}/>
            </Content3>
        </Container3>
      </> )
      }

      
    </ContainerWrapper>
  )
}

export default HomeComponent


