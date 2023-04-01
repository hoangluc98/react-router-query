import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams, useNavigate, defer } from 'react-router-dom';
import { getSalesData } from '../../../apis/sales';
import styles from './index.module.css';
import { SkeMenu } from '../../../components/Skeleton';

const contactDetailQuery = ({ params }) => ({
  queryKey: ['sale', params.tab],
  queryFn: async () => getSalesData(params.tab)
});

export const loadSales = async (queryClient, ctx) => {
  const query = contactDetailQuery(ctx);

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const loader = (queryClient) => async (ctx) => {
  return defer({
    data: loadSales(queryClient, ctx)
  });
};

const TabContent = () => {
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

export default TabContent;
