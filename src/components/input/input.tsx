'use client';
import clsx from 'clsx';
import styles from '@/styles/input.module.scss';
import { useState } from 'react';

interface InputProps {
  labelName: string;
  placeholder?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | any;
  name?: string;
  type?: string;
  errorMessage?: string;
  pattern?: RegExp;
  className?: string;
}
const Input: React.FC<InputProps> = ({
  labelName,
  placeholder,
  onChangeHandler,
  value,
  name,
  type,
  errorMessage,
  pattern,
  className,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleErrorMessage = () => {
    const patternMatch = pattern?.test(value);
    patternMatch ? setErrorMsg('') : setErrorMsg(errorMessage!);
  };
  return (
    <label
      htmlFor={name}
      className={clsx(styles.label, 'flex flexColumn mb1', className)}
    >
      {labelName}
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        type={type}
        className={styles.input}
        onKeyDown={handleErrorMessage}
        onKeyUp={handleErrorMessage}
        
      />
      <p className='textBlue'>{errorMsg}</p>
    </label>
  );
};

export default Input;
