import React, { useState } from 'react';
import SiteList from '@/component/siteList';
import { useDidMount } from '@/utils/hooks';
import { queryMySites } from './service';

export default ({ history }) => {
  const [data, setData] = useState([]);
  useDidMount(async () => {
    const { data: resData } = await queryMySites();
    if (resData) {
      setData(resData);
    }
  });
  if (!data) return null;
  // const onDelete = async (siteId, userId, siteType) => {
  //   const { success } = await deleteSite({ siteId, userId, siteType });
  //   if (success) {
  //     await setData(data.filter((item) => item._id !== siteId));
  //     reLoad();
  //   }
  // };
  // const renderOperation = ({ _id: siteId, siteType, userId }) => [
  //   <a onClick={() => window.open(`/submit-site?siteId=${siteId}&siteType=${siteType}`)}>编辑</a>,
  //   <Popconfirm title="确认删除？" onConfirm={() => onDelete(siteId, userId, siteType)}>
  //     <a>删除</a>
  //   </Popconfirm>,
  // ];
  return (
    <SiteList
      data={data}
      history={history}
      extracFn={(siteId, siteType) =>
        window.open(`/sites/submit-site?siteId=${siteId}&siteType=${siteType}`)
      }
      extraTitle="Edit"
      extraDesc="编辑该站点"
    />
  );
  // return (
  //   <div className={styles.table}>
  //     {data.map((item) => (
  //       <SiteItem key={item._id} data={item} renderOperation={renderOperation} history={history} />
  //     ))}
  //   </div>
  // );
};
