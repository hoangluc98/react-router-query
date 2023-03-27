import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { getSalesData } from '../../../apis/sales';
import styles from './index.module.css';

const TabContent = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSalesData(tab).then((res) => setSales(res));
  }, [tab]);

  return (
    <div className={styles.tabContent}>
      <div className={styles.contents}>
        {sales.map((item) => (
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
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
TabContent.propTypes = {
  tab: PropTypes.string.isRequired
};

export default TabContent;
