import styles from './Tabs/index.module.css';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate, useParams, defer } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSales } from '../../apis/sales';
import { SkeTabHeader } from '../../components/Skeleton';

const contactDetailQuery = () => ({
  queryKey: ['sale'],
  queryFn: async () => getSales()
});

export const loadSales = async (queryClient) => {
  const query = contactDetailQuery();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const loader = (queryClient) => async () => {
  return defer({
    data: loadSales(queryClient)
  });
};

const Sales = () => {
  const { tab, id } = useParams();
  const navigate = useNavigate();
  const [activedTab, setActivedTab] = useState('');
  const { data: tabs } = useQuery(contactDetailQuery());

  const setTabHandler = (tab, pId = id) => {
    setActivedTab(tab);
    navigate(`/sales/${tab}/${pId ? pId : ''}`);
  };

  useEffect(() => {
    if (!activedTab) {
      setActivedTab(tab || tabs[0]?.key || '');
    }
  }, []);

  return (
    <div>
      <h1>Sales</h1>

      <div>
        <div className={styles.header}>
          {tabs ? (
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
    </div>
  );
};

export default Sales;
