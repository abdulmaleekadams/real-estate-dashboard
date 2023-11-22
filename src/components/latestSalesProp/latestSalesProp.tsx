import { PropertyCardProps } from '@/interfaces/property';
import Image from 'next/image';

const LatestSalesProp = ({
  photo,
  location,
  price,
  title,
  id,
}: PropertyCardProps) => {
  return (
    <div className='flex alignItemsCenter' id={id}>
      <Image src={photo} width={60} height={55} alt={title} />

      <div className='flex justifyContentBetween fw'>
        <div className='fw'>
          <p className='pText'>{title}</p>
          <p className='textGrey'>{location}</p>
        </div>
        <p className='textBlue'>+${price}</p>
      </div>
    </div>
  );
};

export default LatestSalesProp;
