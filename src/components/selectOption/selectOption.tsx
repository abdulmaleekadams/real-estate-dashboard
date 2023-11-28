'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import inputStyles from '@/styles/input.module.scss';
import styles from './selectOption.module.scss';

interface SelectOptionProps {
  optionList: Array<{ name: string; code?: string }>;
  handleSelect: (selectedOption: string) => void;
  defaultText: string;

  headingLabel: string;
  clasName?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  optionList,
  handleSelect,
  defaultText,

  headingLabel,
  clasName,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText);

  const openCountryMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleSelected = (name: string) => {
    setSelectedOption(name);
    handleSelect(name);
    setOpenMenu(false);
  };

  return (
    <div className={clsx(inputStyles.label, 'flex flexColumn mb1', clasName)}>
      {headingLabel}
      <div className={styles.selectContainer}>
        <p
          className={clsx(inputStyles.input, styles.selected)}
          onClick={openCountryMenu}
        >
          {selectedOption === '' ? defaultText : selectedOption}
        </p>

        {openMenu && (
          <ul className={styles.selectOptions}>
            {optionList.map(({ name, code }) => (
              <li
                key={code}
                className={styles.option}
                onClick={() => {
                  handleSelected(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectOption;
