import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Content } from '../../all.Styles';
import Chip from "@mui/joy/Chip";
import Sheet from '@mui/joy/Sheet'
import '../../styles.css'


const ApexChart: React.FC = () => {
  const [state, setState] = useState<any>({
    series: [
      {
        data: [
              [new Date('2024-01-01').getTime(), 30.95],
              [new Date('2024-01-15').getTime(), 31.34],
              [new Date('2024-02-01').getTime(), 31.18],
              [new Date('2024-02-15').getTime(), 31.85],
              [new Date('2024-03-01').getTime(), 31.86],
              [new Date('2024-03-15').getTime(), 32.28],
              [new Date('2024-04-01').getTime(), 32.10],
              [new Date('2024-04-15').getTime(), 33.27],
              [new Date('2024-05-01').getTime(), 33.73],
              [new Date('2024-05-15').getTime(), 33.22],
              [new Date('2024-06-01').getTime(), 31.99],
              [new Date('2024-06-15').getTime(), 32.41],
              [new Date('2024-07-01').getTime(), 34.17],
              [new Date('2024-07-15').getTime(), 33.82],
              [new Date('2024-08-01').getTime(), 34.51],
              [new Date('2024-08-15').getTime(), 33.16],
              [new Date('2024-09-01').getTime(), 34.46],
              [new Date('2024-09-15').getTime(), 34.48],
              [new Date('2024-10-01').getTime(), 34.31],
              [new Date('2024-10-15').getTime(), 34.70],
              [new Date('2024-11-01').getTime(), 34.31],
              [new Date('2024-11-15').getTime(), 33.46],
              [new Date('2024-12-01').getTime(), 35.13],
              [new Date('2024-12-15').getTime(), 34.90],
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true,
          type: 'xy',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3, 
      },
      title: {
        text: 'All Data',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        type: 'datetime',
      },
    },    
    zoomLevel: 1
  });

  return (
    <Sheet className="Sheet2"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
    }}>
      <Content>
          <div className="users" style={{display:"flex",flexDirection:"column",alignItems:"start"}}>
            <h4>
              Contversions
            </h4>
            <div style={{display: "flex",gap: "20px",alignItems: "center"}}>
            <h1>13,740</h1>
          <Chip
              variant="soft"
              size="sm"
              color="success"
              sx={{height:"22px",border:"1.5px solid #acf0ba",color:"#146725"}}
            >
              +25%
          </Chip>
            </div>
            <h5>Sessions per day for the last 30 days</h5>
          </div>
        <div>
        </div>
      </Content>
      <div style={{height:"200px"}}>
        <ReactApexChart options={state.options} series={state.series} height={280} />
      </div>
    </Sheet>
  );
};

export default ApexChart;

