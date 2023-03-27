import { useState } from 'react';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Tabs = ({ tabs = [] }) => {
  const { tab, id } = useParams();
  const [activedTab, setActivedTab] = useState('');
  const navigate = useNavigate();

  // if (!tabs.length) return <div>No contents</div>;

  const setTabHandler = (tab, pId = id) => {
    setActivedTab(tab);
    navigate(`/sales/${tab}/${pId ? pId : ''}`);
  };

  useEffect(() => {
    if (!activedTab) {
      setTabHandler(tab || tabs[0]?.key || '');
    }
  }, []);

  return (
    <div>
      <div className={styles.header}>
        {tabs.map((item) => (
          <div
            key={item.key}
            className={`${styles.header__item} ${
              activedTab === item.key ? styles['header__item--active'] : ''
            }`}
            onClick={() => setTabHandler(item.key, null)}>
            {item.title}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};
Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  loadBody: PropTypes.func,
  children: PropTypes.element
};

export default Tabs;
