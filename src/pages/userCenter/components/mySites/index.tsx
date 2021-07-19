import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { SiteItem } from '../siteItem';
import { queryMySites, deleteSite } from './service';

import styles from './styles.less';

export default ({ reLoad, history }) => {
  const [data, setData] = useState([]);
  useDidMount(async () => {
    const { data: resData } = await queryMySites();
    if (resData) {
      setData(resData);
    }
  });
  if (!data) return null;
  const onDelete = async (siteId, userId, siteType) => {
    const { success } = await deleteSite({ siteId, userId, siteType });
    if (success) {
      await setData(data.filter((item) => item._id !== siteId));
      reLoad();
    }
  };
  return (
    <div className={styles.table}>
      {data.map((item) => (
        <SiteItem
          key={item._id}
          data={item}
          renderOperation={({ _id: siteId, siteType, userId }) => (
            <Popconfirm title="确认删除？" onConfirm={() => onDelete(siteId, userId, siteType)}>
              <a>删除</a>
            </Popconfirm>
          )}
          history={history}
        />
      ))}
    </div>
  );
};
