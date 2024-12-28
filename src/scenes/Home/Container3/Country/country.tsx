import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sheet from '@mui/joy/Sheet'
import '../../styles.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: number[];
  labels: string[];
  flags: string[]; // New prop for country flags
}

const Country: React.FC<DoughnutChartProps> = ({ data, labels, flags }) => {

  const getShadesOfBlueWithGray = (index: number, total: number) => {
    const baseColor = { r: 59, g: 61, b: 98 };  // RGB for #3b3d62
    const ratio = index / total;
    const lighterColor = {
      r: Math.round(baseColor.r + (255 - baseColor.r) * ratio),
      g: Math.round(baseColor.g + (255 - baseColor.g) * ratio),
      b: Math.round(baseColor.b + (255 - baseColor.b) * ratio),
    };
    return `rgb(${lighterColor.r}, ${lighterColor.g}, ${lighterColor.b})`;
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: data.map((_, index) => getShadesOfBlueWithGray(index, data.length)),
        hoverBackgroundColor: data.map((_, index) => getShadesOfBlueWithGray(index, data.length)),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <Sheet className="Sheet4"  sx={{
      border: '1.5px solid',
      borderColor: 'divider',
    }}>
      <h2>Users By Country</h2>
      <div className='countryCon'>

        <div className='tops'>
          <Doughnut data={chartData} options={options}  className='charts'/>
        </div>

        <div className='bottoms'>
          {data.map((count, index) => {
            const color = getShadesOfBlueWithGray(index, data.length);
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img src={flags[index]} alt={`${labels[index]} flag`} width={30} height={20} style={{ marginRight: '10px' }} />
                <div style={{ flex: 1, height: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px', marginRight: '10px' }}>
                  <div
                    style={{
                      width: `${(count / Math.max(...data)) * 100}%`,
                      height: '100%',
                      backgroundColor: color,
                      borderRadius: '5px',
                    }}
                  />
                </div>
                <span>{labels[index]}: {count}</span>
              </div>
            );
          })}
        </div>

      </div>
    </Sheet>
  );
};

export default Country;
