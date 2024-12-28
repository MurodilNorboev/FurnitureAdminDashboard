import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Content, LinePositio } from '../../all.Styles';
import Chip from "@mui/joy/Chip";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import Avatar from "@mui/joy/Avatar";
import { dataPoints } from '../../mockdata';
import Sheet from '@mui/joy/Sheet';
import '../../styles.css'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const chartData = {
  labels: dataPoints.map((d) => d.date),
  datasets: [
    {
      label: 'Revenue',
      data: dataPoints.map((d) => d.value),
      borderColor: 'rgb(158, 176, 205)',
      borderWidth: 2,
      pointBorderColor: 'rgb(158, 176, 205)',
      pointBackgroundColor: 'rgb(158, 176, 205)',
      pointBorderWidth: 3,
      pointHoverRadius: 7,
      pointRadius: 0,
      fill: true,
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, 'rgb(190, 211, 243)'); 
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gradient;
      },
    },
  ],
};

const chartOptions: any = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      callbacks: {
        title: (context: { label: string }[]) => context[0].label,
        label: (context: { raw: number }) => `${context.raw}`,
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
const Conversion = () => {
  return (
    <Sheet className="Sheet"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
      gap:"0px"
    }}>
      <Content>
        <div className="userWraps">
        <div className="users">
          <h2>Conversions</h2>
        </div>
        <div className="users">
          <h1 style={{marginBottom:"-10px"}}>
            {/* {userCount} */}
            34
          </h1>
          <Chip
              variant="soft"
              size="sm"
              color="neutral"
              sx={{height:"22px",border:'1px solid #7f98b8',marginBottom:"-35px"}}
            >
              {/* {`+ ${monthlyGrowth % 1 === 0 ? monthlyGrowth : Math.round(monthlyGrowth)}%`}   */}
              +33%
          </Chip>
        </div>
        <h5>Last 30 days</h5>
        </div>
        <LinePositio>
          <Line data={chartData} options={chartOptions} 
          style={{height:'auto',minWidth:"200px",minHeight:"30px",maxHeight:"50px",paddingBottom:"10px"}} />
        </LinePositio>

      </Content>
    </Sheet>
  );
};

export default Conversion;
