import React from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from './Drawer';
import styles from './index.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Drawer />
      <Outlet />
    </div>
  );
};

export default Layout;
