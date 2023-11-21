'use client';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import styles from './pieChart.module.scss';
import clsx from 'clsx';

interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}

const Piechart = ({ colors, series, title, value }: PieChartProps) => {
  var options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: colors,
    legend: {
      show: false,
    },
    dataLabels: { enabled: false },
    series: series,
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        },
        
      },
    },

    stroke: {
      show: false,
    },
  };
  return (
    <div
      className={clsx(
        styles.pieCard,
        'card flex justifyContentBetween alignItemsCenter'
      )}
    >
      <div
        className={clsx(
          'flex flexColumn rowGap1',
          styles.details
        )}
      >
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value.toLocaleString()}</p>
      </div>
      <Chart width='120px' options={options} series={series} type='donut' />
    </div>
  );
};
export default Piechart;
