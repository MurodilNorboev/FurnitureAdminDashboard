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

const CreateEvent = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [monthlyGrowth, setMonthlyGrowth] = useState<number>(0);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await axios.get<any>(`${baseAPI}/product/cart-count`);
        const data = response.data;
  
        setChartData(data.last30DaysData);  // Bu yerda ma'lumotlarni `last30DaysData` dan olish
  
        // Oylik o'sishni hisoblash
        if (data.last30DaysData.length > 0) {
          const firstDayCount = data.last30DaysData[0].count;
          const lastDayCount = data.last30DaysData[data.last30DaysData.length - 1].count;
  
          const growth = firstDayCount !== 0 ? ((lastDayCount - firstDayCount) / firstDayCount) * 100 : 0;
          setMonthlyGrowth(growth);
        }
      } catch (error) {
        console.log("API chaqirig'ida xato:", error);
      }
    };
  
    fetchData();
  }, []);

  const getLast30DaysData = () => {
    if (!Array.isArray(chartData)) {
      console.error("chartData is not an array:", chartData);
      return [];
    }

    return chartData.map((item: any) => ({
      date: item.date,
      count: item.count,
    }));
  };

  const last30DaysData = getLast30DaysData();
  const datas = last30DaysData
  .map((d) => +d.count.toString()[0])
  .filter((digit) => digit > 0);

  const data = {
    labels: last30DaysData.map((d) => d.date),
    datasets: [
      {
        label: 'Revenue',
        data: last30DaysData.map((data) => data.count),
        borderColor: 'rgb(158, 176, 205)',
        pointBorderColor: 'rgb(158, 176, 205)',
        pointBackgroundColor: 'rgb(158, 176, 205)',
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

  return (
    <Sheet className="Sheet" sx={{ border: '1.5px solid', borderColor: 'divider' }}>
      <Content>
        <div className="userWraps">
          <div className="users">
            <h2>Discounts</h2>
          </div>
          <div className="users">
            <h1>
              {datas}
            </h1>
            <Chip
              variant="soft"
              size="sm"
              color="neutral"
              sx={{ height: "22px", border: "1px solid #7f98b8" }}
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
export default CreateEvent;




// const CreateEvent = () => {
//   const [chartData, setChartData] = useState<any>([]);
//   const [monthlyGrowth, setMonthlyGrowth] = useState<number>(0);
//   const [previousMonthGrowth, setPreviousMonthGrowth] = useState<number>(0);
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(mediaQuery.matches);
//     mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));

//     const fetchData = async () => {
//       try {
//         const response = await axios.get<any>(`${baseAPI}/product/cart-count`);
//         const data = response.data;

//         setChartData(data.last30DaysData);

//         // Hozirgi va o‘tgan oylardagi jami countni hisoblash
//         const currentMonthCount = data.currentMonthData.reduce((sum: number, item: any) => sum + item.count, 0);
//         const previousMonthCount = data.previousMonthData.reduce((sum: number, item: any) => sum + item.count, 0);

//         // Oylik o‘sishni hisoblash
//         let growth = 0;
//         if (previousMonthCount === 0 && currentMonthCount !== 0) {
//           growth = 100; // Agar o‘tgan oyda count 0 bo‘lsa va hozirgi oyda 0 dan katta bo‘lsa, o‘sish 100%
//         } else if (previousMonthCount !== 0) {
//           growth = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
//         }

//         setMonthlyGrowth(growth);
//         setPreviousMonthGrowth(previousMonthCount);

//       } catch (error) {
//         console.log("API chaqirig'ida xato:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getLast30DaysData = () => {
//     if (!Array.isArray(chartData)) {
//       console.error("chartData is not an array:", chartData);
//       return [];
//     }

//     return chartData.map((item: any) => ({
//       date: item.date,
//       count: item.count,
//     }));
//   };

//   const last30DaysData = getLast30DaysData();

//   const datas = last30DaysData
//   .map((d) => +d.count.toString()[0])
//   .filter((digit) => digit > 0);
  

//   const data = {
//     labels: last30DaysData.map((d) => d.date),
//     datasets: [
//       {
//         label: 'Revenue',
//         data: last30DaysData.map((data) => data.count),
//         borderColor: 'rgb(158, 176, 205)',
//         pointBorderColor: 'rgb(158, 176, 205)',
//         pointBackgroundColor: 'rgb(158, 176, 205)',
//         pointRadius: 0,
//         fill: true,
//         backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
//           const ctx = context.chart.ctx;
//           const gradient = ctx.createLinearGradient(0, 0, 0, 60);
//           gradient.addColorStop(0, 'rgb(190, 211, 243)');
//           gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
//           return gradient;
//         },
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
//         top: 20,
//       },
//     },
//   };

//   const growthSign = monthlyGrowth > previousMonthGrowth ? '+' : '-';
//   const growthValue = Math.abs(monthlyGrowth).toFixed(2);

//   return (
//     <Sheet className="Sheet" sx={{ border: '1.5px solid', borderColor: 'divider' }}>
//       <Content>
//         <div className="userWraps">
//           <div className="users">
//             <h2>Discounts</h2>
//           </div>
//           <div className="users">
//             <h1>
//               {datas}
//             </h1>
//             <Chip
//               variant="soft"
//               size="sm"
//               title={growthSign === '+' ? 'success' : 'error'}
//               sx={{ height: '22px', border: '1px solid #7f98b8' }}
//             >
//               {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}
//             </Chip>
//           </div>
//           <h5>Last 30 days</h5>
//         </div>
//         <LinePositio>
//           <Line data={data} options={options} style={{ height: 'auto', minWidth: "200px", minHeight: "30px", maxHeight: "50px", paddingBottom: "10px" }} />
//         </LinePositio>
//       </Content>
//     </Sheet>
//   );
// };

// export default CreateEvent;




