import Link from 'next/link';
import styles from './iconText.module.scss';
import clsx from 'clsx';
interface IconTextProps {
  icon?: any;
  href?: string;
  text: string;
  customClass?: string;
  elementTag?: string;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

const IconText = ({
  icon,
  href = '#',
  text,
  customClass,
  elementTag = 'a',
  handleClick,
}: IconTextProps) => {
  return elementTag === 'a' ? (
    <Link
      href={href}
      className={clsx('flex alignItemsCenter fw', styles.iconText, customClass)}
    >
      {icon} {text}
    </Link>
  ) : (
    <button
      onClick={handleClick}
      type='button'
      className={clsx('flex alignItemsCenter fw', styles.iconText, customClass)}
    >
      {icon} {text}
    </button>
  );
};

export default IconText;
