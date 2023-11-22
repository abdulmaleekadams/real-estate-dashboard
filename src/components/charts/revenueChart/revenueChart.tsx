'use client';
import { SectionTitle } from '@/components';

import styles from './revenueChart.module.scss';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface revenueChartProps {
  series: Array<{ name: string; data: Array<number> }>;
}

const RevenueChart = ({ series }: revenueChartProps) => {
  const options: ApexOptions = {
    series: series,
    chart: {
      type: 'bar',
      height: 100,
      toolbar: {
        offsetY: -90,
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '95%',
        borderRadius: 4,

        // distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Dec',
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '16px',
        },
      },
    },

    fill: {
      opacity: 1,
      colors: ['#475BE8', '#CFC8FF'],
    },

    colors: ['#475BE8', '#CFC8FF'],

    tooltip: {
      marker: {
        fillColors: ['#475BE8', '#1f1f20'],
      },
    },
    theme: { mode: 'dark' },

    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        options: {
          plotOptions: {
            bar: {
              columnWidth: '100%', // Make bars take full width at smaller screens
            },
          },
        },
      },
    ],
  };
  return (
    <div
      className={clsx('sectionWrapper sectionPadding', styles.revenueWrapper)}
    >
      <div className={styles.sectionHeader}>
        <SectionTitle sectionTitle='Total Revenue' />
      </div>
      <div className={clsx('flex alignItemsCenter', styles.details)}>
        <p className='amount'>$236,535</p>

        <div className={clsx('flex alignItemsCenter', styles.percentage)}>
          <div className={styles.icon}></div>
          <div className={styles.percent}>
            <p>0.8%</p>
            <span>Than last Month</span>
          </div>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Chart options={options} series={series} type='bar' height={250} width='100%' />
      </div>
    </div>
  );
};

export default RevenueChart;
