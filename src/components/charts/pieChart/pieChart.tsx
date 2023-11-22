'use client'
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic'; // Use dynamic import to conditionally load ApexCharts on the client-side

import styles from './pieChart.module.scss';
import clsx from 'clsx';

interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}

// Conditionally import ApexCharts only on the client-side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ colors, series, title, value }: PieChartProps) => {
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
      <div className={clsx('flex flexColumn rowGap1', styles.details)}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value.toLocaleString()}</p>
      </div>
      <Chart width='100px' height='100px' options={options} series={series} type='donut' />
    </div>
  );
};

export default PieChart;
