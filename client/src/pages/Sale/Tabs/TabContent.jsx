import { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { getSalesData } from '../../../apis/sales';
import styles from './index.module.css';
import { SkeMenu } from '../../../components/Skeleton';

const TabContent = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    async function doFetch() {
      try {
        const res = await getSalesData(tab, {
          signal: controller.signal
        });
        setSales(res);
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
  }, [tab]);

  return (
    <div className={styles.tabContent}>
      <div className={styles.contents}>
        {!isLoading ? (
          sales.map((item) => (
            <div
              key={item.id}
              className={styles.contentItem}
              onClick={() => navigate(`/sales/${tab}/${item.id}`)}>
              <div>
                <div className={styles.textBold}>{item.title}</div>
                <div>{item.year}</div>
              </div>
              <div>
                <div className={styles.textBold}>{item.money}</div>
              </div>
            </div>
          ))
        ) : (
          <SkeMenu />
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TabContent;
