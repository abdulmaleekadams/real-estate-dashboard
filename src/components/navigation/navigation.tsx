'use client';
import clsx from 'clsx';
import styles from './navigation.module.scss';
import {
  IoLogOut,
  IoMenu,
  IoNotificationsOutline,
  IoSearch,
} from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { IconText } from '..';
import { RiBuilding2Line, RiSettings3Fill } from 'react-icons/ri';
import { BiSolidToggleRight } from 'react-icons/bi';
import { useState } from 'react';
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineGroup,
  MdOutlineMessage,
} from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const Navigation = () => {
  const [openProfileOption, setOpenProfileOption] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenProfileOption(false);
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };
  const handleProfileOption = () => {
    setOpenMenu(false);
    openProfileOption
      ? setOpenProfileOption(false)
      : setOpenProfileOption(true);
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await axios.post('/api/account/logout');
    console.log(response.data);

    router.push('/account/login');
    router.refresh();
  };

  return (
    <nav
      className={clsx(
        'flex alignItemsCenter justifyContentBetween fw',
        styles.navbarContainer
      )}
    >
      <div
        className={clsx(
          'container flex alignItemsCenter justifyContentBetween fw',
          styles.navbar
        )}
      >
        <div className={clsx('flex', styles.col1)}>
          <button
            onClick={handleMenu}
            type='button'
            className={styles.menu}
            aria-label='Menu'
          >
            <IoMenu />
          </button>
          <form className={styles.searchForm}>
            <button type='button' aria-label='Search'>
              <IoSearch />
            </button>
            <input type='text' placeholder='Search Property, customer etc' />
          </form>
        </div>

        <div className={clsx('flex', styles.col2)}>
          <button
            type='button'
            className={styles.notification}
            aria-label='Notification'
          >
            <IoNotificationsOutline />
          </button>
          <div
            className={styles.profileImage}
            onClick={handleProfileOption}
          ></div>
        </div>
        <div
          className={clsx(
            'flex flexColumn',
            styles.profileOptions,
            openProfileOption && styles.open
          )}
        >
          <IconText
            href='/profile/edit'
            text='Edit Profile'
            icon={<FaUserCircle />}
          />
          <IconText
            href='/profile/setting'
            text='Setting'
            icon={<RiSettings3Fill />}
            customClass={styles.setting}
          />
          <IconText
            elementTag='button'
            text='Logout'
            icon={<IoLogOut />}
            customClass={styles.setting}
            handleClick={handleLogout}
          />
          <IconText
            elementTag='button'
            text='Dark Mode'
            icon={<BiSolidToggleRight />}
            customClass={styles.setting}
          />
        </div>

        <div
          className={clsx(
            'flex flexColumn rowGap1',
            styles.menuContainer,
            openMenu && styles.open
          )}
        >
          <IconText
            text='Dashboard'
            icon={<MdOutlineDashboard />}
            href='/dashboard'
            customClass={pathname.startsWith('/dashboard') ? styles.active : ''}
          />
          <IconText
            text='Property'
            icon={<RiBuilding2Line />}
            href='/property'
            customClass={pathname.startsWith('/property') ? styles.active : ''}
          />
          <IconText
            text='Agent'
            icon={<MdOutlineGroup />}
            href='/agent'
            customClass={pathname.startsWith('/agent') ? styles.active : ''}
          />

          <IconText
            text='Message'
            icon={<MdOutlineMessage />}
            href='/message'
            customClass={pathname === '/message' ? styles.active : ''}
          />
          <IconText
            text='Profile'
            icon={<MdOutlineAccountCircle />}
            href='/profile'
            customClass={pathname.startsWith('/profile') ? styles.active : ''}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
