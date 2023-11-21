/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from '@/styles/login.module.scss';

import { GoogleLogo, LoginBanner } from '@/assets';
import { Button, Input } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, seterrorMessage] = useState('');

  const formInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      seterrorMessage('');
      const response: AxiosResponse = await axios.post(
        '/api/account/signup',
        formDetails
      );
      console.log(response.data);
      router.push('/');
    } catch (error: any) {
      seterrorMessage(error.response ? error.response.data.data : '');
    }
  };
  return (
    <div className={clsx('container flex justifyContentCenter ', styles.login)}>
      <div className={clsx('flex flexColumn rowGap3 ', styles.formContainer)}>
        <div className={styles.formHeader}>
          <h1 className='textCenter heading'>Join us</h1>
          <p className='textCenter lh1 mt1 fw400 textGrey'>
            Create an account! Please enter your details
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className='flex flexColumn rowGap2'>
          <div>
            <Input
              labelName='Email'
              name='email'
              placeholder='Enter your email'
              type='text'
              value={formDetails.email}
              onChangeHandler={formInputChange}
            />
            <Input
              labelName='Password'
              name='password'
              placeholder='**********'
              type='password'
              value={formDetails.password}
              onChangeHandler={formInputChange}
            />

            <Input
              labelName='Confirm Password'
              name='confirmPassword'
              placeholder='**********'
              type='password'
              value={formDetails.confirmPassword}
              onChangeHandler={formInputChange}
            />
            <p className='error'>{errorMessage}</p>
          </div>
          <Button buttonTitle={'Sign up'} buttonStyle='fill' />
          <Button
            buttonTitle={
              <>
                <Image
                  src={GoogleLogo}
                  width={24}
                  height={24}
                  alt='Google logo'
                />
                Sign up with Google
              </>
            }
            buttonStyle='outline'
          />
          <p className='textCenter'>
            Have an account?
            <Link href='login' className='textBlue ml1'>
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className={styles.image}>
        <Image src={LoginBanner} fill={true} alt='Kultura Building' />
      </div>
    </div>
  );
};

export default Signup;
