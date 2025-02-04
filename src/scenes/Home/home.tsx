import styled from "styled-components";
import SessionsChart from "./Container1/Chart.session/sessionChart";
import EventChart from "./Container1/Event/event";
import Conversion from "./Container1/Conversion/conversion";
import Explore from "./Container1/Explore/explore";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import Session from "./Container2/Sessions/session";
import Country from "./Container2/Country/country";
import Table from "./Container3/table";

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

  @media screen and (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function HomeComponent() {
  const [loading, setLoadig] = useState(false);
  const data = [300, 150, 100, 250, 500];
  const labels = ["USA", "Canada", "Mexico", "Germany", "Australia"];
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFB533", "#33FFF7"];
  const flags = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1920px-Flag_of_Canada.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png",
  ];

  useEffect(() => {
    setLoadig(true);
    setTimeout(() => {
      setLoadig(false);
    }, 100);
  }, []);
  return (
    <ContainerWrapper>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScaleLoader color={"#1976e8d7"} loading={loading} />
        </div>
      ) : (
        <>
          <Container1>
            <SessionsChart />
            <EventChart />
            <Conversion />
            <Explore />
          </Container1>

          <Container2>
            <Session />
            <Country data={data} labels={labels} flags={flags} />
          </Container2>

          <Table />
        </>
      )}
    </ContainerWrapper>
  );
}

export default HomeComponent;
