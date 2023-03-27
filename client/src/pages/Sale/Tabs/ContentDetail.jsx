import { getSalesDetail } from '../../../apis/sales';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const ContentDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getSalesDetail(id).then((res) => setData(res));
  }, []);

  return (
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
  );
};

export default ContentDetail;
