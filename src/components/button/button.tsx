import styles from '@/styles/input.module.scss';

import Link from 'next/link';

interface ButtonProps {
  buttonTitle: any;
  onClickHandler?: (
    event:
      | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonElement?: string | 'button';
  href?: string | any;
  target?: '_blank' | '_parent' | '_top' | '_self';
  buttonStyle?: 'fill' | 'outline';
  disabled?: boolean;
}
const Button = ({
  buttonTitle,
  buttonElement,
  href,
  target,
  buttonType,
  onClickHandler,
  buttonStyle,
  disabled,
}:ButtonProps) => {
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
        disabled={disabled}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
