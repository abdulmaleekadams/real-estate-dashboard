import clsx from 'clsx';
import styles from './referrals.module.scss';
interface ReferralsProps {
  title: string;
  percentage: number;
  backgroundColor: string;
}
const Referrals = ({ title, percentage, backgroundColor }: ReferralsProps) => {
  return (
    <div className={(styles.barWrapper)}>
      <div className='flex justifyContentBetween'>
        <p className='pText'>{title}</p>
        <p className='pText'>{percentage}%</p>
      </div>
      <div className={clsx('flex alignItemCenter', styles.barContainer)}>
        <div
          className={styles.bar}
          style={{ backgroundColor: backgroundColor, width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Referrals;
