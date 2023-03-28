import styles from './index.module.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSales } from '../../../apis/sales';
import { SkeTabHeader } from '../../../components/Skeleton';

const Tabs = () => {
  const { tab, id } = useParams();
  const [activedTab, setActivedTab] = useState('');
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    async function doFetch() {
      try {
        const res = await getSales({
          signal: controller.signal
        });
        setTabs(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    doFetch();

    return () => {
      controller.abort();
    };
  }, []);

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
        {!isLoading ? (
          tabs.map((item) => (
            <div
              key={item.key}
              className={`${styles.header__item} ${
                activedTab === item.key ? styles['header__item--active'] : ''
              }`}
              onClick={() => setTabHandler(item.key, null)}>
              {item.title}
            </div>
          ))
        ) : (
          <SkeTabHeader />
        )}
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Tabs;
