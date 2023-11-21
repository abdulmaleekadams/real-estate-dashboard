import Image from 'next/image';
import styles from './page.module.scss';
import { Piechart } from '@/components';
import clsx from 'clsx';

export default function Home() {
  return (
    <main className={(styles.main, 'container')}>
      <h1>Dashboard</h1>

      <div className={clsx('flex flexColumn rowGap1', styles.pieCharts)}>
        <Piechart
          colors={['#475be8', '#6f727439']}
          series={[75, 25]}
          title='Properties for Sale'
          value={684}
        />
        <Piechart
          colors={['#FBBC05', '#6f727439']}
          series={[65, 35]}
          title='Properties for Rent'
          value={546}
        />
        <Piechart
          colors={['#34a853', '#6f727439']}
          series={[80, 20]}
          title='Total Customer'
          value={5732}
        />
        <Piechart
          colors={['#ec4e2c', '#6f727439']}
          series={[90, 10]}
          title='Total City'
          value={90}
        />
      </div>
    </main>
  );
}
