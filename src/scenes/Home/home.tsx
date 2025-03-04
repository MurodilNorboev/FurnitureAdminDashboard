import styled from "styled-components";
import SessionsChart from "./Container1/Chart.session/sessionChart";
import Explore from "./Container1/Explore/explore";
import { useEffect, useState } from "react";
import Session from "./Container2/Sessions/session";
import Country from "./Container2/Country/country";
import { baseAPI } from "../../utils/constants";

const ContainerWrapper = styled.div`
  padding: 30px 1px;
  min-height: 680px;
`;
const Container1 = styled.div`
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

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
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`${baseAPI}/userFur/locations`); // API endpoint
        const result = await response.json();

        if (result.locations) {
          const newLabels = result.locations.map((item: any) => item._id);
          const newData = result.locations.map((item: any) => item.count);
          const newFlags = newLabels.map((country: any) =>
            getCountryFlagUrl(country)
          );

          // Tartiblangan ma'lumot
          const sortedData = newData
            .map((value: any, index: any) => ({
              value,
              label: newLabels[index],
              flag: newFlags[index],
            }))
            .sort((a: any, b: any) => b.value - a.value); // Count bo'yicha kamayish tartibida

          const sortedLabels = sortedData.map((item: any) => item.label);
          const sortedDataCount = sortedData.map((item: any) => item.value);
          const sortedFlags = sortedData.map((item: any) => item.flag);

          setLabels(sortedLabels);
          setData(sortedDataCount);
          setFlags(sortedFlags);
        }
      } catch (error) {
        console.error("API chaqirig'ida xato:", error);
      }
    };

    fetchCountryData();
  }, []);

  // Mamlakatga mos bayroq URL ni olish
  const getCountryFlagUrl = (countryName: string) => {
    const countryFlags: { [key: string]: string } = {
      Uzbekistan:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUJEMuVn4PhjpfQQCnkZ3hFZdmLdnqSFhiXKMXOrgIya3UlvDc9u5w7fX3FHslSiF3Hw&usqp=CAU",
      "South Korea":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1920px-Flag_of_South_Korea.svg.png",
      "United States":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
      Germany:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png",
      China:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTeDtzhkJE6Wa563YRAMZHmm3ay4LmOOnQdA&s",
      Russia:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png",
      Japan:
        "https://thumbs.dreamstime.com/b/%CE%B5%CE%B8%CE%BD%CE%B9%CE%BA%CE%AE-%CF%83%CE%B7%CE%BC%CE%B1%CE%AF%CE%B1-%CF%84%CE%B7%CF%82-%CE%B9%CE%B1%CF%80%CF%89%CE%BD%CE%AF%CE%B1%CF%82-6594258.jpg",
    };

    return (
      countryFlags[countryName] ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Nations.svg/1920px-Flag_of_the_United_Nations.svg.png"
    );
  };

  return (
    <ContainerWrapper>
      <Container1>
        <SessionsChart />
        <Explore />
      </Container1>

      <Container2>
        <Session />
        <Country data={data} labels={labels} flags={flags} />
      </Container2>
    </ContainerWrapper>
  );
}

export default HomeComponent;
