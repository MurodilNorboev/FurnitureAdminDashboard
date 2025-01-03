import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Chip from "@mui/joy/Chip";
import {Content, LinePositio } from "../../all.Styles";
import { baseAPI } from "../../../../utils/constants";
import Sheet from '@mui/joy/Sheet';
import '../../styles.css'


// interface ChartContext {
//   chart: {
//     ctx: CanvasRenderingContext2D;
//   };
// }

// function LineChart() {
//   const [userCount, setUserCount] = useState<number>(0);
//   const [usersData, setUsersData] = useState<any[]>([]);
//   const [monthlyGrowth, setMonthlyGrowth] = useState<number>(0);
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(mediaQuery.matches);
//     mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`${baseAPI}/userFur/user-count`);
//         const data = await response.json();

//         if (data.success) {
//           setUserCount(data.UserCount || 0);
//           setUsersData(data.usersData || []);
//         }
//       } catch (error) {
//         console.error("API chaqirig'ida xato:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const calculateGrowth = (startDate: string) => {
//     const filteredUsers = usersData.filter(user => moment(user.sana).isSameOrAfter(startDate));
//     const totalUsers = filteredUsers.length;

//     const firstDayUsers = usersData.filter(user => moment(user.sana).isSame(startDate)).length;

//     const growthPercent = firstDayUsers ? ((totalUsers - firstDayUsers) / firstDayUsers)  : totalUsers > 0 ? (totalUsers / 1)  : 0;
    
//     setMonthlyGrowth(growthPercent);
//   };

//   useEffect(() => {
//     const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
//     calculateGrowth(startOfMonth);
//   }, [usersData]);

//   const getLast30DaysData = () => {
//     return Array.from({ length: 30 }, (_, index) => {
//       const date = moment().subtract(index, 'days').format('YYYY-MM-DD');
//       return {
//         date,
//         count: usersData.filter(user => moment(user.sana).isSame(date, 'day')).length
//       };
//     }).reverse();
//   };

//   const last30DaysData = getLast30DaysData();
//   const data = {
//     labels: last30DaysData.map((data) => moment(data.date).format('MM-DD')),
//     datasets: [
//       {
//         label: "User Growth (Last 30 Days)",
//         data: last30DaysData.map((data) => data.count),
//         borderColor: isDarkMode ? "#3ec175" : "#006400",
//         borderWidth: 2,
//         pointBorderColor: isDarkMode ? "#3ec175" : "#006400",
//         pointBackgroundColor: isDarkMode ? "#3ec175" : "#006400",
//         pointHoverRadius: 7,
//         pointRadius: 0,
//         hoverBorderWidth: 2,
//         fill: true,
//         backgroundColor: (context: ChartContext) => {
//           const ctx = context.chart.ctx;
//           const gradient = ctx.createLinearGradient(0, 0, 0, 60);
//           gradient.addColorStop(0, isDarkMode ? "#c1fad4a4" : "#006400");
//           gradient.addColorStop(1, "white");
//           return gradient;
//         }
//       },
//     ],
//   };

//   const options: any = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         enabled: true,
//         mode: 'nearest',
//         intersect: false,
//         callbacks: {
//           title: (context: any) => `${moment(context[0].label).format('MMM D')}`,
//           label: (context: any) => ` ${context.raw}`,
//         },
//         backgroundColor: 'rgba(0,0,0,0.7)',
//         titleColor: 'white',
//         bodyColor: 'white',
//         bodyFont: { size: 12 },
//         titleFont: { size: 14 },
//       },
//     },
//     scales: {
//       y: { display: false },
//       x: { display: false },
//     },
//     hover: { mode: 'nearest' as const, intersect: false },
//     elements: { line: { borderWidth: 2 } },
//     layout: {
//       padding: {
//         bottom: 0,
//         top: 20 
//   },
//     }
//   };
  
//   return (
//     <Sheet className="Sheet"  sx={{
//       border: '1.5px solid',
//       borderColor: 'divider',
//     }}>

//       <Content>
//         <div className="userWraps">
//         <div className="users">
//           <h2>Users</h2>
//         </div>
//         <div className="users">
//           <h1>
//             {userCount}
//           </h1>
//           <Chip
//               variant="soft"
//               size="sm"
//               color="success"
//               sx={{height:"22px",border:"1.5px solid #acf0ba",color:"#146725"}}
//             >
//               {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}  
//           </Chip>
//         </div>
//         <h5>Last 30 days</h5>
//         </div>
//         <LinePositio>
//           <Line data={data} options={options} style={{height:'auto',minWidth:"200px",minHeight:"30px",maxHeight:"50px",paddingBottom:"10px"}} />
//         </LinePositio>

//       </Content>

//     </Sheet>
//   );
// }

// export default LineChart;

interface ChartContext {
  chart: {
    ctx: CanvasRenderingContext2D;
  };
}
function LineChart() {
  const [userCount, setUserCount] = useState<number>(0);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [monthlyGrowth, setMonthlyGrowth] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseAPI}/userFur/user-count`);
        const data = await response.json();

        if (data.success) {
          setUserCount(data.UserCount || 0);
          setUsersData(data.usersData || []);
        }
      } catch (error) {
        console.error("API chaqirig'ida xato:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const today = moment().startOf('day').format('YYYY-MM-DD');
    const dailyUsers = usersData.filter(user => moment(user.sana).isSame(today, 'day')).length;
    setMonthlyGrowth(dailyUsers); 
  }, [usersData]);

  const getLast30DaysData = () => {
    return Array.from({ length: 30 }, (_, index) => {
      const date = moment().subtract(index, 'days').format('YYYY-MM-DD');
      return {
        date,
        count: usersData.filter(user => moment(user.sana).isSame(date, 'day')).length
      };
    }).reverse();
  };

  const last30DaysData = getLast30DaysData();
  
  const data = {
    labels: last30DaysData.map((data) => moment(data.date).format('MM-DD')),
    datasets: [
      {
        label: "User Growth (Last 30 Days)",
        data: last30DaysData.map((data) => data.count),
        borderColor: isDarkMode ? "#3ec175" : "#006400",
        borderWidth: 2,
        pointBorderColor: isDarkMode ? "#3ec175" : "#006400",
        pointBackgroundColor: isDarkMode ? "#3ec175" : "#006400",
        pointHoverRadius: 7,
        pointRadius: 0,
        hoverBorderWidth: 2,
        fill: true,
        backgroundColor: (context: ChartContext) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 60);
          gradient.addColorStop(0, isDarkMode ? "#c1fad4a4" : "#006400");
          gradient.addColorStop(1, "white");
          return gradient;
        }
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
        top: 20 
  },
    }
  };
  
  return (
    <Sheet className="Sheet"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
    }}>

      <Content>
        <div className="userWraps">
        <div className="users">
          <h2>Users</h2>
        </div>
        <div className="users">
          <h1>
            {userCount}
          </h1>
          <Chip
              variant="soft"
              size="sm"
              color="success"
              sx={{height:"22px",border:"1.5px solid #acf0ba",color:"#146725"}}
            >
              {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}  
          </Chip>
        </div>
        <h5>Last 30 days</h5>
        </div>
        <LinePositio>
          <Line data={data} options={options} style={{height:'auto',minWidth:"200px",minHeight:"30px",maxHeight:"50px",paddingBottom:"10px"}} />
        </LinePositio>

      </Content>

    </Sheet>
  );
}
export default LineChart;