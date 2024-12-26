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
import { Container, Content, LinePositio } from '../../all.Styles';
import Chip from "@mui/joy/Chip";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import Avatar from "@mui/joy/Avatar";
import { dataPoints } from '../../mockdata';

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
        label: (context: { raw: number }) => ` ${context.raw}`,
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
}, }
};
const CreateEvent = () => {
  return (
    <Container>
      <Content>
          <div className="users">
            <h2>
              Event Counts
            </h2>
          <Chip
              variant="soft"
              size="sm"
              startDecorator={<Avatar />}
              color="danger"
            >
              {/* {userCount} */}count
            </Chip>
          </div>
          <div className="flex justify-center gap-5 mt-5" style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={<AutorenewRoundedIcon />}
              color="neutral"
            >
               Last Month: %
            </Chip>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={<CheckRoundedIcon />}
              color="danger"
            >
              This Month: %
            </Chip>
          </div>
      <LinePositio>
      <Line data={chartData} options={chartOptions} style={{height:'auto',minWidth:"200px",minHeight:"30px",maxHeight:"50px"}} />
      </LinePositio>
        <div>
        </div>
      </Content>
    </Container>
  );
};

export default CreateEvent;
