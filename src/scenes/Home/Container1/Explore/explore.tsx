import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { Content, LinePositio } from '../../all.Styles';
import Chip from "@mui/joy/Chip";
import  Sheet  from '@mui/joy/Sheet';
import '../../styles.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseAPI } from '../../../../utils/constants';
import moment from "moment";

const LogoutUsers = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [loggedOutUserCount, setLoggedOutUserCount] = useState<number>(0); // Chiqib ketgan foydalanuvchilar soni
  const [monthlyGrowth, setMonthlyGrowth] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));

    const fetchData = async () => {
      try {
        const response = await axios.get<any>(`${baseAPI}/userFur/user-count`); // API endpoint
        const data = response.data;

        setUserCount(data.UserCount);
        setLoggedOutUserCount(data.LoggedOutUserCount); // Chiqib ketgan foydalanuvchilar soni
        setChartData(data.usersData);

      } catch (error) {
        console.log("API chaqirig'ida xato:", error);
      }
    };

    fetchData();
  }, []);

  const getLast30DaysData = () => {
    return Array.from({ length: 30 }, (_, index) => {
      const date = moment().subtract(index, 'days').format('YYYY-MM-DD');
      return {
        date,
        count: chartData.filter((item: any) => moment(item.sana).isSame(date, 'day')).length,
      };
    }).reverse();
  };

  const last30DaysData = getLast30DaysData();

  const data = {
    labels: last30DaysData.map((d) => d.date),
    datasets: [
      {
        label: 'Revenue',
        data: last30DaysData.map((data) => data.count),
        borderColor: '#d32f2f',
        pointBackgroundColor: '#d32f2f',
        pointRadius: 0,
        fill: true,
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 60);
          gradient.addColorStop(0, 'rgba(211, 47, 47, 0.5)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          title: (context: any) => `${moment(context[0].label).format('MMM D')}`,
          label: (context: any) => ` ${context.raw}`,
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: 'white',
        bodyColor: 'white',
        bodyFont: { size: 12 },
        titleFont: { size: 14 },
      },
    },
    scales: {
      y: { display: false },
      x: { display: false },
    },
    hover: { mode: 'nearest' as const, intersect: false },
    elements: { line: { borderWidth: 2 } },
    layout: {
      padding: {
        bottom: 0,
        top: 20,
      },
    },
  };

  // return (
  //   <div>
  //     <div>
  //       <h2>Market Events</h2>
  //       <h1>{userCount}</h1>
  //       <Chip
  //         variant="soft"
  //         size="sm"
  //         color="danger"
  //         sx={{ height: "22px", border: "1px solid #d68888" }}
  //       >
  //         {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}
  //       </Chip>
  //     </div>

  //     <div>
  //       <h3>Chiqib ketgan foydalanuvchilar: {loggedOutUserCount}</h3>
  //     </div>

  //     <Line data={data} options={options} />
  //   </div>
  // );

  return (
    <Sheet className="Sheet" sx={{ border: '1.5px solid', borderColor: 'divider' }}>
      <Content>
        <div className="userWraps">
          <div className="users">
            <h2>Market Events</h2>
          </div>
          <div className="users">
            <h1>
              {userCount}
            </h1>
            <Chip
              variant="soft"
              size="sm"
              color="danger"
              sx={{height:"22px",border:"1px solid #d68888"}}
            >
              {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}
            </Chip>
          </div>
          <h5>Last 30 days</h5>
        </div>
        <LinePositio>
          <Line data={data} options={options} style={{ height: 'auto', minWidth: "200px", minHeight: "30px", maxHeight: "50px", paddingBottom: "10px" }} />
        </LinePositio>
      </Content>
    </Sheet>
  );
};

export default LogoutUsers;