import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams, useNavigate, defer } from 'react-router-dom';
import styles from '../index.module.css';
import { SkeMenu } from '../../../../components/Skeleton';
import { contactDetailQuery, loadSales } from './loader';

export const loader = (queryClient) => async (ctx) => {
  return defer({
    data: loadSales(queryClient, ctx)
  });
};

export const TabContent = () => {
  const params = useParams();
  const { data: sales } = useQuery(contactDetailQuery({ params }));
  const navigate = useNavigate();

  return (
    <div className={styles.tabContent}>
      <div className={styles.contents}>
        {sales ? (
          sales.map((item) => (
            <div
              key={item.id}
              className={styles.contentItem}
              onClick={() => navigate(`/sales/${params.tab}/${item.id}`)}>
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
