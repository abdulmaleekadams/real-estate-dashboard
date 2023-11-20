import clsx from 'clsx';
import styles from '@/styles/input.module.scss';

interface InputProps {
  labelName: string;
  placeholder?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: string;
}
const Input: React.FC<InputProps> = ({
  labelName,
  placeholder,
  onChangeHandler,
  value,
  name,
  type,
}) => {
  return (
    <label htmlFor={name} className={clsx(styles.label, 'flex flexColumn mb1')}>
      {labelName}
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        type={type}
        className={styles.input}
      />
    </label>
  );
};

export default Input;
