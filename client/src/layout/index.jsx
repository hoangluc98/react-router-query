import React from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from './Drawer';
import styles from './index.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Drawer />
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
