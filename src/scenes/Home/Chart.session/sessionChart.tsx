import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { baseAPI } from "../../../utils/constants";
import moment from 'moment';
import Chip from "@mui/joy/Chip";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import Avatar from "@mui/joy/Avatar";
import { Container, Content, LinePositio } from "../event.sty";

chartjs.register(
  LineElement,
  CategoryScale,
  PointElement,
  Legend,
  LinearScale,
  Tooltip,
  Filler
);
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const daysInMonth = getDaysInMonth(currentMonth + 1, currentYear);

function LineChart() {
  const [userCountByDate, setUserCountByDate] = useState<Record<string, number>>({});
  const [userCount, setUserCount] = useState<number>(0);
  const [lastMonthUserCount, setLastMonthUserCount] = useState<number>(0);
  const [thisMonthUserCount, setThisMonthUserCount] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Detect the system theme and update state
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseAPI}/user/user-count`);
        const data = await response.json();

        if (data.success) {
          setUserCount(data.UserCount || 0);

          const token = localStorage.getItem("token");

          if (token) {
            const userResponse = await fetch(`${baseAPI}/user/all-users`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });

            const usersData = await userResponse.json();

            if (usersData.success) {
              const groupedUsers = usersData.users.reduce(
                (acc: Record<string, number>, user: any) => {
                  if (user.sana) {
                    const joinDate = moment(user.sana).format("YYYY-MM-DD");
                    acc[joinDate] = (acc[joinDate] || 0) + 1;
                  }
                  return acc;
                },
                {}
              );

              setUserCountByDate(groupedUsers);
              let lastMonthCount = 0;
              let thisMonthCount = 0;

              usersData.users.forEach((user: any) => {
                const joinMonth = moment(user.sana).month();
                const joinYear = moment(user.sana).year();

                if (joinYear === currentYear) {
                  if (joinMonth === currentMonth) {
                    thisMonthCount++;
                  } else if (joinMonth === currentMonth - 1 || (currentMonth === 0 && joinMonth === 11)) {
                    lastMonthCount++;
                  }
                }
              });

              setLastMonthUserCount(lastMonthCount);
              setThisMonthUserCount(thisMonthCount);
            }
          }
        }
      } catch (error) {
        console.error("API chaqirig'ida xato:", error);
      }
    };

    fetchUserData();
  }, []);

  const userCountPerDay = Array.from({ length: daysInMonth }, (_, index) => {
    const day = (index + 1).toString().padStart(2, "0"); // 01, 02, ..., 31 format
    const dateString = moment(`${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day}`, "YYYY-MM-DD").format("YYYY-MM-DD");
    const count = userCountByDate[dateString] || 0;

    return { day, userCount: count };
  });

  const data: ChartData<"line"> = {
    labels: userCountPerDay.map((data) => data.day),
    datasets: [
      {
        label: "Revenue",
        data: userCountPerDay.map((data) => data.userCount),
        borderColor: isDarkMode ? "#3ec175" : "#006400", 
        borderWidth: 2,
        pointBorderColor: isDarkMode ? "#3ec175" : "#006400",
        pointBorderWidth: 3,
        pointBackgroundColor: isDarkMode ? "#3ec175" : "#006400",
        pointHitRadius: 10,
        tension: 0,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
          gradient.addColorStop(0, isDarkMode ? "#c1fad4a4" : "#006400");
          gradient.addColorStop(1, "white");
          return gradient;
        },
        pointHoverRadius: 7,
        pointRadius: 0,
        hoverBorderColor: isDarkMode ? '#3ec175' : "#006400",
        hoverBackgroundColor: isDarkMode ? '#3ec175' : '#006400',
        pointHoverBackgroundColor: isDarkMode ? '#3ec175' : '#006400',
        hoverBorderWidth: 2,
      },
    ],
  };
  
  const options: ChartOptions<"line"> = {
    plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: "nearest",  // This is the default mode, no need to specify "nearest" again
          intersect: false,
          callbacks: {
            title: (context: any) => {
              const monthNames = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
              ];
              return `${monthNames[currentMonth]} ${context[0].label}`;
            },
            label: (context: any) => `Sales: ${context.raw}`,
          },
          boxWidth: 5,
          boxHeight: 5,
          backgroundColor: "rgba(0,0,0,0.7)",
          titleColor: "white",
          bodyColor: "white",
          bodyFont: { size: 12 },
          titleFont: { size: 14 },
          padding: 0,
        },
      },
      responsive: true,
      scales: {
        y: { type: "linear", display: false, ticks: { display: false } },
        x: { type: "category", display: false, ticks: { display: false } },
      },
      hover: { mode: "nearest", intersect: false },
      elements: { line: { borderWidth: 2 } },
      layout: {
        padding: {
          bottom: 0,
          top: 20 // Adding space below the chart for tooltip
    },
  },
  };

  const lastMonthPercentage = userCount ? ((lastMonthUserCount / userCount) * 100).toFixed(2) : "0.00";
  const thisMonthPercentage = userCount ? ((thisMonthUserCount / userCount) * 100).toFixed(2) : "0.00";

  return (
    <Container>
      <Content>
          <div className="users">
          Users 
          <Chip
              variant="soft"
              size="sm"
              startDecorator={<Avatar />}
              color="primary"
            >
              {userCount}
            </Chip>
          </div>
          <div className="flex justify-center gap-5 mt-5" style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={<AutorenewRoundedIcon />}
              color="neutral"
            >
               Last Month: {lastMonthUserCount} ({lastMonthPercentage}%)
            </Chip>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={<CheckRoundedIcon />}
              color="success"
            >
              This Month: {thisMonthUserCount} ({thisMonthPercentage}%)
            </Chip>
          </div>
        <LinePositio>
          <Line data={data} options={options} style={{height:'auto',minWidth:"200px",minHeight:"30px",maxHeight:"50px"}} />
        </LinePositio>
        <div>
        </div>
      </Content>
    </Container>
  );
}

export default LineChart;


