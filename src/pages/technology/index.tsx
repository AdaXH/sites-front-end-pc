import React, { useState, useEffect } from 'react';
import SiteList from '@/component/siteList';
import { SortType } from '@/component/siteList/filter';
import { querySites } from '@/utils/service';

export default ({ history }: { history?: any }) => {
  const [pagination, setPage] = useState<{ total: number; current: number }>({
    current: 1,
    total: 1,
  });
  const [data, setData] = useState([]);
  const [filterType, setFilter] = useState<SortType>({
    sortType: 'up',
    filterType: 'submitDate',
  });

  async function query(page = 1) {
    const { data: resData, totalCount } = await querySites({
      page,
      siteType: 'technology',
      ...filterType,
    });
    if (resData) {
      setData(page === 1 ? resData : [...data, ...resData]);
      setPage({
        ...pagination,
        current: page,
        total: totalCount,
      });
    }
  }
  useEffect(() => {
    if (filterType) {
      query(1);
    }
  }, [filterType]);
  console.log('pagination', pagination);
  return (
    <SiteList
      pagination={{
        ...pagination,
        onChange: (pageNo: number) => query(pageNo),
      }}
      history={history}
      title="技术类站点"
      data={data}
      filterType={filterType}
      changeFilterQuery={setFilter}
    />
  );
};
