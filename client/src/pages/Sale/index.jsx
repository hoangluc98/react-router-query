import styles from './Tabs/index.module.css';
import { Outlet, useLoaderData, useNavigate, useParams, defer, Await } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getSales } from '../../apis/sales';
import { SkeTabHeader } from '../../components/Skeleton';

const Sales = () => {
  const { tab, id } = useParams();
  const navigate = useNavigate();
  const { tabs } = useLoaderData();
  const [activedTab, setActivedTab] = useState('');

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
          <Suspense fallback={<SkeTabHeader />}>
            <Await resolve={tabs}>
              {(loadedTabs) =>
                loadedTabs.map((item) => (
                  <div
                    key={item.key}
                    className={`${styles.header__item} ${
                      activedTab === item.key ? styles['header__item--active'] : ''
                    }`}
                    onClick={() => setTabHandler(item.key, null)}>
                    {item.title}
                  </div>
                ))
              }
            </Await>
          </Suspense>
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sales;

async function loadSales() {
  try {
    const res = await getSales();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function loader() {
  return defer({
    tabs: loadSales()
  });
}
