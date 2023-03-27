import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import savvyIcon from '@/assets/images/savvycom.jpeg';
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    key: '',
    title: 'Dashboard',
    link: '/'
  },
  {
    key: 'ACCOUNTS',
    title: 'Accounts',
    link: 'accounts'
  },
  {
    key: 'SALES',
    title: 'Sales',
    link: 'sales'
  }
];

const MenuItems = () => {
  const location = useLocation();
  const [activatedMenu, setActivatedMenu] = useState(items[0].key);

  useEffect(() => {
    setActivatedMenu((location.pathname.split('/')[1] ?? '').toUpperCase());
  }, [location.pathname]);

  return items.map((item) => (
    <Link
      key={item.key}
      className={`${styles.itemType} ${activatedMenu === item.key && styles.itemType__active}`}
      to={item.link}>
      <span className={styles.itemType__title}>{item.title}</span>
    </Link>
  ));
};

const Drawer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.itemHeader}>
        <img alt="Savvycom Icon" src={savvyIcon} className={styles.savvyIcon} />
        <span className={styles.itemHeader__title}>Savvycom</span>
      </div>
      <div className={styles.divider}></div>
      <MenuItems />
    </div>
  );
};

export default Drawer;
