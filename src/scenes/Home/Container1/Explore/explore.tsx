import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  PointElement, // PointElement ni import qilish
  LineElement, // LineElement ni import qilish
  ArcElement,
} from "chart.js";
import { Content, LinePositio } from "../../all.Styles";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import "../../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../../../utils/constants";
import moment from "moment";

// Kerakli Chart.js komponentlarini ro'yxatdan o'tkazish
ChartJS.register(
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

interface ChartContext {
  chart: {
    ctx: CanvasRenderingContext2D;
  };
}

function LineChart() {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [onlineUsersPerDay, setOnlineUsersPerDay] = useState<
    { date: string; count: number }[]
  >([]); // Tipni to'g'ri belgilash
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [dayUser, setDayUser] = useState<any[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e) => setIsDarkMode(e.matches));

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseAPI}/userFur/real-time`);
        const data = await response.json();
        setDayUser(data.newUsersToday);
        if (data) {
          setOnlineUsers(data.onlineUsers || 0);
        }
      } catch (error) {
        console.error("API chaqirig'ida xato:", error);
      }
    };

    fetchUserData();
  }, []); // faqat komponent mount bo'lganda ma'lumotlarni olish

  // Har kuni online foydalanuvchilar sonini saqlash
  useEffect(() => {
    if (onlineUsers !== 0) {
      // online foydalanuvchilar soni 0 bo'lmaganda
      const today = moment().startOf("day").format("YYYY-MM-DD");
      setOnlineUsersPerDay((prevState) => [
        ...prevState,
        { date: today, count: onlineUsers }, // Yangi online userlarni kunlik saqlash
      ]);
    }
  }, [onlineUsers]);

  const getLast30DaysData = () => {
    return Array.from({ length: 30 }, (_, index) => {
      const date = moment().subtract(index, "days").format("YYYY-MM-DD");
      const dayData = onlineUsersPerDay.find((data) => data.date === date);

      return {
        date,
        count: dayData ? dayData.count : 0, // Har bir kunning online foydalanuvchilari
      };
    }).reverse();
  };

  const last30DaysData = getLast30DaysData();

  const data = {
    labels: last30DaysData.map((data) => moment(data.date).format("MM-DD")),
    datasets: [
      {
        label: "Online User Growth (Last 30 Days)",
        data: last30DaysData.map((data) => data.count),
        borderColor: isDarkMode ? "rgba(211, 47, 47, 0.5)" : "#d32f2f",
        borderWidth: 2,
        pointBorderColor: isDarkMode ? "rgba(211, 47, 47, 0.5)" : "#d32f2f",
        pointBackgroundColor: isDarkMode ? "rgba(211, 47, 47, 0.5)" : "#d32f2f",
        pointHoverRadius: 7,
        pointRadius: 0,
        hoverBorderWidth: 2,
        fill: true,
        backgroundColor: (context: ChartContext) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 60);
          gradient.addColorStop(
            0,
            isDarkMode ? "rgba(211, 47, 47, 0.5)" : "#d32f2f"
          );
          gradient.addColorStop(1, "white");
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
        mode: "nearest",
        intersect: false,
        callbacks: {
          title: (context: any) =>
            `${moment(context[0].label).format("MMM D")}`,
          label: (context: any) => `${context.raw} Online Users`,
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "white",
        bodyColor: "white",
        bodyFont: { size: 12 },
        titleFont: { size: 14 },
      },
    },
    scales: {
      y: { display: false },
      x: { display: false },
    },
    hover: { mode: "nearest" as const, intersect: false },
    elements: { line: { borderWidth: 2 } },
    layout: {
      padding: {
        bottom: 0,
        top: 20,
      },
    },
  };

  return (
    <Sheet
      className="Sheet"
      sx={{
        border: "1.5px solid",
        borderColor: "divider",
      }}
    >
      <Content>
        <div className="userWraps">
          <div className="users">
            <h2>Active Users</h2>
          </div>
          <div className="users">
            <h1>{onlineUsers}</h1>
            <Chip
              variant="soft"
              size="sm"
              color="danger"
              sx={{ height: "22px", border: "1px solid #d68888" }}
            >
              {`+ ${dayUser || 0}%`}
            </Chip>
          </div>
          <h5>Last 30 days</h5>
        </div>
        <LinePositio>
          <Line
            data={data}
            options={options}
            style={{
              height: "auto",
              minWidth: "200px",
              minHeight: "30px",
              maxHeight: "50px",
              paddingBottom: "10px",
            }}
          />
        </LinePositio>
      </Content>
    </Sheet>
  );
}

export default LineChart;
