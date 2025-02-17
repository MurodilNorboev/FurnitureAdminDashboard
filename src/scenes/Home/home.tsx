import styled from "styled-components";
import SessionsChart from "./Container1/Chart.session/sessionChart";
import Explore from "./Container1/Explore/explore";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import Session from "./Container2/Sessions/session";
import Country from "./Container2/Country/country";
import axios from "axios";
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

// function HomeComponent() {
//   const [loading, setLoadig] = useState(false);
//   const [counts, setCounts] = useState<any[]>([]);
//   const data = [300, 150, 100, 250, 500];
//   const labels = ["USA", "Canada", "Mexico", "Germany", "Australia"];
//   const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFB533", "#33FFF7"];
//   const flags = [
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1920px-Flag_of_Canada.svg.png",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png",
//   ];

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchData = async () => {
//       try {
//         const { data }: any = await axios.get(`${baseAPI}/userFur/locations`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(data);

//         if (data.success) {
//           setLoadig(false);
//           setCounts(data.locations.count);
//         }
//       } catch (error: any) {
//         console.log(error);

//       }
//     }

//     fetchData();
//   }, [])

//   useEffect(() => {
//     setLoadig(true);
//     setTimeout(() => {
//       setLoadig(false);
//     }, 100);
//   }, []);
//   return (
//     <ContainerWrapper>
//       {loading ? (
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <ScaleLoader color={"#1976e8d7"} loading={loading} />
//         </div>
//       ) : (
//         <>
//           <Container1>
//             <SessionsChart />
//             <Explore />
//           </Container1>

//           <Container2>
//             <Session />
//             <Country data={data} labels={labels} flags={flags} />
//           </Container2>
//         </>
//       )}
//     </ContainerWrapper>
//   );
// }

// export default HomeComponent;

function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

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

          setLabels(newLabels);
          setData(newData);
          setFlags(newFlags);
        }
      } catch (error) {
        console.error("API chaqirig'ida xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  // Mamlakatga mos bayroq URL ni olish
  const getCountryFlagUrl = (countryName: string) => {
    const countryFlags: { [key: string]: string } = {
      Uzbekiston: "https://upload.wikimedia.org/wikipedia/commons/4/42/O%E2%80%98zbekiston_bayrog%E2%80%98i_-_National_flag_of_Uzbekistan.png",
      "South Korea": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1920px-Flag_of_South_Korea.svg.png",
      "United States": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
      Germany: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png",
      China: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTeDtzhkJE6Wa563YRAMZHmm3ay4LmOOnQdA&s",
      Russia: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png",
      Japan: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5b8GuKck0Wsdn1ncqXMS4u3-V0hHBRlnuRw&s",
    };

    return (
      countryFlags[countryName] ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Nations.svg/1920px-Flag_of_the_United_Nations.svg.png"
    ); 
  };

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
            <Explore />
          </Container1>

          <Container2>
            <Session />
            <Country data={data} labels={labels} flags={flags} />
          </Container2>
        </>
      )}
    </ContainerWrapper>
  );
}

export default HomeComponent;
