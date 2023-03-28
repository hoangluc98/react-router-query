import { getSalesDetail } from '../../../apis/sales';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { SkeParagraph } from '../../../components/Skeleton';

const ContentDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    async function doFetch() {
      try {
        const res = await getSalesDetail(id, {
          signal: controller.signal
        });
        setData(res);
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
  }, [id]);

  return (
    <div>
      {!isLoading ? (
        data ? (
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
          <div></div>
        )
      ) : (
        <div className={styles.detail}>
          <SkeParagraph />
        </div>
      )}
    </div>
  );
};

export default ContentDetail;
