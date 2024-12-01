import styled from 'styled-components';
import SessionsChart from './Chart.session/sessionChart';
import EventChart from './Event/event';
import Conversion from './Conversion/conversion';
import Explore from './Explore/explore';

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
  return (
    <Container>
      <SessionsChart />
      <EventChart />
      <Conversion />
      <Explore />
    </Container>
  )
}

export default HomeComponent

