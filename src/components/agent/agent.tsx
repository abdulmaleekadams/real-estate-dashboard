import { RxDotsVertical } from 'react-icons/rx';

import styles from './agent.module.scss';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

interface InfoBarProps {
  icon: StaticImageData | string;
  name: string;
}
const Agent = ({ icon, name }: InfoBarProps) => {
  return (
    <div className='flex justifyContentBetween'>
      <div className={clsx('flex alignItemsCenter', styles.profile)}>
        <Image src={icon} width={45} height={45} alt='name' unoptimized={true} />
        <div className={styles.info}>
          <p className='name pText'>{name}</p>
          <p className={clsx('textGrey', styles.top)}>Top Agent</p>
        </div>
      </div>
      <div className={styles.menuBtn}>
        <RxDotsVertical />
      </div>
    </div>
  );
};

export default Agent;
