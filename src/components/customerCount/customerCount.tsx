'use client';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import styles from './customerCount.module.scss';

interface CustomerCountProps {
  series: Array<{ x: string; y: number }>;
  year: string;
  title: string;
  total: number;
  percentage: number;
}

const CustomerCount = ({
  series,
  year,
  title,
  total,
  percentage,
}: CustomerCountProps) => {
  const [options, setOptions] = useState<ApexOptions>({
    series: [
      {
        name: 'Total Customer',
        data: [100, 150, 200, 250, 100, 300, 230, 120, 200, 36, 450, 500],
      },
    ],

    chart: {
      height: '300',
      type: 'area',
      zoom: {
        enabled: false,
      },

      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    plotOptions: {
      area: {
        fillTo: 'end',
      },
    },
    fill: {
      colors: ['#000000'],
      type: 'gradient',
    },
    dataLabels: {
      enabled: false,
    },

    theme: {
      mode: 'dark',
    },
    stroke: {
      curve: 'smooth',
      colors: ['#475be8'],
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },

    colors: ['#475be8'],
    xaxis: {
      categories: [
        `${year}-01`,
        `${year}-02`,
        `${year}-03`,
        `${year}-04`,
        `${year}-05`,
        `${year}-06`,
        `${year}-07`,
        `${year}-08`,
        `${year}-09`,
        `${year}-10`,
        `${year}-11`,
        `${year}-12`,
      ],
      labels: {
        show: false,
      },

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  });

  return (
    <div>
      <p className={clsx('textGrey', styles.totalText)}>{title}</p>
      <div
        className={clsx(
          'flex alignItemsCenter justifyContentBetween',
          styles.customerCount
        )}
      >
        <div className={clsx('flex flexColumn rowGap2', styles.details)}>
          <p className='amount'>{total >= 1000 ? total / 1000 + 'k' : total}</p>
          <p className={styles.percentage}>{percentage}%</p>
        </div>
        <div className={styles.areaChart}>
          <Chart
            options={options}
            series={options.series}
            height={120}
            type='area'
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerCount;
