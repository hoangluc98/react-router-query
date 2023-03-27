import Tabs from './Tabs';
import { getSales } from '../../apis/sales';
import { useEffect, useState } from 'react';

const Sales = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    getSales().then((res) => setTabs(res));
  }, []);

  return (
    <div>
      <h1>Sales</h1>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default Sales;
