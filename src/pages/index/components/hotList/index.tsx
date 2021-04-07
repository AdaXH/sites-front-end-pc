import React, { useCallback, useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { stringify } from '@/utils/functions';
import { getHotList } from './service';

import styles from './styles.less';

export default () => {
  const [state, setState] = useState({
    loading: false,
    list: [],
  });

  const query = useCallback(async () => {
    setState({
      loading: true,
      list: [],
    });
    let data = [];
    try {
      const { data: resData } = await getHotList();
      data = resData;
    } finally {
      setState({
        loading: false,
        list: data,
      });
    }
  }, []);

  useDidMount(query);

  const onFresh = useCallback(() => {
    query();
  }, []);

  const { loading, list } = state;
  return (
    <div className={styles.listBox}>
      {loading && (
        <div className={styles.loadingWrap}>
          <div className={styles.loadinDot} />
        </div>
      )}
      <div className={styles.title}>
        最近活跃站点：
        <span className={styles.updIcon} onClick={onFresh}>
          <i className="iconfont iconshuaxin" />
        </span>
      </div>
      <div className={styles.list}>
        {list.map(({ siteIcon, siteName, siteId, siteType }) => (
          <a
            key={siteId}
            className={styles.listItem}
            href={`/site-info?${stringify({ siteType, siteId })}`}
            target="_blank" rel="noreferrer"
          >
            <div className={styles.siteIcon} style={{ backgroundImage: `url(${siteIcon})` }}></div>
            <div className={styles.siteName}>{siteName}</div>
          </a>
        ))}
      </div>
    </div>
  );
};
