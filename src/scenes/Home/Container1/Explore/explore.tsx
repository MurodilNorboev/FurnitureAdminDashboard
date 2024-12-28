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
import { dataPoints } from '../../mockdata';
import Sheet from '@mui/joy/Sheet';
import '../../styles.css'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/joy/Button';

const Explore = () => {
  return (
    <Sheet className="Sheet ContainerExplored"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
      display:"flex",flexDirection:"column",
      justifyContent:"space-between"
    }}>
          <h2>Click here to add a new event</h2>
          
        <Button endDecorator={<KeyboardArrowRight />} 
        color="neutral">
           Go to checkout
        </Button>

    </Sheet>
  )
}

export default Explore