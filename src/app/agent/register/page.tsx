/* eslint-disable react/no-unescaped-entities */
'use client';
import clsx from 'clsx';
import axios, { AxiosError } from 'axios';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';

import styles from './agentForm.module.scss';
import inputStyles from '@/styles/input.module.scss';

import { Button, Input, SelectOption } from '@/components';

import { AgentsFormBg } from '@/assets';

import countryList from '@/helpers/countriesList.json';
import { AgentsFormDetails } from '@/helpers/formInput';

interface AgentFormDetailsProps {
  firstname: string;
  lastname: string;
  photo: null | Blob | string | ArrayBuffer;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  email: string;
  properties: string;
  [key: string]: string | null | Blob | string | ArrayBuffer;
}

const AgentForm = () => {
  const [formDetails, setFormDetails] = useState<AgentFormDetailsProps>({
    firstname: '',
    lastname: '',
    phone: '',
    dob: '',
    gender: '',
    email: '',
    country: '',
    properties: '',
    photo: '',
  });

  const validateForm = () => {
    const hasError = AgentsFormDetails.some(({ name, pattern }) => {
      const value = formDetails[name];

      if (pattern && typeof value === 'string') {
        // Handle pattern validation for fields with a pattern
        return !pattern.test(value.trim());
      } else if (typeof value === 'string') {
        // Handle general string validation (empty or whitespace)
        return value.trim() === '';
      } else {
        // Handle validation for other types (e.g., number)
        return value === null || value === undefined;
      }
    });
    console.log(hasError);

    setDisabled(hasError);
  };

  const [disabled, setDisabled] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    validateForm();
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFormDetails({ ...formDetails, photo: reader.result });
      };

      reader.readAsDataURL(file);
    },
    [formDetails, setFormDetails]
  );

  const selectCountry = (value: string) => {
    setFormDetails({ ...formDetails, country: value });
  };

  const selectGender = (value: string) => {
    setFormDetails({ ...formDetails, gender: value });
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxFiles: 1,
      maxSize: 1024 * 1000,
      onDrop,
    });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/agents', formDetails);
      console.log(response.data);
      setFormDetails({
        firstname: '',
        lastname: '',
        phone: '',
        dob: '',
        gender: '',
        email: '',
        country: '',
        properties: '',
        photo: '',
      });
    } catch (error: any | AxiosError) {
      console.error('Error:', error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <h1 className='pageHeaderPadding'>Add New Agent</h1>

      <div className={clsx(styles.formWrapper)}>
        <div className={clsx(styles.cover)}>
          <Image src={AgentsFormBg} alt='Signup Bg' fill unoptimized={true} />
          <div className={styles.avatar}>
            {formDetails?.photo && (
              <Image
                src={formDetails?.photo as string}
                alt='Agent Avatar'
                fill
                unoptimized={true}
              />
            )}
          </div>
        </div>
        <div
          className={clsx(
            'sectionWrapper sectionPadding flex flexColumn',
            styles.formContainer
          )}
        >
          <h2 className='sectionTitle'>My Details</h2>
          <form
            className='flex fw'
            onChange={validateForm}
            onKeyDown={validateForm}
            onKeyUp={validateForm}
            onSubmit={handleSubmit}
          >
            {AgentsFormDetails.map(
              ({
                name,
                placeholder,
                labelName,
                type,
                pattern,
                errorMessage,
              }) => (
                <Input
                  labelName={labelName}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formDetails[name]}
                  onChangeHandler={handleInputChange}
                  key={name}
                  pattern={pattern && pattern}
                  errorMessage={errorMessage}
                  className={styles[name]}
                />
              )
            )}

            <SelectOption
              defaultText='Select a country'
              handleSelect={selectCountry}
              optionList={countryList}
              headingLabel='Country'
            />

            <SelectOption
              defaultText='Select a gender'
              handleSelect={selectGender}
              optionList={[
                { name: 'Male', code: 'M' },
                { name: 'Female', code: 'F' },
              ]}
              headingLabel='Gender'
              clasName={styles.gender}
            />

            <div
              {...getRootProps()}
              className={clsx(inputStyles.input, styles.dropzone)}
            >
              <input
                {...getInputProps({
                  name: 'photo',
                  onChange: validateForm,
                })}
              />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                !formDetails.photo && (
                  <>
                    <FiUploadCloud />
                    <p>Click to upload or drag and drop</p>
                    <p>SVG, PNG, JPG or GIF (max 1MB)</p>
                  </>
                )
              )}
              {formDetails.photo && (
                <Image
                  width={170}
                  height={170}
                  objectFit='cover'
                  src={formDetails.photo as string}
                  alt='upload preview'
                />
              )}
            </div>
            <div className={clsx('flex', styles.button)}>
              <Button
                buttonTitle={'Cancel'}
                buttonElement='a'
                buttonStyle='outline'
                href={'/agent'}
              />
              <Button
                buttonTitle={loading ? 'Loading' : 'Save'}
                buttonElement='button'
                buttonStyle='fill'
                disabled={loading ? loading : disabled}
                buttonType='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AgentForm;
