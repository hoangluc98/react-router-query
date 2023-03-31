import { Suspense } from 'react';
import { Outlet, useParams, useNavigate, useLoaderData, defer, Await } from 'react-router-dom';
import { getSalesData } from '../../../apis/sales';
import styles from './index.module.css';
import { SkeMenu } from '../../../components/Skeleton';

const TabContent = () => {
  const { tab } = useParams();
  const { sales } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className={styles.tabContent}>
      <div className={styles.contents}>
        <Suspense fallback={<SkeMenu />}>
          <Await resolve={sales}>
            {(loadedSales) =>
              loadedSales.map((item) => (
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
            }
          </Await>
        </Suspense>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TabContent;

async function loadSales(tab) {
  try {
    const res = await getSalesData(tab);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function loader({ params }) {
  return defer({
    sales: loadSales(params.tab)
  });
}
