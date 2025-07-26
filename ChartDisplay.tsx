import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const ChartDisplay = ({ chartData }: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {chartData.charts.map((chart: any, index: any) => (
        <div key={index} style={{ flex: '0 1 48%', marginBottom: '20px' }}>

          {/* Chart generation*/}
          <Chart {...chart}/>
        </div>
      ))}
    </div>
  );
};

export default ChartDisplay;
