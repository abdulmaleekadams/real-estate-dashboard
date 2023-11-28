import styles from './dashboard.module.scss';
import {
  Button,
  CustomerCount,
  LatestProperty,
  Piechart,
  ReferralBar,
  SectionTitle,
  TopAgent,
} from '@/components';
import clsx from 'clsx';
import RevenueChart from '@/components/charts/revenueChart/revenueChart';
import { referralsSource } from '@/helpers/referralsData';
import { ProfleImg, Prop1, Prop2, Prop3, Prop4 } from '@/assets';
import { RxDotsVertical } from 'react-icons/rx';

export default function Home() {
  const seriesData = [
    { x: '2023-01', y: 100 },
    { x: '2023-02', y: 150 },
    { x: '2023-03', y: 200 },
    { x: '2023-04', y: 250 },
    { x: '2023-05', y: 100 },
    { x: '2023-06', y: 300 },
    { x: '2023-07', y: 230 },
    { x: '2023-08', y: 120 },
    { x: '2023-09', y: 200 },
    { x: '2023-10', y: 36 },
    { x: '2023-11', y: 450 },
    { x: '2023-12', y: 500 },
    // Add more data points for each month
  ];
  return (
    <main className={styles.main}>
      <h1 className='pageHeaderPadding'>Dashboard</h1>

      <div
        className={clsx(
          'flex flexColumn justifyContentBetween rowGap1 container',
          styles.pieCharts
        )}
      >
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

      <div className={clsx('flex flexColumn rowGap2', styles.revRef)}>
        <RevenueChart
          series={[
            { name: 'Last Month', data: [200, 100, 150, 350, 50, 100, 175] },
            {
              name: 'Running Month',
              data: [100, 150, 250, 160, 180, 330, 332],
            },
          ]}
        />

        <div
          className={clsx('sectionWrapper sectionPadding', styles.propRefCol)}
        >
          <SectionTitle sectionTitle='Property Referrals' />

          <div className={clsx('flex flexColumn rowGap2', styles.refBars)}>
            {referralsSource.map(({ title, percentage, backgroundColor }) => (
              <ReferralBar
                title={title}
                percentage={percentage}
                backgroundColor={backgroundColor}
                key={backgroundColor}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={clsx('flex flexColumn rowGap2', styles.agntCustSales)}>
        <div
          className={clsx(
            'sectionWrapper sectionPadding',
            styles.topAgentsWrapper
          )}
        >
          <div
            className={clsx(
              'flex justifyContentBetween',
              styles.topAgentsHeader
            )}
          >
            <SectionTitle sectionTitle='Top Agent' />
            <Button
              buttonElement='a'
              href={'/agent'}
              buttonTitle={'View All'}
              buttonStyle='outline'
            />
          </div>

          <div className={clsx('flex flexColumn rowGap2', styles.topAgents)}>
            <TopAgent name='Benny Chagur' icon={ProfleImg} />
            <TopAgent name='Chynita Heree' icon={ProfleImg} />
            <TopAgent name='Adams Abdulmaleek' icon={ProfleImg} />
            <TopAgent name='Kave Martha' icon={ProfleImg} />
            <TopAgent name='Benny Chagur' icon={ProfleImg} />
          </div>
        </div>

        <div className={clsx('sectionWrapper sectionPadding', styles.customer)}>
          <div className='flex justifyContentBetween'>
            <SectionTitle sectionTitle='Customer' />
            <div className='textGrey'>
              <RxDotsVertical />
            </div>
          </div>

          <div
            className={clsx(
              'flex flexColumn rowGap2',
              styles.customersAnalysis
            )}
          >
            <CustomerCount
              series={seriesData}
              year='2023'
              title='Total Customers'
              total={5007000}
              percentage={33.33}
            />
            <hr />
            <CustomerCount
              percentage={21.77}
              series={seriesData}
              year='2023'
              title='New Customers This Month'
              total={12000}
            />
          </div>
        </div>

        <div
          className={clsx(
            'sectionWrapper sectionPadding fw',
            styles.latestSales
          )}
        >
          <div className='flex justifyContentBetween'>
            <SectionTitle sectionTitle='Latest Sales' />
            <div className='textGrey'>
              <RxDotsVertical />
            </div>
          </div>

          <div className={clsx('flex flexColumn', styles.latestPropsWrapper)}>
            <LatestProperty
              photo={Prop1}
              location='North Carolina, USA'
              title='Metro Jayakar Apartment'
              price='35'
            />
            <LatestProperty
              photo={Prop2}
              location='North Carolina ,USA'
              title='Letdo Ji Hotel & APartment'
              price='45'
            />
            <LatestProperty
              photo={Prop3}
              location='North Carolina, USA'
              title='Star Sun Hotel & Apartment'
              price='35'
            />
            <LatestProperty
              photo={Prop4}
              location='North Carolina, USA'
              title='Metro Jayakar Apartment'
              price='35'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
