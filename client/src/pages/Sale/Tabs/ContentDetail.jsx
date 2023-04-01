import { getSalesDetail } from '../../../apis/sales';
import { useParams, defer } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './index.module.css';
import { SkeParagraph } from '../../../components/Skeleton';

const contactDetailQuery = ({ params }) => ({
  queryKey: ['sale', 'detail', params.id],
  queryFn: async () => getSalesDetail(params.id)
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

const ContentDetail = () => {
  const params = useParams();
  const { data } = useQuery(contactDetailQuery({ params }));

  return (
    <div>
      {data ? (
        <div className={styles.detail}>
          <div className={styles.textBold}>{data.title}</div>
          <div className={styles.money}>{data.money}</div>
          <div style={{ marginBottom: '28px' }}>DUE TODAY + INVOICED {data.dueToday}</div>

          <div>
            <div className={styles.detailMoney}>
              <span>Pro Plan</span>
              <span>{data.proPlan}</span>
            </div>
            <div className={styles.detailMoney}>
              <span>Custom</span>
              <span>{data.custom}</span>
            </div>
            <div className={styles.detailMoney}>
              <span className={styles.textBold}>Net total</span>
              <span className={styles.textBold}>{data.money}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.detail}>
          <SkeParagraph />
        </div>
      )}
    </div>
  );
};

export default ContentDetail;
