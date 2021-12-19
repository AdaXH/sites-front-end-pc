import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useDidMount, useLoading } from '@/utils/hooks';
import BasicTop from '@/component/basicTop';
import { RootState, User } from 'state-typings';
import { connect } from 'dva';
import { formatTime } from '@/utils/functions';
import { queryList } from './service';

import styles from './styles.less';
import { PAGE_SIZE } from './constant';
import Loading from '@/component/loading';

interface RssModel {
  title: string;
  link: string;
  date: string;
  author: string;
}

export type State = {
  data: RssModel[];
  total: number;
  fileIndex: number;
};

export default connect(({ user }: RootState) => ({
  user,
}))(({ user }: { user: User }) => {
  const { pageConfig } = user;
  const { desc, mainTitle } = pageConfig || {};
  const [state, setData] = useState<State>();
  const [loading, queryData] = useLoading(async (page: number = 1) => {
    const res = await queryList(page);
    setData(res);
  });

  useDidMount(queryData);
  const { data, total, fileIndex } = state || {};
  console.log('state', state);
  useEffect(() => {
    if (loading) {
      Loading.show();
    } else {
      Loading.hide();
    }
  }, [loading]);
  return (
    <div className={styles.rss}>
      <BasicTop needMargin={false} mainTitle={mainTitle} desc={desc} />
      <div className={styles.content}>
        {data?.map((item) => (
          <div key={item.link} className={styles.rssItem}>
            <a href={item.link} target="_blank">
              <span>{item.title}</span>
              <span className={styles.rssItemDate}>{formatTime(item.date)}</span>
            </a>
            <div>{item.author}</div>
          </div>
        ))}
        <div className={styles.page}>
          <Pagination
            pageSize={PAGE_SIZE}
            current={fileIndex}
            onChange={queryData}
            size="small"
            total={total}
          />
        </div>
      </div>
    </div>
  );
});
