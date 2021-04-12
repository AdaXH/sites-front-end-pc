import React, { useState } from 'react';
import SiteList from '@/component/siteList';
import { useDidMount } from '@/utils/hooks';
import { querySites } from '@/utils/service';

export default ({ history }: { history?: any }) => {
  const [pagination, setPage] = useState<{ total: number; current: number }>({
    current: 1,
    total: 1,
  });
  const [data, setData] = useState([]);
  async function query(page = 1) {
    const { data: resData, totalCount } = await querySites({
      page,
      siteType: 'technology',
    });
    if (resData) {
      setData(resData);
      setPage({
        ...pagination,
        current: page,
        total: totalCount,
      });
    }
  }
  useDidMount(query);
  return (
    <SiteList
      pagination={{
        ...pagination,
        onChange: (pageNo: number) => query(pageNo),
      }}
      history={history}
      title="技术类站点"
      data={data}
    />
  );
};
