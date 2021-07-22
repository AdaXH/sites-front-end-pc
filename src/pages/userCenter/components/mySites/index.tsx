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
  const renderOperation = ({ _id: siteId, siteType, userId }) => [
    <a onClick={() => window.open(`/submit-site?siteId=${siteId}&siteType=${siteType}`)}>编辑</a>,
    <Popconfirm title="确认删除？" onConfirm={() => onDelete(siteId, userId, siteType)}>
      <a>删除</a>
    </Popconfirm>,
  ];
  return (
    <div className={styles.table}>
      {data.map((item) => (
        <SiteItem key={item._id} data={item} renderOperation={renderOperation} history={history} />
      ))}
    </div>
  );
};
