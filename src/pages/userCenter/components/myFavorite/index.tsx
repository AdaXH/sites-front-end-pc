import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { useDidMount } from '@/utils/hooks';
// import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMyFavorite, togglCollectSite } from './service';
import { SiteItem } from '../siteItem';

import styles from '../mySites/styles.less';

export default ({ history }) => {
  const [data, setData] = useState([]);
  useDidMount(async () => {
    const { data: resData } = await queryMyFavorite();
    if (resData) {
      setData(resData);
    }
  });
  if (!data) return null;
  const cancelFavorite = async (siteId, siteType) => {
    const { success } = await togglCollectSite({ siteId, siteType });
    if (success) {
      setData(data.filter((item) => item._id !== siteId));
    }
  };

  return (
    <div className={styles.table}>
      {data.map((item) => (
        <SiteItem
          key={item._id}
          data={item}
          renderOperation={({ _id: siteId, siteType }) => (
            <Popconfirm title="确认取消收藏？" onConfirm={() => cancelFavorite(siteId, siteType)}>
              <a>取消收藏</a>
            </Popconfirm>
          )}
          history={history}
        />
      ))}
    </div>
  );
};
