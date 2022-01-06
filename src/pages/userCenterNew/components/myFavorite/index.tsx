import React, { useState } from 'react';
import SiteList from '@/component/siteList';
import { useDidMount } from '@/utils/hooks';
// import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMyFavorite, togglCollectSite } from './service';

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
    <SiteList
      extraTitle="Like"
      extraDesc="点击取消收藏该站点"
      extracFn={cancelFavorite}
      data={data}
      history={history}
    />
  );
};
