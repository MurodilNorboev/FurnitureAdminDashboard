import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Chip from "@mui/joy/Chip";
import { Content } from '../../all.Styles';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Sheet from '@mui/joy/Sheet'
import '../../styles.css'
import '../../../../index.css'

interface SeriesData {
  name: string;
  type: string;
  data: number[];
}

const Download: React.FC = () => {
  const [state, setState] = useState<{
    series: SeriesData[];
    options: ApexOptions;
  }>({
    series: [
      {
        name: 'Website Blog',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160], 
      },
      {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        foreColor:"black",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
        colors: ['#356c9f'],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        style: {
          colors: ["#356c9f"]
        }
      },
      labels: [
        'Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek',
      ],
      xaxis: {
        categories: [
          'Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek',
        ],
        labels: {
          show: true,
          rotate: 0,
          style: {
            fontSize: '12px',
            colors: "black"
          },
        },
      },
      yaxis: [
        {
          title: {
            text: '',
          },
        },
        {
          opposite: true,
          title: {
            text: '',
          },
        },
      ],
    },
  });

  return (
    <Sheet className="Sheet2"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
    }}>
      <Content>
          <div className="users" style={{display:"flex",flexDirection:"column",alignItems:"start"}}>
            <h4>
              Page views and downloads
            </h4>
            <div style={{display: "flex",gap: "20px",alignItems: "center"}}>
            <h1>13,740</h1>
          <Chip
              variant="soft"
              size="sm"
              color="danger"
              sx={{height:"22px",border:"1.5px solid #f56b6b",color:"#8e2525"}}
            >
              -25%
          </Chip>
            </div>
            <h5>Page views and downloads for the last 6 months</h5>
          </div>
        <div>
        </div>
      </Content>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={280} color={'yellow'} />
      </div>
    </Sheet>
  );
};

export default Download;

const domContainer = document.querySelector('#app');
if (domContainer) {
  ReactDOM.render(<Download />, domContainer); 
}








