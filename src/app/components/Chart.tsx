import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { FC, ReactNode } from 'react';

Chart.register(...registerables);

interface ChartDataInterface {
  data:
    | {
        monday: null | number;
        tuesday: null | number;
        wednesday: null | number;
        thursday: null | number;
        friday: null | number;
        saturday: null | number;
        sunday: null | number;
      }
    | {};
  children?: ReactNode;
}

const ChartFC: FC<ChartDataInterface> = ({ data }) => (
  <Bar
    data={{
      labels: Object.keys(data).map(
        (each) => each.slice(0, 1).toUpperCase() + each.slice(1)
      ),
      datasets: [
        {
          label: 'Avg. Store Traffic',
          data: Object.values(data).map((e) => (e ? e : 0)),
          borderWidth: 1,
        },
      ],
    }}
    options={{
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }}
  />
);

export default ChartFC;
