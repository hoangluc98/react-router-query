import { getSalesDetail } from '../../../apis/sales';
import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import styles from './index.module.css';
import { SkeParagraph } from '../../../components/Skeleton';

const ContentDetail = () => {
  const { data } = useLoaderData();

  return (
    <div>
      <Suspense
        fallback={
          <div className={styles.detail}>
            <SkeParagraph />
          </div>
        }>
        <Await resolve={data}>
          {(loadedData) => (
            <div className={styles.detail}>
              <div className={styles.textBold}>{loadedData.title}</div>
              <div className={styles.money}>{loadedData.money}</div>
              <div style={{ marginBottom: '28px' }}>DUE TODAY + INVOICED {loadedData.dueToday}</div>

              <div>
                <div className={styles.detailMoney}>
                  <span>Pro Plan</span>
                  <span>{loadedData.proPlan}</span>
                </div>
                <div className={styles.detailMoney}>
                  <span>Custom</span>
                  <span>{loadedData.custom}</span>
                </div>
                <div className={styles.detailMoney}>
                  <span className={styles.textBold}>Net total</span>
                  <span className={styles.textBold}>{loadedData.money}</span>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ContentDetail;

async function loadSales(id) {
  try {
    const res = await getSalesDetail(id);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function loader({ params }) {
  return defer({
    data: loadSales(params.id)
  });
}
