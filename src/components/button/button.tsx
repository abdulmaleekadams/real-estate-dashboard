import styles from '@/styles/input.module.scss';

import Link from 'next/link';

interface ButtonProps {
  buttonTitle: any;
  onClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonElement?: string | 'button';
  href?: string | any;
  target?: '_blank' | '_parent' | '_top' | '_self';
  buttonStyle?: 'fill' | 'outline';
}
const Button: React.FC<ButtonProps> = ({
  buttonTitle,
  buttonElement,
  href,
  target,
  buttonType,
  onClickHandler,
  buttonStyle,
}) => {
  const classname = buttonStyle === 'fill' ? 'btnFill' : 'btnOutline';
  return buttonElement === 'a' ? (
    href?.includes('https') ? (
      <a
        href={href}
        className={`btn ${classname} py1 flex justifyContentCenter alignItemsCenter`}
        rel='noreferrer noopener'
        target={target}
      >
        {buttonTitle}
      </a>
    ) : (
      <Link
        href={href}
        className={`btn ${classname} py1 flex justifyContentCenter alignItemsCenter`}
        target={target}
      >
        {buttonTitle}
      </Link>
    )
  ) : (
    <button
      className={`btn ${classname} py1 flex justifyContentCenter alignItemsCenter`}
      type={buttonType}
      onClick={onClickHandler}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
