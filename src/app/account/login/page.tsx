/* eslint-disable react/no-unescaped-entities */
'use client';

import styles from '@/styles/login.module.scss';

import { GoogleLogo, LoginBanner } from '@/assets';
import { Button, Input } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });

  const formInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={clsx('container flex justifyContentCenter ', styles.login)}>
      <div className='maxWidth720 flex flexColumn rowGap3 '>
        <div className={styles.formHeader}>
          <h1 className='textCenter heading'>Welcome back</h1>
          <p className='textCenter lh1 mt1 fw400 textGrey'>
            Welcome back! Please enter your details
          </p>
        </div>
        <form className='flex flexColumn rowGap2'>
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
            <Link
              className='textBlue textRight block'
              href={'/forgot-password'}
            >
              Forgot Password
            </Link>
          </div>
          <Button buttonTitle={'Sign in'} buttonStyle='fill' />
          <Button
            buttonTitle={
              <>
                <Image
                  src={GoogleLogo}
                  width={24}
                  height={24}
                  alt='Google logo'
                />
                Sign in with Google
              </>
            }
            buttonStyle='outline'
          />
          <p className='textCenter'>
            Don't have an account?
            <Link href='signup' className='textBlue ml1'>
              Sign up
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

export default Login;
