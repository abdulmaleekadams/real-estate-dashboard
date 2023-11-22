import { PropertyCardProps } from '@/interfaces/property';
import Image from 'next/image';

import styles from './latestSalesProp.module.scss';
import clsx from 'clsx';

const LatestSalesProp = ({
  photo,
  location,
  price,
  title,
  id,
}: PropertyCardProps) => {
  return (
    <div className={clsx('flex alignItemsCenter', styles.latestProps)} id={id}>
      <Image src={photo} width={60} height={55} alt={title} />

      <div className={clsx('flex justifyContentBetween fw', styles.details)}>
        <div className={clsx('fw', styles.about)}>
          <p className={clsx('pText', styles.title)}>{title}</p>
          <p className={clsx('textGrey', styles.location)}>{location}</p>
        </div>
        <p className={clsx('textBlue', styles.price)}>+${price}</p>
      </div>
    </div>
  );
};

export default LatestSalesProp;
